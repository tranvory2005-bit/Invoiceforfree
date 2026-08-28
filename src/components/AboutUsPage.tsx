import React from 'react';
import { 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Lock, 
  Heart, 
  CheckCircle2, 
  Mail, 
  FileText, 
  ArrowRight, 
  Globe2 
} from 'lucide-react';
import { GoogleAd } from './GoogleAd';
import { SeoBreadcrumbs } from './SeoBreadcrumbs';

interface AboutUsPageProps {
  onOpenEditor: () => void;
  onOpenContact: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onOpenEditor,
  onOpenContact
}) => {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Semantic Breadcrumbs */}
      <div className="mb-6">
        <SeoBreadcrumbs
          items={[
            { name: 'About Us', url: '#about-us' },
          ]}
          onNavigate={(url) => {
            if (url === '#editor') {
              onOpenEditor();
            }
          }}
        />
      </div>
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-4 uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>About InvoicesForFree</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Empowering Freelancers & Small Businesses with 100% Free, Private Billing
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          We believe creating professional, tax-compliant invoices should be fast, accessible, and completely free — with zero paywalls, forced accounts, or privacy risks.
        </p>
      </div>

      {/* Origin Story / Mission */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-10 space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span>Our Origin & Mission</span>
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed">
          Like many independent contractors and agency owners, our team grew frustrated with online "free" invoice generators that lured users in with a clean form, only to hold their PDF hostage behind mandatory sign-ups, credit card entry forms, monthly subscriptions, or unsightly watermarks.
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          In 2026, we launched <strong>InvoicesForFree.com</strong> with a clear founding promise: to provide a world-class, professional invoice creation suite that remains <strong>100% free forever</strong>. No hidden paywalls, no forced email registrations, and zero watermarks on exported PDFs.
        </p>
      </div>

      {/* Core Architectural Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Privacy-First Architecture</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Your clients, pricing rates, and banking data belong solely to you. InvoicesForFree operates client-side: all your drafts and history stay safely stored inside your local browser storage. We never sell, harvest, or transmit your financial information to external databases.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Globe2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Global Tax & Currency Compliance</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Whether you are billing in USD, EUR, GBP, CAD, AUD, or JPY, our platform supports multi-currency rendering and dynamic tax line item calculations (including VAT, GST, and US Sales Tax).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Editorial & Accounting Standards</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Our educational guides, invoicing checklists, and templates are reviewed against current tax guidelines from the IRS (United States), HMRC (United Kingdom), the European Commission (EU VAT), and the ATO (Australia).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Sustainable, Non-Intrusive Ads</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We sustain our server hosting and editorial research via tasteful, non-intrusive banner advertising placed strictly alongside our educational articles. We will never clutter your invoice workspace or print dialog with popups.
          </p>
        </div>

      </div>

      {/* Editorial Board & Team */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Editorial & Development Team</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-sm mx-auto flex items-center justify-center mb-3">
              MV
            </div>
            <div className="font-bold text-slate-900 text-sm">Michael Vance</div>
            <div className="text-xs text-slate-500 mb-2">Editorial Lead & SME Accounting</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              10+ years advising freelancers and early-stage ventures on bookkeeping, trade terms, and financial systems.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold text-sm mx-auto flex items-center justify-center mb-3">
              ER
            </div>
            <div className="font-bold text-slate-900 text-sm">Elena Rostova</div>
            <div className="text-xs text-slate-500 mb-2">Cross-Border Tax Analyst</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Specialist in European VAT Directive compliance, reverse charges, and North American sales tax rules.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold text-sm mx-auto flex items-center justify-center mb-3">
              TV
            </div>
            <div className="font-bold text-slate-900 text-sm">Tran V.</div>
            <div className="text-xs text-slate-500 mb-2">Lead Platform Architect</div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Full-stack developer focused on high-performance vector rendering, privacy-first storage, and clean UX.
            </p>
          </div>
        </div>
      </div>

      {/* Ad Placement */}
      <div className="mb-12">
        <GoogleAd 
          client="ca-pub-2875537731587160"
          slot="2802725446"
          label="Advertisement" 
        />
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="text-xl font-bold mb-1">Have Questions or Suggestions?</h3>
          <p className="text-xs sm:text-sm text-blue-100">
            We welcome feedback from contractors, accountants, and developers worldwide.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="px-4 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition-colors cursor-pointer shadow-xs"
          >
            Contact Support
          </button>
          <button
            onClick={onOpenEditor}
            className="px-4 py-2.5 rounded-xl bg-blue-800 text-white font-bold text-xs hover:bg-blue-900 transition-colors cursor-pointer"
          >
            Open Generator
          </button>
        </div>
      </div>

    </div>
  );
};
