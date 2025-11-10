
import React from 'react';

interface FooterProps {
  onNavigate: (page: 'generator' | 'about' | 'contact' | 'terms' | 'privacy') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-green-400/10">
      <div className="container mx-auto text-center text-slate-500 text-sm">
        <div className="flex justify-center gap-6 mb-4">
          <button onClick={() => onNavigate('about')} className="hover:text-green-400 transition">About</button>
          <button onClick={() => onNavigate('contact')} className="hover:text-green-400 transition">Contact</button>
          <button onClick={() => onNavigate('terms')} className="hover:text-green-400 transition">Terms of Service</button>
          <button onClick={() => onNavigate('privacy')} className="hover:text-green-400 transition">Privacy Policy</button>
        </div>
        <p className="mb-2">Made for creators, writers, and world builders.</p>
        <p>Powered by AI. Generated content may require review for accuracy and appropriateness.</p>
        <p>&copy; {new Date().getFullYear()} CCTV Prompt Generator. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
