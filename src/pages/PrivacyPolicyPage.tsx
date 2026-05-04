import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const sections = [
  {
    title: 'Information We Collect',
    body: 'We may collect personal information such as your name, email address, phone number, and business-related information when you interact with our website or services.'
  },
  {
    title: 'How We Use Your Information',
    body: 'Your information may be used to respond to inquiries, provide services, improve our offerings, and communicate updates related to your request or engagement.'
  },
  {
    title: 'Data Protection',
    body: 'We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse.'
  },
  {
    title: 'Third-Party Sharing',
    body: 'We do not sell or share your personal information with third parties unless required by law or necessary to provide requested services.'
  },
  {
    title: 'Your Rights',
    body: 'You may request access to or deletion of your personal data at any time by contacting us.'
  },
  {
    title: 'Contact',
    body: 'For any privacy-related questions, reach us at info@rahoperations.com'
  },
];

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | RAH Operations"
        description="Privacy Policy for RAH Operations."
        url={absoluteUrl('/privacy-policy')}
      />

      <section className="bg-[#faf8f4] pt-32 pb-24">
        <div className="container-clean max-w-3xl">
          <div className="border-b-4 border-[#1a1a1a] pb-8 mb-12">
            <p className="text-[#7a1c1c] text-xs uppercase tracking-[0.3em] mb-4">Legal</p>
            <h1 className="text-5xl md:text-6xl font-serif-display font-bold text-[#1a1a1a] leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-neutral-400 mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <div key={i} className="grid md:grid-cols-[1fr_2fr] gap-8 border-b border-neutral-200 pb-12 last:border-0">
                <h2 className="text-lg font-serif-display font-bold text-[#1a1a1a]">{section.title}</h2>
                <p className="text-neutral-600 font-serif-body leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
