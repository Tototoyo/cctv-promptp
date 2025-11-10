import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-sm border-t border-green-400/20 p-4 z-50 animate-fade-in">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300">
          This site uses cookies to personalize content and analyze our traffic. We also share information about your use of our site with our advertising and analytics partners.
        </p>
        <button
          onClick={handleAccept}
          className="px-6 py-2 bg-green-500 text-gray-950 font-bold rounded-sm hover:bg-green-400 transition-colors duration-200 flex-shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
};
