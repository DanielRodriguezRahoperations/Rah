import React from 'react';
import SEOHead from '../components/ui/SEOHead';
import { absoluteUrl } from '../utils/url';

const PrivacyPolicyPage = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | RAH Operations"
        description="Privacy Policy for RAH Operations."
        url={absoluteUrl('/privacy-policy')}
      />

      <section className="section">
        <div className="container-clean max-w-3xl">
          <p className="eyebrow mb-6">Privacy Policy</p>

          <h1 className="mb-6">
            Privacy Policy
          </h1>

          <p className="text-sm text-neutral-500 mb-10">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="space-y-10 text-sm leading-relaxed">
            <div>
              <h2 className="mb-3 text-base font-semibold">Information We Collect</h2>
              <p>
                We may collect personal information such as your name, email address, phone number,
                and business-related information when you interact with our website or services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold">How We Use Your Information</h2>
              <p>
                Your information may be used to respond to inquiries, provide services, improve our offerings,
                and communicate updates related to your request or engagement.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold">Data Protection</h2>
              <p>
                We take reasonable measures to protect your personal information from unauthorized access,
                disclosure, or misuse.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold">Third-Party Sharing</h2>
              <p>
                We do not sell or share your personal information with third parties unless required by law
                or necessary to provide requested services.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold">Your Rights</h2>
              <p>
                You may request access to or deletion of your personal data at any time by contacting us.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-base font-semibold">Contact</h2>
              <p>
                For any privacy-related questions, contact us at:
              </p>
              <p className="mt-2 font-medium">
                info@rahoperations.com
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicyPage;
