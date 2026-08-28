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
  style = { display: 'block', minWidth: '250px' },
  label = 'Advertisement',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Only attempt push when the container is rendered and has a measurable width > 0
    let timer: NodeJS.Timeout | null = null;

    const tryPushAd = () => {
      if (isPushed.current) return;
      if (typeof window === 'undefined') return;

      const adElement = adRef.current;
      const container = containerRef.current;

      // Ensure the container is rendered and has non-zero visible width
      const width = adElement?.offsetWidth || container?.offsetWidth || 0;
      if (width <= 0) {
        // Retry shortly once layout or tab rendering completes
        timer = setTimeout(tryPushAd, 200);
        return;
      }

      try {
        // Check if ad was already processed or filled by AdSense
        if (adElement && adElement.getAttribute('data-adsbygoogle-status')) {
          isPushed.current = true;
          return;
        }

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      } catch (err: any) {
        // Catch TagError and other AdSense initialization warnings safely
        console.warn('Google AdSense note:', err?.message || err);
      }
    };

    // Use requestAnimationFrame / timeout to let DOM settle and compute widths
    timer = setTimeout(tryPushAd, 100);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`google-ad-wrapper print:hidden my-6 text-center w-full min-w-[280px] ${className}`}
    >
      {/* AdSense Policy Compliant Header Label */}
      <div className="flex items-center justify-center max-w-4xl mx-auto mb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
        <span>{label}</span>
      </div>

      {/* InvoicesForFree - Knowledge Hub Bottom Banner */}
      <div className="google-ad-container w-full min-h-[90px] min-w-[280px] flex items-center justify-center max-w-4xl mx-auto rounded-lg overflow-hidden bg-slate-50/80 border border-slate-200/70">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ width: '100%', minWidth: '250px', ...style }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    </div>
  );
};

