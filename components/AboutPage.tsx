import React from 'react';

type PageProps = {
  onBack: () => void;
};

export const AboutPage: React.FC<PageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 tracking-wide">About This Tool</h1>
      <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
        <p>
          The <span className="text-green-400 font-semibold">CCTV Prompt Generator</span> is a specialized tool designed for creators, developers, and artists who need hyper-realistic, surveillance-style video prompts. Whether you're a filmmaker storyboarding a scene, an AI developer training a computer vision model, or a game designer building an immersive environment, this tool provides the detailed, authentic prompts you need.
        </p>
        <p>
          Our generator goes beyond simple descriptions. It meticulously constructs prompts that include critical details inherent to CCTV footage, such as:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Specific camera angles (high-corner, static)</li>
          <li>Authentic timestamp and camera ID overlays</li>
          <li>Visual artifacts like grain, compression, and lens distortion</li>
          <li>Realistic lighting conditions, including infrared night vision</li>
        </ul>
        <p>
          This application is powered by <span className="text-green-400 font-semibold">Google's Gemini API</span>, leveraging its advanced generative capabilities to produce creative and contextually accurate scene descriptions based on your inputs.
        </p>
        <p>
          The goal is to save you time and inspire creativity by instantly generating complex, ready-to-use prompts for your AI video or image generation tools.
        </p>
      </div>
    </div>
  );
};