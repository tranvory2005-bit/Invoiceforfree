import React, { useState } from 'react';
import { 
  Mail, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle2, 
  Send, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GoogleAd } from './GoogleAd';
import { SeoBreadcrumbs } from './SeoBreadcrumbs';

interface ContactUsPageProps {
  onOpenEditor: () => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ onOpenEditor }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Is InvoicesForFree really 100% free forever?',
      a: 'Yes, absolutely. We do not require credit cards, trial periods, or subscriptions. All PDF downloads and customization tools are free for individuals and commercial entities.'
    },
    {
      q: 'How is my business and client data protected?',
      a: 'InvoicesForFree operates client-side. Your invoice drafts, client addresses, and banking numbers stay saved exclusively inside your local device browser storage and are never uploaded to remote databases.'
    },
    {
      q: 'Can I add my own company logo and custom branding?',
      a: 'Yes! You can upload PNG, JPG, or SVG logos and select custom brand accent colors in the toolbar to match your corporate identity.'
    },
    {
      q: 'How do I export my invoice as a clean PDF file?',
      a: 'Click "Print / Download PDF" at the top right of the editor. In your browser\'s print dialog, choose "Save as PDF" as the destination.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* Semantic Breadcrumbs */}
      <div className="mb-6">
        <SeoBreadcrumbs
          items={[
            { name: 'Contact & Support', url: '#contact' },
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
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact & Support Desk</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          We’re Here to Help You Streamline Your Invoicing
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have a question, feature request, partnership inquiry, or technical feedback? Our dedicated support team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Left Side: Contact Information & Hours */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Direct Inquiries</h2>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">General Support</div>
                  <a href="mailto:support@invoicesforfree.com" className="text-blue-600 hover:underline">
                    support@invoicesforfree.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Response Times</div>
                  <div>Monday – Friday</div>
                  <div className="text-slate-400">Within 24 business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Privacy Assurance</div>
                  <div>Zero telemetry logging on your client or invoice numbers.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Feature Suggestions</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We frequently roll out new features based on community requests. Tell us what currency, tax rate, or template layout you need next!
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Inquiry Form */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Thank You for Reaching Out!</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your message has been received. Our team will review your inquiry and get back to you at <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Send Us a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject Category
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Tax / Formatting Question">Tax / Formatting Question</option>
                  <option value="Report an Issue">Report a Bug / Issue</option>
                  <option value="Partnership / Press">Partnership / Press</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with your invoicing workflow?"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

      </div>

      {/* AdSense Unit */}
      <div className="mb-16">
        <GoogleAd 
          client="ca-pub-2875537731587160"
          slot="2802725446"
          label="Advertisement" 
        />
      </div>

      {/* Quick FAQ Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Quick answers to common questions about using InvoicesForFree.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-left text-xs font-bold text-slate-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
