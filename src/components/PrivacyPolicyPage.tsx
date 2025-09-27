import React from 'react';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy for our website" />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose max-w-none">
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information that you voluntarily provide when you interact
          with our website, such as your name, email address, phone number, and payment
          details. We also automatically collect non-personal information like your IP
          address, browser type, device information, and pages you visit on our site.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          The information we collect is used to provide, operate, and improve our services;
          respond to inquiries; process transactions; personalize user experiences; send
          important updates or promotional materials (you can opt out at any time); and to
          comply with legal obligations.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Information Sharing and Disclosure</h2>
        <p className="mb-4">
          We do not sell or rent your personal information. We may share it with trusted
          third-party service providers (such as hosting, payment processing, or analytics
          partners) only as necessary to operate our business. We may also disclose
          information if required by law, to protect our rights, or in the event of a business
          transfer such as a merger or acquisition.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">4. Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          Our website uses cookies and similar technologies to enhance your browsing
          experience, analyze site traffic, and understand user behavior. You can choose to
          disable cookies in your browser settings, but some features of our website may not
          function properly without them.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your
          information from unauthorized access, disclosure, alteration, or destruction.
          However, no method of electronic transmission or storage is completely secure, and we
          cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">6. Contact Information</h2>
        <p className="mb-4">
          If you have any questions or concerns regarding this Privacy Policy or how your
          information is handled, please contact us at:
        </p>
        <p className="mb-4">
          <strong>Email:</strong> privacy@[yourdomain].com <br />
          <strong>Phone:</strong> (123) 456-7890 <br />
          <strong>Address:</strong> 123 Your Business Street, Scottsdale, AZ 85250
        </p>

        <p className="mt-8 text-sm text-gray-600">
          Last updated: September 26, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
