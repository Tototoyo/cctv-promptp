import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, TerminalIcon, Share2Icon } from './icons';
import type { GeneratorOptions } from '../types';

interface PromptDisplayProps {
  generationResult: { prompt: string; options: GeneratorOptions } | null;
  isLoading: boolean;
  error: string | null;
  onShare: (prompt: string, options: GeneratorOptions) => Promise<void>;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
        <div className="h-4 bg-gray-700/50 rounded w-full"></div>
        <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700/50 rounded w-1/2"></div>
    </div>
);

const InitialState: React.FC = () => (
    <div className="text-center text-slate-500 flex flex-col items-center justify-center h-full">
        <TerminalIcon className="mx-auto h-12 w-12 text-slate-600" />
        <h3 className="mt-2 text-lg font-medium text-slate-400">Awaiting Generation</h3>
        <p className="mt-1 text-sm">Your AI-generated CCTV prompt will appear here.</p>
    </div>
);

export const PromptDisplay: React.FC<PromptDisplayProps> = ({ generationResult, isLoading, error, onShare }) => {
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [shareSuccess, setShareSuccess] = useState(false);
    const [shareError, setShareError] = useState<string | null>(null);

    const prompt = generationResult?.prompt;

    useEffect(() => {
        if (prompt) {
            setCopied(false);
            setShareSuccess(false);
            setShareError(null);
        }
    }, [prompt]);

    const handleCopy = () => {
        if (!prompt) return;
        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    
    const handleShare = async () => {
        if (!generationResult) return;
        setIsSharing(true);
        setShareSuccess(false);
        setShareError(null);
        try {
            await onShare(generationResult.prompt, generationResult.options);
            setShareSuccess(true);
            setTimeout(() => setShareSuccess(false), 3000);
        } catch (err) {
            setShareError(err instanceof Error ? err.message : 'Could not share the prompt.');
        } finally {
            setIsSharing(false);
        }
    };

    return (
        <div className="bg-black/40 border border-slate-700/50 rounded-sm p-6 h-full flex flex-col relative min-h-[400px] lg:min-h-full">
            {prompt && !isLoading && (
                 <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                        onClick={handleShare}
                        disabled={isSharing || shareSuccess}
                        className="p-2 rounded-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        aria-label="Share to gallery"
                    >
                        {isSharing ? (
                             <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : shareSuccess ? (
                            <CheckIcon className="w-5 h-5 text-green-400" />
                        ) : (
                            <Share2Icon className="w-5 h-5" />
                        )}
                    </button>
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition"
                        aria-label="Copy prompt"
                    >
                        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                    </button>
                 </div>
            )}
            <div className="flex-grow overflow-auto pr-4 custom-scrollbar">
                {isLoading && <LoadingSkeleton />}
                {error && <div className="text-red-400 bg-red-900/30 border border-red-400/30 p-4 rounded-sm font-mono">{error}</div>}
                {!isLoading && !error && !prompt && <InitialState />}
                {!isLoading && !error && prompt && (
                    <p className="text-slate-300 whitespace-pre-wrap leading-relaxed" style={{textShadow: '0 0 5px rgba(74, 222, 128, 0.2)'}}>
                        {prompt}
                    </p>
                )}
            </div>
             {shareError && <div className="mt-4 text-xs text-red-400 font-mono text-center p-2 bg-red-900/20 rounded-sm">{shareError}</div>}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #334155;
                    border-radius: 2px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #475569;
                }
            `}</style>
        </div>
    );
};