import React, { useEffect, useRef, useState } from 'react';
import { Settings, Check, ExternalLink } from 'lucide-react';

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

  // Allow storing custom Publisher ID in localStorage for testing
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

  // Priority order: prop > localStorage > environment variable > site default publisher ID
  const DEFAULT_CLIENT_ID = 'ca-pub-2875537731587160';
  const envClientId = (import.meta as any).env?.VITE_ADSENSE_CLIENT_ID || '';
  const effectiveClientId = client || localPublisherId || envClientId || DEFAULT_CLIENT_ID;
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
      } catch (err) {
        console.warn('Google AdSense push note:', err);
      }
    }
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
    <div className={`google-ad-wrapper print:hidden my-6 text-center ${className}`}>
      
      {/* AdSense Policy Compliant Header Label */}
      <div className="flex items-center justify-between max-w-4xl mx-auto mb-1.5 px-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
        <span>{label}</span>
        
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="hover:text-slate-600 transition-colors flex items-center gap-1 text-[10px] text-slate-400 lowercase font-normal"
          title="Ad Configuration"
        >
          <Settings className="w-2.5 h-2.5" />
          <span>ads info</span>
        </button>
      </div>

      {/* AdSense Configuration Modal */}
      {showConfig && (
        <form
          onSubmit={handleSaveConfig}
          className="max-w-md mx-auto mb-4 bg-white border border-slate-200 rounded-xl p-4 shadow-lg text-left text-xs space-y-3 z-20 relative"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-slate-800 text-xs">
              Google AdSense Settings
            </h4>
            <button
              type="button"
              onClick={() => setShowConfig(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Publisher ID:
              </label>
              <input
                type="text"
                value={localPublisherId || effectiveClientId}
                onChange={(e) => setLocalPublisherId(e.target.value.trim())}
                placeholder="ca-pub-2875537731587160"
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Slot ID:
              </label>
              <input
                type="text"
                value={localSlotId}
                onChange={(e) => setLocalSlotId(e.target.value.trim())}
                placeholder="1234567890"
                className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
            <a
              href="https://adsense.google.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Google AdSense</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 flex items-center gap-1"
            >
              <Check className="w-3 h-3" />
              <span>Save</span>
            </button>
          </div>
        </form>
      )}

      {/* Official Google AdSense Container */}
      <div className="google-ad-container min-h-[90px] flex items-center justify-center max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50/60 border border-slate-200/60">
        <ins
          ref={adRef}
          className="adsbygoogle w-full"
          style={style}
          data-ad-client={effectiveClientId}
          data-ad-slot={effectiveSlotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};
