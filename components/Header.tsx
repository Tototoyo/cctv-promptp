import React from 'react';
import { CameraIcon, GithubIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-950/80 backdrop-blur-sm border-b border-green-400/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CameraIcon className="w-7 h-7 text-green-400" />
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">
              CCTV.PROMPT.GEN
            </h1>
          </div>
          <a
            href="https://github.com/google/prompt-gallery"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className="text-slate-400 hover:text-green-400 transition-colors"
          >
            <GithubIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </header>
  );
};
