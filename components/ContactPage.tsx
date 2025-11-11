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
          This tool is an open-source project. For all questions, feedback, and support inquiries, the best way to reach the development team is through our official GitHub repository. This allows us to track issues effectively and engage with the community.
        </p>
        
        <h2 className="text-2xl font-bold text-green-400 pt-4 border-t border-slate-700/50">Project Repository</h2>
        <p>
          To view the source code, report a technical issue, suggest a new feature, or start a discussion, please visit our GitHub page.
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