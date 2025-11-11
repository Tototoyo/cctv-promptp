import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserPrompts, deletePrompt } from '../services/supabaseService';
import type { SavedPrompt } from '../types';
import { CopyIcon, CheckIcon, TerminalIcon, Trash2Icon } from './icons';

type PageProps = {
  onBack: () => void;
};

const DashboardPromptCard: React.FC<{ prompt: SavedPrompt; onDelete: (id: number) => void; }> = ({ prompt, onDelete }) => {
    const [copied, setCopied] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this prompt? This action cannot be undone.")) {
            setIsDeleting(true);
            try {
                await onDelete(prompt.id);
            } catch (error) {
                console.error("Failed to delete prompt:", error);
                alert("Could not delete prompt. Please try again.");
                setIsDeleting(false);
            }
        }
    };
    
    return (
        <div className="bg-gray-900/50 border border-green-400/10 rounded-sm p-4 flex flex-col justify-between h-full group">
            <p className="text-slate-400 text-sm mb-4 line-clamp-5">{prompt.prompt}</p>
            <div className="pt-3 border-t border-slate-800">
                <div className="flex justify-between items-center">
                    <span className="text-xs text-green-400/60 font-mono truncate">{prompt.options?.location || 'Unknown'}</span>
                    <div className="flex items-center gap-2">
                        <button onClick={handleCopy} className="p-1.5 rounded-sm bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors" aria-label="Copy prompt">
                            {copied ? <CheckIcon className="w-4 h-4 text-green-400"/> : <CopyIcon className="w-4 h-4"/>}
                        </button>
                         <button onClick={handleDelete} disabled={isDeleting} className="p-1.5 rounded-sm bg-slate-800/80 hover:bg-red-900/80 text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50" aria-label="Delete prompt">
                             {isDeleting ? <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div> : <Trash2Icon className="w-4 h-4"/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DashboardPage: React.FC<PageProps> = ({ onBack }) => {
    const { user } = useAuth();
    const [prompts, setPrompts] = useState<SavedPrompt[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPrompts = useCallback(async () => {
        if (user) {
            setIsLoading(true);
            const userPrompts = await getUserPrompts(user.id);
            setPrompts(userPrompts);
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchPrompts();
    }, [fetchPrompts]);

    const handleDeletePrompt = async (id: number) => {
        if (!user) return;
        await deletePrompt(id, user.id);
        setPrompts(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-100 tracking-wide">My Dashboard</h1>
                {user && <p className="text-slate-400 mt-2 md:mt-0 truncate">Logged in as: <span className="font-bold text-slate-300">{user.email}</span></p>}
            </div>

            <div className="bg-gray-900/50 border border-green-400/10 rounded-sm p-6">
                <h2 className="text-2xl font-bold text-green-400 mb-6">Saved Prompts</h2>
                {isLoading ? (
                    <div className="text-center text-slate-400">Loading your prompts...</div>
                ) : prompts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {prompts.map(p => <DashboardPromptCard key={p.id} prompt={p} onDelete={handleDeletePrompt} />)}
                    </div>
                ) : (
                    <div className="text-center text-slate-500 border-2 border-dashed border-slate-800 rounded-sm p-12">
                        <TerminalIcon className="mx-auto h-12 w-12 text-slate-600" />
                        <h3 className="mt-2 text-lg font-medium text-slate-400">No Prompts Saved</h3>
                        <p className="mt-1 text-sm">Generate a prompt and click the "Share" button to save it here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};
