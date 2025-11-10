
import React from 'react';

type PageProps = {
  onBack: () => void;
};

export const PrivacyPolicyPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 tracking-wide">Privacy Policy</h1>
      <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <p>
          This Privacy Policy describes how CCTV Prompt Generator ("we", "us", or "our") collects, uses, and discloses your information when you use our website (the "Service").
        </p>

        <h2 className="text-2xl font-bold text-green-400">Information We Collect</h2>
        <p>
          We do not collect any personal information directly from you. The Service is designed to be used anonymously without requiring registration or personal data submission.
        </p>

        <h2 className="text-2xl font-bold text-green-400">Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
        </p>
        <p>
          Our partners, such as Google AdSense and Google Analytics, use cookies to serve ads based on a user's prior visits to this website or other websites and to analyze traffic.
        </p>

        <h2 className="text-2xl font-bold text-green-400">Google AdSense & Analytics</h2>
        <p>
          We use Google AdSense to display advertisements on our Service and Google Analytics to understand our traffic. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our Service and/or other sites on the Internet.
        </p>
        <p>
          For more information on how Google uses data when you use our partners' sites or apps, please visit:
          <a
            href="https://www.google.com/policies/technologies/partner-sites/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 underline hover:text-green-300 transition-colors ml-2"
          >
            www.google.com/policies/technologies/partner-sites/
          </a>
        </p>
        <p>
          Users may opt out of personalized advertising by visiting
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 underline hover:text-green-300 transition-colors ml-2"
          >
            Ads Settings
          </a>.
        </p>
        
        <h2 className="text-2xl font-bold text-green-400">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </div>
    </div>
  );
};
