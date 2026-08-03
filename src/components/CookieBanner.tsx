import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, Settings } from 'lucide-react';

interface CookieBannerProps {
  onOpenPrivacyPolicy: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('cookie_consent_status');
      if (!consent) {
        // Show banner after short delay for optimal UX
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('Cookie consent check failed:', e);
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('cookie_consent_status', 'accepted');
      localStorage.setItem('cookie_consent_date', new Date().toISOString());
    } catch (e) {
      console.warn('Cookie consent save error:', e);
    }
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    try {
      localStorage.setItem('cookie_consent_status', 'essential_only');
      localStorage.setItem('cookie_consent_date', new Date().toISOString());
    } catch (e) {
      console.warn('Cookie consent save error:', e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-slate-900/95 backdrop-blur-md text-white border-t border-slate-800 shadow-2xl print:hidden transition-all duration-300 animate-slide-up"
      role="region"
      aria-label="Cookie and Privacy Notification"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm">
        
        <div className="flex items-start gap-3.5 max-w-3xl">
          <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              Cookie & Local Privacy Preferences
              <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                GDPR & AdSense Compliant
              </span>
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              We use essential local browser storage to save your invoice drafts securely on your device. Google AdSense uses cookies to serve personalized advertisements. By clicking &quot;Accept All&quot;, you consent to our privacy terms.
            </p>
            {showDetails && (
              <div className="mt-2 p-3 bg-slate-800/90 rounded-lg text-xs text-slate-300 space-y-1.5 border border-slate-700">
                <p><strong>• Essential Local Storage:</strong> Saves your custom company info, client lists, and draft invoices locally inside your browser.</p>
                <p><strong>• AdSense Advertising Cookies:</strong> Serves relevant ads by Google to keep this invoice tool 100% free forever.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors border border-slate-700 flex items-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{showDetails ? 'Hide Info' : 'Details'}</span>
          </button>

          <button
            onClick={onOpenPrivacyPolicy}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors border border-slate-700 underline"
          >
            Privacy Policy
          </button>

          <button
            onClick={handleAcceptEssential}
            className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs transition-colors border border-slate-700"
          >
            Essential Only
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Accept All</span>
          </button>
        </div>

      </div>
    </div>
  );
};
