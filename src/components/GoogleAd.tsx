import React, { useEffect, useRef } from 'react';

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
  client = 'ca-pub-2875537731587160',
  slot = '2802725446',
  format = 'auto',
  responsive = true,
  className = '',
  style = { display: 'block' },
  label = 'Advertisement',
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Only push if window.adsbygoogle is available and hasn't been pushed for this element
    if (!isPushed.current && typeof window !== 'undefined') {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err) {
        console.warn('Google AdSense note:', err);
      }
    }
  }, []);

  return (
    <div className={`google-ad-wrapper print:hidden my-6 text-center ${className}`}>
      {/* AdSense Policy Compliant Header Label */}
      <div className="flex items-center justify-center max-w-4xl mx-auto mb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
        <span>{label}</span>
      </div>

      {/* InvoicesForFree - Knowledge Hub Bottom Banner */}
      <div className="google-ad-container min-h-[90px] flex items-center justify-center max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50/80 border border-slate-200/70">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={style}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};

