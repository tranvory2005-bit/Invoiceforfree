import React, { useEffect, useRef, useState } from 'react';
import { Megaphone, Settings, Check, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

interface GoogleAdProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const GoogleAd: React.FC<GoogleAdProps> = ({
  client,
  slot = '1234567890',
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  // Allow storing custom Publisher ID in localStorage for easy testing without rebuilds
  const [localPublisherId, setLocalPublisherId] = useState<string>(() => {
    try {
      return localStorage.getItem('google_adsense_pub_id') || '';
    } catch {
      return '';
    }
  });
  const [localSlotId, setLocalSlotId] = useState<string>(() => {
    try {
      return localStorage.getItem('google_adsense_slot_id') || slot;
    } catch {
      return slot;
    }
  });

  const [showConfig, setShowConfig] = useState(false);
  const [adLoaded, setAdLoaded] = useState<boolean>(false);
  const [adBlockedOrEmpty, setAdBlockedOrEmpty] = useState<boolean>(false);

  // Priority order: prop > localStorage > environment variable > default demo ID
  const envClientId = (import.meta as any).env?.VITE_ADSENSE_CLIENT_ID || '';
  const effectiveClientId = client || localPublisherId || envClientId;
  const effectiveSlotId = localSlotId || slot;

  const isConfigured = Boolean(effectiveClientId && effectiveClientId.startsWith('ca-pub-'));

  useEffect(() => {
    if (!isConfigured) return;

    // Load Google AdSense Script dynamically
    const scriptId = 'google-adsense-script';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${effectiveClientId}`;
      scriptElement.async = true;
      scriptElement.crossOrigin = 'anonymous';
      document.head.appendChild(scriptElement);
    }

    // Push ad request to Google AdSense queue
    if (!isPushed.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
        setAdLoaded(true);
      } catch (err) {
        console.warn('Google AdSense push warning:', err);
        setAdBlockedOrEmpty(true);
      }
    }

    // Check if Google AdSense iframe rendered content or was blocked/empty (common on unapproved dev URLs)
    const checkTimer = setTimeout(() => {
      if (adRef.current) {
        const height = adRef.current.clientHeight || adRef.current.offsetHeight;
        const status = adRef.current.getAttribute('data-ad-status');
        if (status === 'unfilled' || height === 0) {
          setAdBlockedOrEmpty(true);
        }
      }
    }, 2500);

    return () => clearTimeout(checkTimer);
  }, [effectiveClientId, isConfigured]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('google_adsense_pub_id', localPublisherId);
      localStorage.setItem('google_adsense_slot_id', localSlotId);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    setShowConfig(false);
    window.location.reload();
  };

  return (
    <div className={`google-ad-wrapper print:hidden my-4 text-center ${className}`}>
      
      {/* Ad Label & Header Bar */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-1.5 px-1 text-[11px] font-medium text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="uppercase tracking-wider font-semibold text-slate-500">{label}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400 flex items-center gap-1">
            <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
            </svg>
            Ads by Google
          </span>
        </div>

        <button
          onClick={() => setShowConfig(!showConfig)}
          className="hover:text-blue-600 transition-colors flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded"
          title="Configure AdSense Publisher ID"
        >
          <Settings className="w-3 h-3" />
          <span>{isConfigured ? 'AdSense Active' : 'Configure AdSense ID'}</span>
        </button>
      </div>

      {/* AdSense Configuration Modal / Quick Inline Panel */}
      {showConfig && (
        <form
          onSubmit={handleSaveConfig}
          className="max-w-xl mx-auto mb-4 bg-white border border-blue-200 rounded-xl p-4 shadow-lg text-left text-xs space-y-3 z-20 relative"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
              <Megaphone className="w-4 h-4 text-blue-600" />
              Google AdSense Integration Settings
            </h4>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ✕
            </button>
          </div>

          <p className="text-slate-500 text-[11px] leading-relaxed">
            Enter your Google AdSense <strong>Publisher ID</strong> (starts with <code>ca-pub-</code>) and <strong>Ad Slot ID</strong> below to connect your real Google Ad account.
          </p>

          <div className="space-y-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                AdSense Publisher ID (ca-pub-xxxxxxxxxxxxxxxx):
              </label>
              <input
                type="text"
                value={localPublisherId}
                onChange={(e) => setLocalPublisherId(e.target.value.trim())}
                placeholder="e.g. ca-pub-1234567890123456"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Ad Slot ID (Optional):
              </label>
              <input
                type="text"
                value={localSlotId}
                onChange={(e) => setLocalSlotId(e.target.value.trim())}
                placeholder="e.g. 1234567890"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <a
              href="https://adsense.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
            >
              <span>Get your AdSense ID from Google</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('google_adsense_pub_id');
                  localStorage.removeItem('google_adsense_slot_id');
                  setLocalPublisherId('');
                  setLocalSlotId(slot);
                  window.location.reload();
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 flex items-center gap-1 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save & Refresh</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Actual Google AdSense Tag Container */}
      <div className="google-ad-container min-h-[90px] flex items-center justify-center max-w-4xl mx-auto bg-slate-50 rounded-xl border border-slate-200 p-2 overflow-hidden relative shadow-sm">
        
        {/* Real Google AdSense Script <ins> element */}
        {isConfigured && (
          <ins
            ref={adRef}
            className="adsbygoogle w-full"
            style={style}
            data-ad-client={effectiveClientId}
            data-ad-slot={effectiveSlotId}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        )}

        {/* Display Visual Ad Placeholder / Banner when in Preview Mode or unapproved domain status */}
        {(!isConfigured || adBlockedOrEmpty) && (
          <div className="w-full py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-left bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50 rounded-lg">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shrink-0 shadow-sm">
                Ad
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">
                    Google AdSense Banner Placement
                  </h4>
                  <span className="text-[10px] font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    {isConfigured ? 'AdSense Connected' : 'Ready for Ads'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 max-w-lg leading-relaxed">
                  {isConfigured ? (
                    <span>
                      Google AdSense unit active (<code className="font-mono text-blue-600">{effectiveClientId}</code>). Real ads will display automatically once Google verifies your live domain.
                    </span>
                  ) : (
                    <span>
                      Google AdSense code embedded. Click <button onClick={() => setShowConfig(true)} className="text-blue-600 font-semibold underline hover:text-blue-800">Configure AdSense ID</button> or add <code className="font-mono text-blue-600">VITE_ADSENSE_CLIENT_ID</code> to show live ads.
                    </span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowConfig(true)}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-blue-700 font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 hover:bg-blue-50"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{isConfigured ? 'Edit AdSense' : 'Enter Publisher ID'}</span>
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
