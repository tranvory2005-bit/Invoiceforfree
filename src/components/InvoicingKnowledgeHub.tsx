import React, { useState } from 'react';
import { 
  BookOpen, 
  Globe2, 
  FileSpreadsheet, 
  HelpCircle, 
  CheckCircle2, 
  Building2, 
  Coins, 
  Clock, 
  FileText, 
  Briefcase, 
  Palette, 
  Code2, 
  Wrench,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Percent,
  Receipt,
  ArrowRight,
  Sparkles,
  Camera,
  Layers
} from 'lucide-react';
import { GoogleAd } from './GoogleAd';

interface InvoicingKnowledgeHubProps {
  onLoadSample?: (templateKey: string) => void;
}

export const InvoicingKnowledgeHub: React.FC<InvoicingKnowledgeHubProps> = ({ onLoadSample }) => {
  const [activeCategory, setActiveCategory] = useState<'guides' | 'countries' | 'terms' | 'industries' | 'tax' | 'faq'>('guides');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is InvoicesForFree really 100% free with no watermarks?',
      a: 'Yes! InvoicesForFree is completely free forever. We do not place watermarks on your exported PDF invoices, require credit card entries, or lock features behind premium tiers.'
    },
    {
      q: 'Are my financial records, customer addresses, and drafts kept private?',
      a: 'Absolutely. We operate a client-side, local-first architecture. All draft inputs, invoice line items, tax IDs, and saved customer profiles remain safely stored inside your browser’s localStorage. Data is never uploaded to external advertising or tracking servers.'
    },
    {
      q: 'What is the difference between Net 30, Net 14, and Due Upon Receipt?',
      a: 'Due Upon Receipt means payment is expected immediately after invoice delivery. Net 14 gives the client 14 calendar days to pay, and Net 30 provides 30 calendar days. For small businesses and freelancers, Net 14 or Net 15 is recommended to maintain healthy cashflow.'
    },
    {
      q: 'How does the Reverse Charge VAT rule work on international EU invoices?',
      a: 'When an EU business sells B2B services or goods to a VAT-registered business in another EU member state, the seller does not charge local VAT. Instead, the seller records both VAT IDs and states "Reverse charge: VAT payable by the recipient" on the invoice.'
    },
    {
      q: 'Can I add my business logo and change currency symbols?',
      a: 'Yes. In the Invoice Editor, click "Upload Logo" to add your PNG, JPG, or SVG company emblem. You can switch between USD ($), EUR (€), GBP (£), CAD ($), AUD ($), JPY (¥), CHF, and more with one click.'
    },
    {
      q: 'What should I do if a client is late paying an invoice?',
      a: 'Send a polite payment reminder 3 days before the due date, followed by an overdue notice on day 1 post-due date. State any late fees agreed in the initial contract, reattach the original PDF invoice, and provide direct payment links for swift settlement.'
    }
  ];

  return (
    <section className="mt-12 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden print:hidden text-slate-800">
      
      {/* Knowledge Hub Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-6 sm:p-8">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Invoicing & Accounting Resource Center</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
            Invoicing Best Practices, Global Tax Rules & Compliance Guide
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Essential billing standards, legal invoice requirements, international VAT/GST compliance rules, and payment terms designed for freelancers, contractors, and small business owners.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-700/60">
          <button
            onClick={() => setActiveCategory('guides')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'guides'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Invoice Fundamentals</span>
          </button>

          <button
            onClick={() => setActiveCategory('countries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'countries'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>Global Tax & Compliance</span>
          </button>

          <button
            onClick={() => setActiveCategory('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'terms'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Payment Terms & Cashflow</span>
          </button>

          <button
            onClick={() => setActiveCategory('industries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'industries'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Industry Templates</span>
          </button>

          <button
            onClick={() => setActiveCategory('tax')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'tax'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Percent className="w-4 h-4" />
            <span>Calculations & Formulas</span>
          </button>

          <button
            onClick={() => setActiveCategory('faq')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeCategory === 'faq'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Invoicing FAQs</span>
          </button>
        </div>
      </div>

      {/* Content Body Area */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* SECTION 1: INVOICE FUNDAMENTALS */}
        {activeCategory === 'guides' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  The Anatomy of a Legally Compliant Professional Invoice
                </h3>
                <p className="text-xs text-slate-500">
                  Ensure your billing documents meet commercial standards to avoid payment delays or tax scrutiny.
                </p>
              </div>
              <a
                href="#guide/how-to-write-a-professional-invoice"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Read Full Step-by-Step Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="font-bold text-sm text-slate-900">Header & Business Identity</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Clear title (&quot;INVOICE&quot;), your registered business name, logo, physical address, business phone, email, and tax identification number (EIN, VAT, or ABN).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="font-bold text-sm text-slate-900">Unique Tracking & Dates</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sequential invoice numbering (e.g., INV-2026-0042), purchase order (PO) reference, issue date, and explicit payment due date.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="font-bold text-sm text-slate-900">Clear Itemization & Terms</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Itemized list of services or products, unit quantities, hourly or fixed rates, applicable subtotal, line-item discounts, and calculated taxes.
                </p>
              </div>
            </div>

            <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-xl space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-blue-600" />
                Key Differences: Invoice vs. Receipt vs. Proforma vs. Quote
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <strong className="block text-slate-900 mb-1">Quote / Estimate:</strong>
                  <span className="text-slate-600">Proposed pricing provided before work begins; non-binding until accepted.</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <strong className="block text-slate-900 mb-1">Proforma Invoice:</strong>
                  <span className="text-slate-600">Preliminary bill of sale sent prior to shipment/delivery, common in international trade.</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <strong className="block text-slate-900 mb-1">Tax / Commercial Invoice:</strong>
                  <span className="text-slate-600">Official demand for payment following completion of agreed deliverables.</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-blue-100">
                  <strong className="block text-slate-900 mb-1">Payment Receipt:</strong>
                  <span className="text-slate-600">Proof of payment issued to client after funds have successfully cleared.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: GLOBAL TAX & COMPLIANCE */}
        {activeCategory === 'countries' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  International Invoicing & Tax Rules by Country
                </h3>
                <p className="text-xs text-slate-500">
                  Tax requirements vary significantly across jurisdictions. Review key guidelines below:
                </p>
              </div>
              <a
                href="#guide/international-tax-invoicing-guide"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Read International Tax Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* United States */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    United States (IRS Compliance)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">W-9 / 1099-NEC</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  US businesses do not impose a federal VAT. Freelancers and independent contractors must provide their Employer Identification Number (EIN) or Social Security Number (SSN) via Form W-9. Clients must issue Form 1099-NEC for annual payments exceeding $600.
                </p>
                <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                  <li>Sales tax applies only to taxable tangible goods or specific state-regulated services.</li>
                  <li>Invoices must specify state and local sales tax rates separately where applicable.</li>
                </ul>
              </div>

              {/* European Union */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-emerald-600" />
                    European Union (EU VAT Directive)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">VAT & Reverse Charge</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  EU VAT Directive (2006/112/EC) mandates inclusion of both supplier and customer VAT numbers. For cross-border B2B transactions within the EU, the <em>&quot;Reverse Charge&quot;</em> rule applies, shifting tax liability to the buyer.
                </p>
                <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                  <li>Must state: &quot;Reverse charge: VAT payable by the recipient&quot; on B2B intra-community invoices.</li>
                  <li>Sequential, unbroken invoice numbering is strictly required by European tax authorities.</li>
                </ul>
              </div>

              {/* United Kingdom */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600" />
                    United Kingdom (HMRC Rules)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">HMRC Standard</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  UK VAT-registered businesses must display their 9-digit VAT registration number, the tax point (time of supply), unit price excluding VAT, the VAT rate charged (e.g., 20%), and the total VAT payable in GBP (£).
                </p>
                <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                  <li>Sole traders must include their full legal name and any trading name used.</li>
                  <li>Limited companies must include their registered office address and company number.</li>
                </ul>
              </div>

              {/* Canada & Australia */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Coins className="w-4 h-4 text-amber-600" />
                    Canada & Australia (GST / HST / ABN)
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">GST / HST</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  In Australia, invoices over $1,000 AUD must clearly state &quot;Tax Invoice&quot; and include the seller&apos;s Australian Business Number (ABN). In Canada, businesses registered for GST/HST must display their 9-digit CRA Business Number.
                </p>
                <ul className="text-xs text-slate-500 list-disc list-inside space-y-1">
                  <li>Australia GST: 10% standard rate on taxable supplies.</li>
                  <li>Canada: 5% Federal GST combined with Provincial Sales Tax (PST) or Harmonized Sales Tax (HST).</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 3: PAYMENT TERMS */}
        {activeCategory === 'terms' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Standard Commercial Payment Terms Explained
                </h3>
                <p className="text-xs text-slate-500">
                  Selecting the right payment terms improves cashflow predictability and reduces overdue receivables.
                </p>
              </div>
              <a
                href="#guide/payment-terms-and-cashflow-management"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Read Payment Terms Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Due Upon Receipt
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Payment is expected immediately upon delivery of the invoice. Best for one-off freelance tasks, digital deliverables, or service completion.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Net 15 / Net 30
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The client has 15 or 30 calendar days from the invoice date to remit payment. Net 30 is standard in corporate B2B contracts, but Net 15 is recommended for small businesses to accelerate receivables.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                  <Percent className="w-4 h-4 text-emerald-600" />
                  2/10 Net 30 (Cash Discount)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The client receives a 2% discount if the invoice is paid within 10 days; otherwise, the full amount is due in 30 days. Highly effective for speeding up large client payouts.
                </p>
              </div>
            </div>

            <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                4 Rules to Prevent Late Client Payments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Require Upfront Deposits:</strong> For projects exceeding $1,000, secure a 30% to 50% deposit before beginning work.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Milestone Billing:</strong> Tie intermediate invoice payments to tangible deliverables rather than calendar dates.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Include Clear Bank Details:</strong> Provide exact wire routing numbers, IBAN, SWIFT codes, or direct payment links in the Notes section.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Late Fee Policy:</strong> State a standard late fee (e.g., 1.5% per month on overdue balances) in your contract and invoice terms.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: INDUSTRY SPECIFIC TEMPLATES */}
        {activeCategory === 'industries' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  Industry-Specific Invoicing Practices & Pre-filled Templates
                </h3>
                <p className="text-xs text-slate-500">
                  Different industries require tailored itemization and contract terms. Click any template to load it into the editor:
                </p>
              </div>
              <a
                href="#guide/free-invoice-templates-by-industry"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Read Industry Templates Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Web Design & IT */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-1">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    Web Design & IT Services
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Specify sprint milestones, ticket IDs, hours logged, repository handoffs, and staging server deployments. State intellectual property transfer terms upon final payment completion.
                  </p>
                </div>
                {onLoadSample && (
                  <button
                    onClick={() => onLoadSample('web_design')}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-2 border-t border-slate-200 w-full"
                  >
                    <span>Load Web Design Sample</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Graphic Design */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-1">
                    <Palette className="w-4 h-4 text-pink-600" />
                    Graphic Design & Creative Agency
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Detail revision rounds included (e.g., &quot;Includes up to 2 revision cycles&quot;), media format deliverables (vector EPS, 4K MP4), and commercial usage/licensing terms.
                  </p>
                </div>
                {onLoadSample && (
                  <button
                    onClick={() => onLoadSample('photography')}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-800 pt-2 border-t border-slate-200 w-full"
                  >
                    <span>Load Creative Media Sample</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Consulting */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-indigo-600" />
                    Consulting & Strategy
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Break down consulting hourly rates, strategy workshops, report deliverables, and pre-approved travel/lodging expense reimbursements with attached receipts.
                  </p>
                </div>
                {onLoadSample && (
                  <button
                    onClick={() => onLoadSample('consulting')}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 pt-2 border-t border-slate-200 w-full"
                  >
                    <span>Load Consulting Sample</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Construction & Trades */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-amber-600" />
                    Contractors & Construction
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Itemize labor hours separately from physical raw materials and equipment rentals. Reference permit numbers and warranty terms on completed craftsmanship.
                  </p>
                </div>
                {onLoadSample && (
                  <button
                    onClick={() => onLoadSample('construction')}
                    className="self-start inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 hover:text-amber-800 pt-2 border-t border-slate-200 w-full"
                  >
                    <span>Load Construction Sample</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: CALCULATIONS & DISCOUNTS */}
        {activeCategory === 'tax' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                How Taxes, Discounts & Totals Are Calculated
              </h3>
              <p className="text-xs text-slate-500">
                Understanding the exact mathematical formulas behind your invoices prevents accounting discrepancies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Line Item Amount Calculation:</h4>
                <code className="block p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg">
                  Line Total = Quantity × Unit Rate
                </code>
                <p className="text-slate-600">
                  Each line item computes the gross product of hours/units and the agreed rate.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Subtotal & Discount Application:</h4>
                <code className="block p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg">
                  Taxable Amount = Subtotal - Discount
                </code>
                <p className="text-slate-600">
                  Discounts (percentage or flat rate) are deducted prior to tax computation in most jurisdictions.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Sales Tax / VAT Calculation:</h4>
                <code className="block p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg">
                  Tax = (Subtotal - Discount) × (Tax Rate % ÷ 100)
                </code>
                <p className="text-slate-600">
                  Calculates VAT, GST, or local sales tax according to the applicable municipal rate.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">Grand Total Due:</h4>
                <code className="block p-2.5 bg-slate-900 text-emerald-400 font-mono rounded-lg">
                  Total Due = Subtotal - Discount + Tax + Shipping
                </code>
                <p className="text-slate-600">
                  Final balance payable by the client including all line items, adjustments, and shipping fees.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: INVOICING FAQS */}
        {activeCategory === 'faq' && (
          <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Frequently Asked Invoicing & Billing Questions
              </h3>
              <p className="text-xs text-slate-500">
                Quick answers regarding invoicing legalities, payment collection, client privacy, and currency handling.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-100/70 transition-colors cursor-pointer"
                    >
                      <span itemProp="name">{faq.q}</span>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div
                        className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <div itemProp="text">{faq.a}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Editorial Content Google Ad Placement - strictly surrounded by educational content */}
      <div className="p-6 bg-slate-50/70 border-t border-slate-200/80">
        <GoogleAd 
          client="ca-pub-2875537731587160"
          slot="2802725446"
          label="Advertisement" 
        />
      </div>

    </section>
  );
};
