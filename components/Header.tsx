import React, { useState } from 'react';
import { CameraIcon, GithubIcon, MenuIcon, XIcon, UserIcon, LogOutIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';

type NavPage = 'generator' | 'about' | 'contact' | 'terms' | 'privacy' | 'auth' | 'dashboard' | 'gallery';
interface HeaderProps {
  onNavigate: (page: NavPage) => void;
}

// Fix: Updated onClick prop to accept a MouseEvent to match the anchor element's onClick handler. This resolves TypeScript errors where event handlers expecting an event were passed to a prop typed for a handler with no arguments.
const NavLink: React.FC<{ href: string; children: React.ReactNode; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block rounded-md px-3 py-2 text-base font-medium text-slate-400 hover:bg-gray-700/50 hover:text-green-400 transition-colors md:inline-block md:text-sm md:px-2 md:py-2 md:hover:bg-transparent"
  >
    {children}
  </a>
);

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleScrollLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    // If we're not on the main generator page, navigate there first
    if (!document.getElementById('generator')) {
      onNavigate('generator');
      // Wait for navigation to complete before trying to scroll
      setTimeout(() => {
        const element = document.querySelector(anchor);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Already on the main page, just scroll
      const element = document.querySelector(anchor);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigate('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: NavPage) => {
    e.preventDefault();
    onNavigate(page);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onNavigate('generator');
     if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-gray-950/80 backdrop-blur-sm border-b border-green-400/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-3">
            <CameraIcon className="w-7 h-7 text-green-400" />
            <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white">
              CCTV.PROMPT.GEN
            </h1>
          </a>
          
          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink href="#features" onClick={(e) => handleScrollLinkClick(e, '#features')}>Features</NavLink>
              <NavLink href="#how-it-works" onClick={(e) => handleScrollLinkClick(e, '#how-it-works')}>How It Works</NavLink>
              <NavLink href="#generator" onClick={(e) => handleScrollLinkClick(e, '#generator')}>Generator</NavLink>
              <NavLink href="#gallery-page" onClick={(e) => handleNavClick(e, 'gallery')}>Gallery</NavLink>
            </nav>
            
            <div className="hidden md:flex items-center ml-4">
                {user ? (
                    <>
                        <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-green-400 transition-colors px-3 py-2 rounded-sm hover:bg-gray-800/50">
                            <UserIcon className="w-5 h-5" />
                            Dashboard
                        </button>
                        <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-red-400 transition-colors px-3 py-2 rounded-sm hover:bg-gray-800/50">
                            <LogOutIcon className="w-5 h-5" />
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={() => onNavigate('auth')} className="text-sm font-semibold bg-green-500 text-gray-950 px-4 py-2 rounded-sm hover:bg-green-400 transition-colors">
                        Login / Sign Up
                    </button>
                )}
            </div>

            <a
              href="https://github.com/google/prompt-gallery"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              className="text-slate-400 hover:text-green-400 transition-colors ml-4 p-2 hidden md:block"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            
            <div className="md:hidden ml-2">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-gray-800/80 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <nav className="space-y-1 px-2 pt-2 pb-3">
              <NavLink href="#features" onClick={(e) => handleScrollLinkClick(e, '#features')}>Features</NavLink>
              <NavLink href="#how-it-works" onClick={(e) => handleScrollLinkClick(e, '#how-it-works')}>How It Works</NavLink>
              <NavLink href="#generator" onClick={(e) => handleScrollLinkClick(e, '#generator')}>Generator</NavLink>
              <NavLink href="#gallery-page" onClick={(e) => handleNavClick(e, 'gallery')}>Gallery</NavLink>
              <div className="border-t border-slate-700/50 my-2"></div>
              {user ? (
                  <>
                    <NavLink href="#" onClick={(e) => handleNavClick(e, 'dashboard')}>Dashboard</NavLink>
                    <NavLink href="#" onClick={() => handleLogout()}>Logout</NavLink>
                  </>
                ) : (
                  <NavLink href="#" onClick={(e) => handleNavClick(e, 'auth')}>Login / Sign Up</NavLink>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};