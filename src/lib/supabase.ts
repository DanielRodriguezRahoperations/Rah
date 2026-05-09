import { createClient } from '@supabase/supabase-js';

const url = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

if (import.meta.env.DEV && (!url || url.includes('your-project-id') || !key || key === 'your-anon-key-here')) {
  console.warn(
    '[Supabase] Placeholder env vars detected.\n' +
    'Open .env, fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.'
  );
}

// Fallback strings prevent createClient from throwing on missing vars.
// The uploadFiles() guard in IntakeForm catches this before any real calls are made.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);
