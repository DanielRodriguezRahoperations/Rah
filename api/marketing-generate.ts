import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Anthropic from '@anthropic-ai/sdk';

function validateAdmin(req: VercelRequest): boolean {
  const expected = `Bearer ${Buffer.from(process.env.ADMIN_PASSWORD ?? '').toString('base64')}`;
  return req.headers.authorization === expected;
}

const SYSTEM_PROMPT = `You are a professional digital marketing copywriter for RAH Operations, a business services company in Scottsdale, AZ. You create high-converting, authentic content for small businesses. Write in the specific voice of the business — professional, approachable, and results-focused. Return only the content itself, no preamble or meta-commentary.`;

function buildUserPrompt(
  platform: string,
  contentType: string,
  businessName: string,
  businessType: string,
  goals: string,
  customPrompt: string
): string {
  const platformInstructions: Record<string, string> = {
    instagram: 'Platform: Instagram. Punchy, visual caption (under 2200 chars). Include 15–20 relevant hashtags at the end separated from the body with a blank line.',
    facebook: 'Platform: Facebook. More conversational and detailed than Instagram. No hashtag spam. 100–300 words.',
    google: 'Platform: Google Business Post. Professional, locally focused, under 1500 chars. Include a clear CTA.',
    website: 'Platform: Website copy. SEO-conscious, conversion-focused, professional.',
    tiktok: 'Platform: TikTok. Energetic hook in the first line, casual and short (under 150 chars). Include trending-style hashtags.',
    email: 'Platform: Email. Include: Subject Line, Preview Text, and full email body with greeting, main content, and CTA.',
  };

  const typeInstructions: Record<string, string> = {
    caption: 'Task: Write a social media caption for the platform above.',
    blog: 'Task: Write a blog post (500–800 words) with H2 section headings. Include a compelling intro and conclusion with CTA.',
    ad_copy: 'Task: Write ad copy. Include: 1 headline (under 40 chars), 3 body copy variations (each under 90 chars), and 2 CTA options.',
    email: 'Task: Write a full email with Subject Line, Preview Text (under 100 chars), greeting, body (200–300 words), and a strong CTA button label.',
    reel: 'Task: Write a short-form video script (30–60 sec). Format: HOOK (first 3 sec), MAIN CONTENT (bullet points), CALL TO ACTION (last 5 sec). Include on-screen text suggestions in [brackets].',
    image: 'Task: Write a detailed image generation prompt. Describe: subject, style, mood, lighting, composition, background. Be specific enough for an AI image model.',
  };

  const context = customPrompt ? `\nAdditional context from admin: ${customPrompt}` : '';

  return `Business: ${businessName}
Business Type: ${businessType || 'Small business'}
Goals: ${goals || 'Grow brand awareness and generate leads'}
${platformInstructions[platform] || `Platform: ${platform}`}
${typeInstructions[contentType] || `Task: Create ${contentType} content`}${context}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!validateAdmin(req)) return res.status(401).json({ error: 'Unauthorized' });

  const { clientId, platform, contentType, customPrompt } = req.body ?? {};

  if (!clientId || !platform || !contentType) {
    return res.status(400).json({ error: 'clientId, platform, and contentType are required' });
  }

  const claudeKey = process.env.CLAUDE_API_KEY;
  if (!claudeKey) return res.status(500).json({ error: 'Claude API not configured' });

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: client, error: cErr } = await supabase
    .from('marketing_clients')
    .select('business_name, business_type, goals')
    .eq('id', clientId)
    .single();

  if (cErr || !client) return res.status(404).json({ error: 'Client not found' });

  let contentText: string | null = null;
  let fileUrl: string | null = null;

  if (contentType === 'image') {
    // ⚠️ SETUP REQUIRED: KIE_API_KEY must be added to Vercel environment variables
    // ⚠️ Verify the exact endpoint at https://kie.ai/docs/api before deploying
    const kieKey = process.env.KIE_API_KEY;
    if (!kieKey) {
      return res.status(500).json({
        error: 'Image generation requires KIE_API_KEY. Add it to Vercel environment variables.',
        flag: 'KIE_API_KEY_MISSING',
      });
    }

    const imagePrompt = customPrompt
      || `Professional marketing photo for ${client.business_name}, a ${client.business_type || 'business'} in Arizona. Clean modern aesthetic, warm natural lighting, commercial photography style. No text overlay.`;

    try {
      // Kie.ai image generation API — confirm endpoint path with their docs
      const kieRes = await fetch('https://api.kie.ai/v1/images/generations', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kieKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: imagePrompt,
          n: 1,
          size: '1024x1024',
        }),
      });

      if (!kieRes.ok) {
        const errData = await kieRes.json().catch(() => ({}));
        console.error('[marketing-generate] Kie.ai error:', errData);
        return res.status(502).json({ error: 'Image generation failed', details: errData });
      }

      const kieData = await kieRes.json();
      fileUrl = kieData?.data?.[0]?.url ?? kieData?.url ?? null;
      contentText = imagePrompt;
    } catch (err) {
      console.error('[marketing-generate] Kie.ai exception:', err);
      return res.status(500).json({ error: 'Image generation failed' });
    }
  } else {
    // Claude text generation
    const anthropic = new Anthropic({ apiKey: claudeKey });

    const userPrompt = buildUserPrompt(
      platform,
      contentType,
      client.business_name,
      client.business_type ?? '',
      client.goals ?? '',
      customPrompt ?? ''
    );

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: userPrompt }],
      });

      const textBlock = response.content.find((b) => b.type === 'text');
      contentText = textBlock?.type === 'text' ? textBlock.text : null;
    } catch (err) {
      console.error('[marketing-generate] Claude error:', err);
      return res.status(500).json({ error: 'Content generation failed' });
    }
  }

  // Save to generated_assets
  const { data: asset, error: insErr } = await supabase
    .from('generated_assets')
    .insert({
      client_id: clientId,
      asset_type: contentType,
      content_text: contentText,
      file_url: fileUrl,
      platform,
      approved: false,
      rejected: false,
    })
    .select('*')
    .single();

  if (insErr || !asset) {
    console.error('[marketing-generate] insert error:', insErr);
    return res.status(500).json({ error: 'Failed to save generated asset' });
  }

  return res.status(200).json({ asset });
}
