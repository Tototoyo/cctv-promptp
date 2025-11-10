

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { PromptGenerator } from './components/PromptGenerator';
import { PromptDisplay } from './components/PromptDisplay';
import { Footer } from './components/Footer';
import { generateCctvPrompt } from './services/geminiService';
import { getRecentPrompts, addPrompt } from './services/supabaseService';
import type { GeneratorOptions, SavedPrompt } from './types';
import { FilmReelIcon, CpuIcon, LayersIcon, FeatherIcon, TerminalIcon, Wand2Icon, CheckIcon, GamepadIcon, ShieldIcon, CopyIcon, RssIcon } from './components/icons';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { TermsPage } from './components/TermsPage';
import { AdBanner } from './components/AdBanner';
import { CookieConsent } from './components/CookieConsent';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';

type SectionTitleProps = {
  children: React.ReactNode;
};

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
  <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-100 tracking-wider relative mb-16">
    <span className="relative z-10 bg-gray-950 px-4">{children}</span>
    <span className="absolute top-1/2 left-0 w-full h-px bg-green-400/20" aria-hidden="true"></span>
  </h2>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-900/50 border border-green-400/10 rounded-sm p-6 text-center">
    <div className="flex justify-center items-center h-16 w-16 rounded-full bg-gray-800/80 mx-auto mb-4 border border-green-400/20 text-green-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-100">{title}</h3>
    <p className="mt-2 text-slate-400">{description}</p>
  </div>
);

const FeaturesSection = () => (
  <section id="features">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard 
        icon={<FilmReelIcon className="w-8 h-8"/>} 
        title="Cinematic Accuracy" 
        description="Tailored for filmmaking, AI training, and game design with realistic details." 
      />
      <FeatureCard 
        icon={<LayersIcon className="w-8 h-8"/>} 
        title="Visual Artifact Library" 
        description="Choose from 20+ effects like frame skips, lens distortion, and glitches." 
      />
      <FeatureCard 
        icon={<CpuIcon className="w-8 h-8"/>} 
        title="Timestamp & Overlays" 
        description="Add realism with authentic camera ID tags and generated timecodes." 
      />
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section id="how-it-works">
    <SectionTitle>How It Works</SectionTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border-2 border-green-400 text-green-400 font-bold text-2xl rounded-sm">1</div>
        <h3 className="text-lg font-semibold text-slate-200">Describe Your Scene</h3>
        <p className="text-slate-400 mt-1">Start with a core idea of what's happening.</p>
      </div>
       <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border-2 border-green-400 text-green-400 font-bold text-2xl rounded-sm">2</div>
        <h3 className="text-lg font-semibold text-slate-200">Choose Location & Time</h3>
        <p className="text-slate-400 mt-1">Set the environment and build context.</p>
      </div>
       <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 border-2 border-green-400 text-green-400 font-bold text-2xl rounded-sm">3</div>
        <h3 className="text-lg font-semibold text-slate-200">Add Visual Glitches</h3>
        <p className="text-slate-400 mt-1">Select artifacts for authentic CCTV realism.</p>
      </div>
       <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500 text-gray-950 font-bold text-2xl rounded-sm"><CheckIcon className="w-8 h-8"/></div>
        <h3 className="text-lg font-semibold text-slate-200">Get Your AI-Ready Prompt</h3>
        <p className="text-slate-400 mt-1">Instantly receive a detailed, ready-to-use prompt.</p>
      </div>
    </div>
  </section>
);

const UseCasesSection = () => (
  <section id="use-cases">
    <SectionTitle>Primary Use Cases</SectionTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       <div className="border border-green-900/80 bg-gray-900 p-4 rounded-sm flex items-center gap-4">
        <FilmReelIcon className="w-6 h-6 text-green-400 flex-shrink-0"/>
        <p className="text-slate-300">Filmmaking & Pre-vis</p>
      </div>
      <div className="border border-green-900/80 bg-gray-900 p-4 rounded-sm flex items-center gap-4">
        <CpuIcon className="w-6 h-6 text-green-400 flex-shrink-0"/>
        <p className="text-slate-300">AI Scene Simulation</p>
      </div>
      <div className="border border-green-900/80 bg-gray-900 p-4 rounded-sm flex items-center gap-4">
        <LayersIcon className="w-6 h-6 text-green-400 flex-shrink-0"/>
        <p className="text-slate-300">VFX & Asset Testing</p>
      </div>
      <div className="border border-green-900/80 bg-gray-900 p-4 rounded-sm flex items-center gap-4">
        <FeatherIcon className="w-6 h-6 text-green-400 flex-shrink-0"/>
        <p className="text-slate-300">Creative Writing</p>
      </div>
      <div className="border border-green-900/80 bg-gray-900 p-4 rounded-sm flex items-center gap-4">
        <GamepadIcon className="w-6 h-6 text-green-400 flex-shrink-0"/>
        <p className="text-slate-300">Game Development</p>
      </div>
      <div className="border border-green-900/80 bg-gray-900 p-4 rounded-sm flex items-center gap-4">
        <ShieldIcon className="w-6 h-6 text-green-400 flex-shrink-0"/>
        <p className="text-slate-300">Security Training</p>
      </div>
    </div>
  </section>
);

const ConfigurationError = ({ missingKeys }: { missingKeys: string[] }) => (
  <div className="min-h-screen bg-gray-950 text-slate-300 font-mono flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-2xl bg-gray-900/50 border border-red-500/30 rounded-sm p-8 text-center">
      <div className="flex justify-center items-center h-16 w-16 rounded-full bg-red-900/50 mx-auto mb-4 border border-red-500/30 text-red-400">
        <TerminalIcon className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-red-400">Configuration Error</h1>
      <p className="mt-4 text-slate-300">
        The following required environment variables are missing. This application cannot function without them.
      </p>
      <div className="mt-6 text-left bg-black/40 p-4 rounded-sm border border-slate-700/50 text-sm">
        <p className="font-bold text-slate-200">Missing Keys:</p>
        <ul className="mt-2 space-y-2 list-disc list-inside text-red-400">
          {missingKeys.map(key => <li key={key}><code className="bg-slate-700 text-red-400 px-1.5 py-0.5 rounded-sm">{key}</code></li>)}
        </ul>
        <p className="mt-4 font-bold text-slate-200">How to fix this (for Vercel):</p>
        <p className="mt-2 text-slate-400">
          Go to your project settings in Vercel, navigate to the "Environment Variables" section, and add the missing keys with their corresponding values. Make sure they are available in the production environment. Remember to use the `VITE_` prefix.
        </p>
      </div>
    </div>
  </div>
);

const GalleryPromptCard: React.FC<{ prompt: SavedPrompt }> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className="bg-gray-900/50 border border-green-400/10 rounded-sm p-4 flex flex-col justify-between h-full min-h-[180px] group">
      <p className="text-slate-400 text-sm line-clamp-4">{prompt.prompt}</p>
      <div className="mt-4 pt-3 border-t border-slate-800">
        <div className="flex justify-between items-center">
          <span className="text-xs text-green-400/60 font-mono truncate">{prompt.options?.location || 'Unknown Location'}</span>
          <button onClick={handleCopy} className="p-1.5 rounded-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors" aria-label="Copy prompt">
            {copied ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
          </button>
        </div>
      </div>
    </div>
  );
};

const GallerySkeleton: React.FC = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-900/50 border border-green-400/10 rounded-sm p-4 h-[180px] animate-pulse">
                <div className="h-3 bg-gray-700/50 rounded w-5/6 mb-2"></div>
                <div className="h-3 bg-gray-700/50 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700/50 rounded w-3/4"></div>
                <div className="absolute bottom-4 left-4 right-4 h-3 bg-gray-700/50 rounded w-1/3"></div>
            </div>
        ))}
    </div>
);

const CommunityGallerySection = ({ prompts, isLoading }: { prompts: SavedPrompt[], isLoading: boolean }) => (
  <section id="gallery">
    <SectionTitle>Community Gallery</SectionTitle>
    <p className="text-center text-slate-400 max-w-2xl mx-auto -mt-12 mb-12">
      Explore recent prompts generated and shared by the community. Click to copy and use them in your own projects.
    </p>
    {isLoading ? (
      <GallerySkeleton />
    ) : prompts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {prompts.map(p => <GalleryPromptCard key={p.id} prompt={p} />)}
      </div>
    ) : (
      <div className="text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-sm p-12">
        <RssIcon className="mx-auto h-12 w-12 text-slate-600" />
        <h3 className="mt-2 text-lg font-medium text-slate-400">The Gallery is Empty</h3>
        <p className="mt-1 text-sm">Be the first to generate and share a prompt!</p>
      </div>
    )}
  </section>
);


const App: React.FC = () => {
  const [generationResult, setGenerationResult] = useState<{ prompt: string; options: GeneratorOptions } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<'generator' | 'about' | 'contact' | 'terms' | 'privacy'>('generator');
  const [galleryPrompts, setGalleryPrompts] = useState<SavedPrompt[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState<boolean>(true);
  const generatorRef = useRef<HTMLElement>(null);
  
  const missingEnvKeys = [
    !process.env.VITE_API_KEY && 'VITE_API_KEY',
    !process.env.VITE_SUPABASE_URL && 'VITE_SUPABASE_URL',
    !process.env.VITE_SUPABASE_ANON_KEY && 'VITE_SUPABASE_ANON_KEY'
  ].filter(Boolean) as string[];

  useEffect(() => {
    if (missingEnvKeys.length === 0) {
      getRecentPrompts().then(prompts => {
        setGalleryPrompts(prompts);
        setIsLoadingGallery(false);
      }).catch(() => setIsLoadingGallery(false));
    } else {
      setIsLoadingGallery(false);
    }
  }, []);

  const handleGenerate = useCallback(async (options: GeneratorOptions) => {
    setIsLoading(true);
    setError(null);
    setGenerationResult(null);
    try {
      const prompt = await generateCctvPrompt(options);
      setGenerationResult({ prompt, options });
      generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleShareToGallery = async (prompt: string, options: GeneratorOptions) => {
    await addPrompt(prompt, options);
    // Refresh gallery to show the new prompt instantly
    const newPrompts = await getRecentPrompts();
    setGalleryPrompts(newPrompts);
  };
  
  const navigate = (page: 'generator' | 'about' | 'contact' | 'terms' | 'privacy') => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToGenerator = () => {
    if (activePage !== 'generator') {
      navigate('generator');
      setTimeout(() => {
        generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      generatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (missingEnvKeys.length > 0) {
    return <ConfigurationError missingKeys={missingEnvKeys} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-slate-300 font-mono flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        {activePage === 'generator' ? (
          <div className="space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="text-center pt-8 md:pt-16">
              <h1 className="text-4xl md:text-6xl font-bold text-slate-100 leading-tight tracking-wide">
                Generate <span className="text-green-400" style={{textShadow: '0 0 10px rgba(74, 222, 128, 0.5)'}}>Hyper-Realistic</span><br/>CCTV Scene Prompts.
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-lg text-slate-400">
                Build scenes with accurate timestamps, camera artifacts, and surveillance realism — in seconds.
              </p>
              <div className="mt-10">
                <button
                  onClick={scrollToGenerator}
                  className="px-8 py-4 bg-green-500 text-gray-950 font-bold rounded-sm hover:bg-green-400 transition-all duration-300 text-lg shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:shadow-[0_0_25px_rgba(74,222,128,0.6)]">
                  [ Try the Generator ]
                </button>
              </div>
            </section>

            <FeaturesSection />

            <HowItWorksSection />
            
            <section id="generator" ref={generatorRef}>
               <SectionTitle>Live Generator</SectionTitle>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="bg-gray-900/50 border border-green-400/10 p-6 rounded-sm">
                  <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <Wand2Icon className="w-8 h-8"/>
                    1. Configure Scene
                  </h3>
                  <PromptGenerator onGenerate={handleGenerate} isLoading={isLoading} />
                </div>
                <div className="bg-gray-900/50 border border-green-400/10 p-6 rounded-sm">
                   <h3 className="text-2xl font-bold text-slate-300 mb-4 flex items-center gap-3">
                    <TerminalIcon className="w-8 h-8"/>
                    2. Get AI-Generated Output
                  </h3>
                  <PromptDisplay 
                    generationResult={generationResult} 
                    isLoading={isLoading} 
                    error={error} 
                    onShare={handleShareToGallery}
                  />
                </div>
              </div>
            </section>

            <UseCasesSection />
            
            <CommunityGallerySection prompts={galleryPrompts} isLoading={isLoadingGallery} />

            <AdBanner />

            {/* CTA Section */}
            <section className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
                Start Generating Prompts Now.
              </h2>
              <div className="mt-8">
                <button
                  onClick={scrollToGenerator}
                  className="px-8 py-4 bg-green-500 text-gray-950 font-bold rounded-sm hover:bg-green-400 transition-all duration-300 text-lg shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:shadow-[0_0_25px_rgba(74,222,128,0.6)]">
                  [ Try the Generator ]
                </button>
              </div>
            </section>
          </div>
        ) : (
          <>
            {activePage === 'about' && <AboutPage onBack={() => navigate('generator')} />}
            {activePage === 'contact' && <ContactPage onBack={() => navigate('generator')} />}
            {activePage === 'terms' && <TermsPage onBack={() => navigate('generator')} />}
            {activePage === 'privacy' && <PrivacyPolicyPage onBack={() => navigate('generator')} />}
          </>
        )}
      </main>
      <Footer onNavigate={navigate} />
      <CookieConsent />
    </div>
  );
};

export default App;