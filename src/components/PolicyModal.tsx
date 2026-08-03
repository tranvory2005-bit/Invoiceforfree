import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Info, 
  Mail, 
  BookOpen, 
  X, 
  CheckCircle2, 
  Send, 
  Lock, 
  HelpCircle,
  ExternalLink,
  Globe,
  Award,
  AlertTriangle
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'about' | 'contact' | 'guide';

interface PolicyModalProps {
  isOpen: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  // Form state for Contact Us tab
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', category: 'General Inquiry', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 print:hidden">
      
      {/* Modal Dialog Card */}
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                InvoicesForFree.com Legal & Center
                <span className="text-[10px] font-semibold bg-blue-500/30 text-blue-300 border border-blue-400/30 px-2 py-0.5 rounded-full">
                  Verified AdSense Policy
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official Compliance Disclosures, Terms, & Privacy Guidelines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors text-lg font-bold"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'privacy'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'terms'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4 text-blue-600" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'about'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <Info className="w-4 h-4 text-indigo-600" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'contact'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-amber-600" />
            <span>Contact Us</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap border-b-2 ${
              activeTab === 'guide'
                ? 'bg-white text-blue-600 border-blue-600 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Invoicing Guide</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <article className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Privacy Policy</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Last updated: August 2, 2026 • Compliant with Google AdSense Policies, GDPR, & CCPA
                </p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
                <h4 className="font-bold text-emerald-900 flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Client-Side Privacy Guarantee
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  Your privacy is our highest priority. All financial figures, invoice descriptions, client addresses, and tax identification numbers entered on <strong>invoicesforfree.com</strong> are stored strictly inside your own browser&apos;s local storage cache (<code>localStorage</code>). We do NOT transmit or store your private financial invoices on external web servers.
                </p>
              </div>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">1. Information We Collect & How It Is Used</h4>
                <p className="text-xs text-slate-600">
                  When you visit <strong>InvoicesForFree.com</strong>, we do not require user account registration, passwords, or personal login information.
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-1.5 pl-2">
                  <li><strong>Local Invoice Draft Data:</strong> Saved strictly on your computer or mobile device using standard HTML5 Web Storage. You can clear this data at any time by clearing your browser cache.</li>
                  <li><strong>Log Files & Technical Analytics:</strong> Like most web applications, standard server logs record anonymous technical metadata (IP addresses, browser type, referral pages, date/time stamps) for network security and server performance diagnostic purposes.</li>
                </ul>
              </section>

              <section className="space-y-3 p-4 bg-blue-50/60 border border-blue-100 rounded-xl">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  2. Google AdSense & Third-Party Advertising Cookies
                </h4>
                <p className="text-xs text-slate-600">
                  This website displays advertisements delivered by <strong>Google AdSense</strong> (Publisher ID: <code>ca-pub-2875537731587160</code>) to keep this tool 100% free for users worldwide.
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-2 pl-2">
                  <li>
                    <strong>Cookies & Web Beacons:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the Internet.
                  </li>
                  <li>
                    <strong>Google DART Cookie:</strong> Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
                  </li>
                  <li>
                    <strong>Opting Out of Personalized Ads:</strong> Users may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">Google Ads Settings</a>. Alternatively, users can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noreferrer" className="text-blue-600 underline font-semibold">aboutads.info</a>.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">3. GDPR & CCPA Consumer Privacy Rights</h4>
                <p className="text-xs text-slate-600">
                  Under the European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), users have the right to request information about data processing, opt out of advertising cookies, or wipe locally stored cache. Because we do not store user database records on cloud servers, clearing your browser cookies completely removes all stored invoice data.
                </p>
              </section>

              <section className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm">Contact Privacy Officer</h4>
                <p className="text-xs text-slate-600">
                  For privacy questions, GDPR requests, or disclosures, please contact us at <a href="mailto:support@invoicesforfree.com" className="text-blue-600 font-semibold underline">support@invoicesforfree.com</a>.
                </p>
              </section>
            </article>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <article className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Terms of Service</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Effective Date: August 2, 2026 • Free Online Invoice Generator Rules
                </p>
              </div>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">1. Acceptance of Terms</h4>
                <p className="text-xs text-slate-600">
                  By accessing and using <strong>InvoicesForFree.com</strong>, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">2. Scope of Service & License</h4>
                <p className="text-xs text-slate-600">
                  <strong>InvoicesForFree.com</strong> provides a free browser-based PDF invoice creation tool. We grant you a revocable, non-exclusive, royalty-free license to generate, download, print, and distribute business invoices created using our tool for commercial and personal billing purposes.
                </p>
              </section>

              <section className="space-y-3 p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
                <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  3. Disclaimer of Financial & Legal Accuracy
                </h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  While our calculator automatically computes subtotals, tax rates, and discounts, users are solely responsible for verifying the accuracy of tax rates (VAT, GST, Sales Tax), legal compliance, and payment terms before sending invoices to clients. <strong>InvoicesForFree.com</strong> is provided &quot;AS IS&quot; without financial or tax warranty.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">4. Ownership of User Generated Content</h4>
                <p className="text-xs text-slate-600">
                  All company logos, client information, pricing details, and text content entered into invoices remain 100% the intellectual property of the user. We claim zero ownership or rights over your generated PDF invoices.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">5. Limitation of Liability</h4>
                <p className="text-xs text-slate-600">
                  In no event shall <strong>InvoicesForFree.com</strong> or its operators be liable for lost profits, data loss due to cleared browser cache, or indirect damages resulting from invoice creation or client payment disputes.
                </p>
              </section>
            </article>
          )}

          {/* TAB 3: ABOUT US */}
          {activeTab === 'about' && (
            <article className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">About InvoicesForFree.com</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Empowering Freelancers, Small Businesses, & Contractors Worldwide
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto font-bold text-lg">
                    100%
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Free Forever</h4>
                  <p className="text-xs text-slate-500">No hidden subscriptions, paywalls, or credit card requirements.</p>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Client-Side Privacy</h4>
                  <p className="text-xs text-slate-500">Your billing data stays inside your browser cache. Zero server leaks.</p>
                </div>

                <div className="p-4 bg-purple-50 border border-purple-100 rounded-xl space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center mx-auto font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Professional Quality</h4>
                  <p className="text-xs text-slate-500">4 customizable template styles, logo uploads, and crisp PDF rendering.</p>
                </div>
              </div>

              <section className="space-y-3">
                <h4 className="font-bold text-slate-900 text-base">Our Mission</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Invoicing software shouldn&apos;t cost a monthly fee or force you to sign up for bloated accounting platforms when all you need is a clean, instant PDF invoice for your clients. <strong>InvoicesForFree.com</strong> was engineered to solve this exact problem: providing an ultra-fast, professional, privacy-first invoice maker that runs seamlessly on desktop and mobile devices.
                </p>
              </section>

              <section className="space-y-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <h4 className="font-bold text-slate-900 text-sm">How We Support Free Access</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To keep <strong>InvoicesForFree.com</strong> completely free for users globally without charging subscription fees, we display non-intrusive advertisements managed by Google AdSense. We carefully ensure ads never block your invoice preview or interfere with PDF generation.
                </p>
              </section>
            </article>
          )}

          {/* TAB 4: CONTACT US */}
          {activeTab === 'contact' && (
            <article className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Contact Us & Support</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Have questions, feature requests, or technical feedback? We&apos;re here to help!
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">Message Received!</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out to <strong>InvoicesForFree.com</strong>. Our support team has logged your query and will reply to <strong>{contactForm.email || 'your email'}</strong> within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category</label>
                      <select
                        value={contactForm.category}
                        onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs bg-white"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Feature Request">Feature Request</option>
                        <option value="PDF Print Assistance">PDF / Print Assistance</option>
                        <option value="AdSense / Business Inquiry">AdSense / Business Inquiry</option>
                        <option value="Bug Report">Bug Report</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="Brief summary..."
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message Details *</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="How can we assist you today?"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-400">
                      Direct Email: <a href="mailto:support@invoicesforfree.com" className="text-blue-600 font-semibold underline">support@invoicesforfree.com</a>
                    </p>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </article>
          )}

          {/* TAB 5: INVOICING BEST PRACTICES GUIDE */}
          {activeTab === 'guide' && (
            <article className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Invoicing Guide & Best Practices</h3>
                <p className="text-xs text-slate-500 mt-1">
                  How to create professional, legal, and prompt-paying invoices for freelancers and small businesses.
                </p>
              </div>

              <div className="space-y-4">
                <section className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    1. Mandatory Elements of a Legal Invoice
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To ensure prompt payment and satisfy tax audit requirements, every professional invoice must include:
                  </p>
                  <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 pl-2">
                    <li>Unique Invoice Number (e.g., INV-2026-001)</li>
                    <li>Invoice Date and Payment Due Date (e.g., Net 15 or Net 30)</li>
                    <li>Your Business Name, Address, Contact Info, and Tax ID / VAT Registration</li>
                    <li>Client Business Name and Billing Contact</li>
                    <li>Detailed Description of Goods or Services Provided</li>
                    <li>Subtotal, Applicable Tax Rates (VAT/GST/Sales Tax), Discounts, and Total Balance Due</li>
                    <li>Payment Instructions (Bank Wire Details, IBAN, SWIFT, or PayPal link)</li>
                  </ul>
                </section>

                <section className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    2. Understanding Standard Payment Terms
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-0.5">Due Upon Receipt:</strong>
                      <span className="text-slate-500">Payment is due immediately upon client receiving the PDF invoice.</span>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-0.5">Net 15 / Net 30:</strong>
                      <span className="text-slate-500">Payment is due within 15 or 30 calendar days from the invoice issuance date.</span>
                    </div>
                    <div className="p-3 bg-white border border-slate-200 rounded-lg">
                      <strong className="block text-slate-900 mb-0.5">2/10 Net 30:</strong>
                      <span className="text-slate-500">Client gets a 2% discount if paid within 10 days; otherwise full amount due in 30 days.</span>
                    </div>
                  </div>
                </section>

                <section className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    3. Best Practices for Faster Payment
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Always send your PDF invoice immediately upon milestone completion. Include clear payment notes at the bottom of your invoice (e.g., &quot;Thank you for your business! Please remit wire payment to routing number XYZ&quot;).
                  </p>
                </section>
              </div>
            </article>
          )}

        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} InvoicesForFree.com • Google AdSense Approved Platform
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
