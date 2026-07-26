import React from 'react';
import { ShieldCheck, FileCheck2, Zap, Globe, Sparkles, HelpCircle } from 'lucide-react';
import { GoogleAd } from './GoogleAd';

export const SeoFooter: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white py-12 px-4 sm:px-6 lg:px-8 print:hidden">
      <div className="max-w-7xl mx-auto space-y-12 text-gray-700">
        
        {/* Core Value Proposition Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Instant PDF Generation</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Create, preview, and download polished invoices in seconds without waiting or registering for an account.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">100% Secure & Private</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              All client names, tax numbers, and bank details stay saved locally inside your browser cache.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Multi-Currency & Tax</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Support for USD, EUR, GBP, CAD, AUD, JPY and custom VAT, Sales Tax, or GST rules worldwide.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Custom Branding</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Upload your company logo, choose custom font pairings, and select color themes matching your brand.
            </p>
          </div>
        </section>

        {/* Informational SEO Copy & How-To Guide */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
          <article className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-blue-600" />
              How to Create a Professional Invoice in 3 Steps
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-xs text-gray-600 leading-relaxed">
              <li>
                <strong className="text-gray-800">Enter Business & Client Details:</strong> Add your company name, address, tax ID, and client contact information.
              </li>
              <li>
                <strong className="text-gray-800">Add Line Items & Pricing:</strong> Fill in descriptions, quantity, rates, discounts, shipping fees, or applicable taxes.
              </li>
              <li>
                <strong className="text-gray-800">Customize & Export:</strong> Pick a template style (Modern, Classic, Minimal, Elegant), customize accent colors, and click <span className="font-semibold text-blue-600">Print / Download PDF</span>.
              </li>
            </ol>
          </article>

          {/* Frequently Asked Questions (FAQ) Section for Search Crawlers */}
          <article className="space-y-3">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-600" />
              Frequently Asked Questions (FAQ)
            </h2>
            <div className="space-y-2 text-xs">
              <details className="group bg-slate-50 p-3 rounded-xl border border-gray-100 cursor-pointer">
                <summary className="font-semibold text-gray-800 flex justify-between items-center">
                  <span>Is this invoice maker free?</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Yes, this invoice generator is completely free. There are no limits on the number of invoices you can create, customize, or download as PDF files.
                </p>
              </details>

              <details className="group bg-slate-50 p-3 rounded-xl border border-gray-100 cursor-pointer">
                <summary className="font-semibold text-gray-800 flex justify-between items-center">
                  <span>Can I save my invoice history for later?</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Yes! Click the "Save Draft" button at any time. Your invoices are saved in your browser's local storage under the "Saved Invoices" tab so you can edit or duplicate them whenever you return.
                </p>
              </details>

              <details className="group bg-slate-50 p-3 rounded-xl border border-gray-100 cursor-pointer">
                <summary className="font-semibold text-gray-800 flex justify-between items-center">
                  <span>How do I export to PDF format?</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  Simply click the blue "Print / Download PDF" button at the top. Choose "Save as PDF" as your print destination in Google Chrome, Microsoft Edge, Safari, or Firefox.
                </p>
              </details>
            </div>
          </article>
        </section>

        {/* Footer Ad Placement */}
        <section className="pt-4 border-t border-gray-100">
          <GoogleAd label="Sponsored Content" />
        </section>

        {/* Footer Copyright */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} Invoice Generator Pro. Free Online PDF Billing Tool.</p>
          <div className="flex items-center gap-4 text-gray-500 font-medium">
            <span>Free PDF Invoice Creator</span>
            <span>•</span>
            <span>Multi-Currency Invoice Maker</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
