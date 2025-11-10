import React from 'react';

type PageProps = {
  onBack: () => void;
};

export const ContactPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 tracking-wide">Contact & Support</h1>
      <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
        <p>
          Have questions, feedback, or a support inquiry? The best way to reach us is by email.
        </p>
        
        <h2 className="text-2xl font-bold text-green-400 pt-4">General Inquiries</h2>
        <p>
          For general questions and feedback, please send an email to:
        </p>
        <p>
          <a 
            href="mailto:contact@example.com" // IMPORTANT: Replace with your actual contact email
            className="text-green-400 underline hover:text-green-300 transition-colors"
          >
            contact@example.com
          </a>
        </p>
        
        <h2 className="text-2xl font-bold text-green-400 pt-4 border-t border-slate-700/50">Project Repository</h2>
        <p>
          This tool is an open-source project. To view the source code, report a technical issue, or contribute, please visit our GitHub repository.
        </p>
        <p>
          <a 
            href="https://github.com/google/prompt-gallery" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-green-400 underline hover:text-green-300 transition-colors"
          >
            Visit the GitHub Repository
          </a>
        </p>
      </div>
    </div>
  );
};
