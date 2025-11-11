import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TerminalIcon } from './icons';

type PageProps = {
  onBack: () => void;
};

export const AuthPage: React.FC<PageProps> = ({ onBack }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const { login, signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = isLogin
            ? await login(email, password)
            : await signup(email, password);
        
        if (response.error) {
            setError(response.error.message);
        } else if (!isLogin) {
            setMessage("Check your email for the confirmation link!");
        }
        
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto animate-fade-in">
            <button onClick={onBack} className="mb-8 text-green-400 hover:text-green-300 transition-colors font-bold">[ &lt; Back to Generator ]</button>
            <div className="bg-gray-900/50 border border-green-400/10 rounded-sm p-8">
                <div className="flex border-b border-slate-700 mb-6">
                    <button
                        onClick={() => { setIsLogin(true); setError(null); setMessage(null); }}
                        className={`px-6 py-2 text-lg font-bold transition-colors ${isLogin ? 'text-green-400 border-b-2 border-green-400' : 'text-slate-500'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => { setIsLogin(false); setError(null); setMessage(null); }}
                        className={`px-6 py-2 text-lg font-bold transition-colors ${!isLogin ? 'text-green-400 border-b-2 border-green-400' : 'text-slate-500'}`}
                    >
                        Sign Up
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-900 border border-slate-700 rounded-sm shadow-sm focus:ring-green-500 focus:border-green-500 text-slate-200 p-3 transition"
                          required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-gray-900 border border-slate-700 rounded-sm shadow-sm focus:ring-green-500 focus:border-green-500 text-slate-200 p-3 transition"
                          required
                        />
                    </div>
                    {error && <div className="text-red-400 bg-red-900/20 p-3 text-sm rounded-sm text-center">{error}</div>}
                    {message && <div className="text-green-400 bg-green-900/20 p-3 text-sm rounded-sm text-center">{message}</div>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-sm shadow-sm text-gray-950 bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-green-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};