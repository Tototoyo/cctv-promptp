import React from 'react';

type PageProps = {
  onBack: () => void;
};

export const TermsPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 tracking-wide">Terms of Service</h1>
      <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
        <h2 className="text-2xl font-bold text-green-400">1. Acceptance of Terms</h2>
        <p>
          By using the CCTV Prompt Generator (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </p>
        
        <h2 className="text-2xl font-bold text-green-400">2. Description of Service</h2>
        <p>
          The Service is a tool that uses Google's Gemini API to generate text-based prompts for creative and developmental purposes. The content generated is produced by an artificial intelligence model and may not always be accurate, appropriate, or complete.
        </p>

        <h2 className="text-2xl font-bold text-green-400">3. User Conduct</h2>
        <p>
          You are responsible for the inputs you provide to the Service and for how you use the generated output. You agree not to use the Service for any unlawful purpose or to generate content that is hateful, harassing, or otherwise objectionable.
        </p>

        <h2 className="text-2xl font-bold text-green-400">4. Disclaimer of Warranties</h2>
        <p>
          The Service is provided "as is" without any warranties of any kind. We do not guarantee that the Service will be error-free or that the generated content will meet your requirements. You assume all risks associated with the use of the Service and its output.
        </p>

        <h2 className="text-2xl font-bold text-green-400">5. Limitation of Liability</h2>
        <p>
          We shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Service.
        </p>
      </div>
    </div>
  );
};