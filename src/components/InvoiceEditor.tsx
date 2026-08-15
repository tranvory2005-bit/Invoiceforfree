import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  DollarSign, 
  Palette, 
  Image as ImageIcon, 
  X, 
  History, 
  Save, 
  Sparkles, 
  FileText, 
  ChevronDown, 
  Upload, 
  Check, 
  Building2, 
  Percent,
  Truck,
  CreditCard,
  QrCode,
  FileDown
} from 'lucide-react';
import { Invoice, InvoiceItem, InvoiceTemplateStyle } from '../types';
import { CURRENCIES } from '../data/currencies';
import { calculateInvoiceSummary, PRESET_COLORS, formatCurrency } from '../utils/calculator';
import { SAMPLE_INVOICES } from '../data/sampleInvoices';

interface InvoiceEditorProps {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  onSaveInvoice?: () => void;
  onPrintInvoice?: () => void;
  onNewInvoice?: () => void;
  savedCount?: number;
  showSaveSuccess?: boolean;
  onOpenHistory?: () => void;
  onLoadSample?: (key: string) => void;
}

export const InvoiceEditor: React.FC<InvoiceEditorProps> = ({
  invoice,
  setInvoice,
  onSaveInvoice,
  onPrintInvoice,
  onNewInvoice,
  savedCount = 0,
  showSaveSuccess = false,
  onOpenHistory,
  onLoadSample,
}) => {
  const summary = calculateInvoiceSummary(invoice);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Optional section toggles like invoice-generator.com
  const [showShipTo, setShowShipTo] = useState(Boolean(invoice.client?.country && invoice.shippingFee > 0));
  const [showDiscount, setShowDiscount] = useState(Boolean(invoice.discountValue > 0));
  const [showTax, setShowTax] = useState(Boolean(invoice.taxRate > 0));
  const [showShipping, setShowShipping] = useState(Boolean(invoice.shippingFee > 0));
  const [showPaymentDetails, setShowPaymentDetails] = useState(
    Boolean(
      invoice.paymentDetails?.bankName ||
      invoice.paymentDetails?.accountNumber ||
      invoice.paymentDetails?.paypalEmail ||
      invoice.paymentDetails?.venmoHandle
    )
  );

  // State update helpers
  const updateInvoice = <K extends keyof Invoice>(field: K, value: Invoice[K]) => {
    setInvoice((prev) => ({ ...prev, [field]: value, updatedAt: new Date().toISOString() }));
  };

  const updateSender = (field: string, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      sender: { ...prev.sender, [field]: value },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updateClient = (field: string, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      client: { ...prev.client, [field]: value },
      updatedAt: new Date().toISOString(),
    }));
  };

  const updatePaymentDetails = (field: string, value: string) => {
    setInvoice((prev) => ({
      ...prev,
      paymentDetails: { ...prev.paymentDetails, [field]: value },
      updatedAt: new Date().toISOString(),
    }));
  };

  // Item Management
  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setInvoice((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === id) {
          const newItem = { ...item, [field]: value };
          if (field === 'quantity' || field === 'rate') {
            const qty = field === 'quantity' ? Number(value) || 0 : item.quantity;
            const rate = field === 'rate' ? Number(value) || 0 : item.rate;
            newItem.amount = qty * rate;
          }
          return newItem;
        }
        return item;
      });
      return { ...prev, items: updatedItems, updatedAt: new Date().toISOString() };
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    setInvoice((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) {
      // Just clear the line instead of deleting if only 1 exists
      setInvoice((prev) => ({
        ...prev,
        items: [{ id: `item-${Date.now()}`, description: '', quantity: 1, rate: 0, amount: 0 }],
      }));
      return;
    }
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('Please choose an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateSender('logoUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    updateSender('logoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTriggerDownload = () => {
    if (onPrintInvoice) {
      onPrintInvoice();
    } else {
      window.print();
    }
  };

  const fontClass = 
    invoice.fontFamily === 'serif' 
      ? 'font-serif' 
      : invoice.fontFamily === 'mono' 
        ? 'font-mono' 
        : 'font-sans';

  return (
    <div className={`w-full max-w-7xl mx-auto pb-16 ${fontClass}`}>
      
      {/* 2-Column Responsive Layout: Paper Sheet on Left, Action Sidebar on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================================================================== */}
        {/* LEFT COLUMN: THE CLEAN PAPER INVOICE SHEET (WYSIWYG)                  */}
        {/* ==================================================================== */}
        <div className="lg:col-span-8 xl:col-span-9">
          
          <div 
            id="invoice-paper" 
            className="bg-white rounded-xl shadow-xs border border-slate-200/90 p-6 sm:p-10 md:p-12 relative transition-all"
          >
            
            {/* Top Decorative Accent Bar */}
            {invoice.templateStyle === 'modern' && (
              <div 
                className="h-2 w-full rounded-t-lg absolute top-0 left-0" 
                style={{ backgroundColor: invoice.primaryColor || '#2563eb' }}
              />
            )}

            {/* 1. TOP HEADER: LOGO ON LEFT, TITLE & INVOICE # ON RIGHT */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-100">
              
              {/* Logo Area */}
              <div className="sm:max-w-xs">
                {invoice.sender.logoUrl ? (
                  <div className="relative group inline-block">
                    <div className="w-36 h-20 sm:w-44 sm:h-24 rounded-lg bg-slate-50 border border-slate-200/80 p-2 flex items-center justify-center overflow-hidden">
                      <img 
                        src={invoice.sender.logoUrl} 
                        alt="Company Logo" 
                        className="max-w-full max-h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {/* Hover actions to change/remove logo */}
                    <div className="absolute inset-0 bg-slate-900/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 print:hidden">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-2 py-1 bg-white text-slate-900 rounded text-[11px] font-semibold hover:bg-slate-100"
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-semibold hover:bg-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-36 h-20 sm:w-44 sm:h-24 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/70 hover:bg-blue-50/30 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-slate-500 hover:text-blue-600 print:hidden"
                  >
                    <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-xs font-semibold">+ Add Your Logo</span>
                  </div>
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleLogoUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {/* Title & Invoice Number Box */}
              <div className="text-left sm:text-right space-y-2">
                <input
                  type="text"
                  value="INVOICE"
                  readOnly
                  aria-label="Invoice Document Title"
                  className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-slate-900 text-left sm:text-right bg-transparent border-none outline-none w-full max-w-[280px]"
                />

                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200/90 rounded-lg px-3 py-1.5 text-xs text-slate-700">
                  <span className="font-bold text-slate-400">#</span>
                  <input
                    type="text"
                    value={invoice.invoiceNumber}
                    onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                    placeholder="INV-001"
                    aria-label="Invoice Number"
                    className="font-bold text-slate-800 bg-transparent outline-none w-28 text-right placeholder:text-slate-300"
                  />
                </div>
              </div>

            </div>

            {/* 2. SENDER & RECIPIENT ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-slate-100">
              
              {/* FROM (Sender) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  From
                </label>
                
                <input
                  type="text"
                  value={invoice.sender.name}
                  onChange={(e) => updateSender('name', e.target.value)}
                  placeholder="Who is this invoice from? (Your Business Name)"
                  className="w-full text-sm font-bold text-slate-900 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-1 outline-none transition-colors"
                />

                <input
                  type="text"
                  value={invoice.sender.address}
                  onChange={(e) => updateSender('address', e.target.value)}
                  placeholder="Street Address"
                  className="w-full text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={invoice.sender.cityStateZip}
                    onChange={(e) => updateSender('cityStateZip', e.target.value)}
                    placeholder="City, State, Zip"
                    className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                  />
                  <input
                    type="text"
                    value={invoice.sender.country}
                    onChange={(e) => updateSender('country', e.target.value)}
                    placeholder="Country"
                    className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="email"
                    value={invoice.sender.email}
                    onChange={(e) => updateSender('email', e.target.value)}
                    placeholder="Email Address"
                    className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                  />
                  <input
                    type="text"
                    value={invoice.sender.phone}
                    onChange={(e) => updateSender('phone', e.target.value)}
                    placeholder="Phone Number"
                    className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                  />
                </div>

                <div className="pt-1 flex items-center gap-1 text-xs">
                  <input
                    type="text"
                    value={invoice.sender.taxIdLabel || 'Tax ID / VAT'}
                    onChange={(e) => updateSender('taxIdLabel', e.target.value)}
                    placeholder="Tax Label"
                    className="w-24 text-[11px] text-slate-400 bg-transparent border-none outline-none font-semibold"
                  />
                  <input
                    type="text"
                    value={invoice.sender.taxId}
                    onChange={(e) => updateSender('taxId', e.target.value)}
                    placeholder="EIN / VAT Number"
                    className="flex-1 text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none"
                  />
                </div>
              </div>

              {/* BILL TO & OPTIONAL SHIP TO */}
              <div className="space-y-4">
                
                {/* Bill To */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Bill To
                    </label>
                    
                    {!showShipTo && (
                      <button
                        type="button"
                        onClick={() => setShowShipTo(true)}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline print:hidden"
                      >
                        + Add Ship To
                      </button>
                    )}
                  </div>

                  <input
                    type="text"
                    value={invoice.client.name}
                    onChange={(e) => updateClient('name', e.target.value)}
                    placeholder="Who is this invoice to? (Client Name)"
                    className="w-full text-sm font-bold text-slate-900 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-1 outline-none transition-colors"
                  />

                  <input
                    type="text"
                    value={invoice.client.companyName || ''}
                    onChange={(e) => updateClient('companyName', e.target.value)}
                    placeholder="Company Name (Optional)"
                    className="w-full text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                  />

                  <input
                    type="text"
                    value={invoice.client.address}
                    onChange={(e) => updateClient('address', e.target.value)}
                    placeholder="Client Street Address"
                    className="w-full text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={invoice.client.cityStateZip}
                      onChange={(e) => updateClient('cityStateZip', e.target.value)}
                      placeholder="City, State, Zip"
                      className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                    />
                    <input
                      type="text"
                      value={invoice.client.country}
                      onChange={(e) => updateClient('country', e.target.value)}
                      placeholder="Country"
                      className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      value={invoice.client.email}
                      onChange={(e) => updateClient('email', e.target.value)}
                      placeholder="Client Email"
                      className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                    />
                    <input
                      type="text"
                      value={invoice.client.phone}
                      onChange={(e) => updateClient('phone', e.target.value)}
                      placeholder="Client Phone"
                      className="text-xs text-slate-600 placeholder:text-slate-400 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Optional Ship To */}
                {showShipTo && (
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-1.5 relative">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Ship To
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowShipTo(false)}
                        className="text-slate-400 hover:text-rose-600 text-xs print:hidden"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      placeholder="Shipping Address / Attention"
                      className="w-full text-xs text-slate-700 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-2 py-0.5 outline-none"
                    />
                  </div>
                )}

              </div>

            </div>

            {/* 3. METADATA ROW: DATES, PAYMENT TERMS, PO NUMBER */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 border-b border-slate-100 text-xs">
              
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={invoice.issueDate}
                  onChange={(e) => updateInvoice('issueDate', e.target.value)}
                  className="w-full font-semibold text-slate-800 bg-slate-50/70 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Payment Terms
                </label>
                <input
                  type="text"
                  value={invoice.paymentTerms || 'Due Upon Receipt'}
                  onChange={(e) => updateInvoice('paymentTerms', e.target.value)}
                  placeholder="e.g. Net 30, Due on receipt"
                  className="w-full font-semibold text-slate-800 bg-slate-50/70 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => updateInvoice('dueDate', e.target.value)}
                  className="w-full font-semibold text-slate-800 bg-slate-50/70 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  PO Number
                </label>
                <input
                  type="text"
                  value={invoice.referenceNumber || invoice.client.poNumber || ''}
                  onChange={(e) => {
                    updateInvoice('referenceNumber', e.target.value);
                    updateClient('poNumber', e.target.value);
                  }}
                  placeholder="PO-0000"
                  className="w-full font-semibold text-slate-800 bg-slate-50/70 border border-slate-200 rounded px-2.5 py-1.5 outline-none focus:border-blue-500"
                />
              </div>

            </div>

            {/* 4. LINE ITEMS TABLE (invoice-generator.com style) */}
            <div className="py-6 space-y-4">
              
              {/* Table Header Bar */}
              <div 
                className="grid grid-cols-12 gap-2 px-3 py-2 rounded-lg text-xs font-bold text-white tracking-wide uppercase"
                style={{ backgroundColor: invoice.primaryColor || '#1e293b' }}
              >
                <div className="col-span-6 sm:col-span-7">Item Description</div>
                <div className="col-span-2 sm:col-span-2 text-right">Quantity</div>
                <div className="col-span-2 sm:col-span-2 text-right">Rate</div>
                <div className="col-span-2 sm:col-span-1 text-right">Amount</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {invoice.items.map((item, index) => (
                  <div 
                    key={item.id || index}
                    className="grid grid-cols-12 gap-2 items-start p-2 rounded-lg hover:bg-slate-50/80 transition-colors group relative border border-transparent hover:border-slate-100 text-xs"
                  >
                    
                    {/* Item Description */}
                    <div className="col-span-6 sm:col-span-7">
                      <textarea
                        rows={1}
                        value={item.description}
                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                        placeholder="Description of service or product..."
                        className="w-full text-slate-800 font-medium bg-transparent border-none outline-none resize-none placeholder:text-slate-300 py-1"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 sm:col-span-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                        aria-label={`Item ${index + 1} Quantity`}
                        className="w-full text-right font-semibold text-slate-800 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-1.5 py-1 outline-none"
                      />
                    </div>

                    {/* Rate */}
                    <div className="col-span-2 sm:col-span-2 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={item.rate}
                        onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                        aria-label={`Item ${index + 1} Rate`}
                        className="w-full text-right font-semibold text-slate-800 bg-transparent border border-transparent hover:border-slate-200 focus:border-blue-400 rounded px-1.5 py-1 outline-none"
                      />
                    </div>

                    {/* Amount */}
                    <div className="col-span-2 sm:col-span-1 text-right py-1 font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrency(item.quantity * item.rate, invoice.currency)}
                    </div>

                    {/* Hover Delete Action Button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="absolute -right-2 top-2 p-1 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded transition-all opacity-0 group-hover:opacity-100 print:hidden"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>
                ))}
              </div>

              {/* + Line Item Button */}
              <div className="pt-2 print:hidden">
                <button
                  type="button"
                  onClick={addItem}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Line Item</span>
                </button>
              </div>

            </div>

            {/* 5. BOTTOM ROW: NOTES & TERMS ON LEFT, TOTALS SUMMARY ON RIGHT */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 border-t border-slate-100 text-xs">
              
              {/* Left Column: Notes, Terms, Bank Details */}
              <div className="md:col-span-7 space-y-4">
                
                {/* Notes */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={invoice.notes}
                    onChange={(e) => updateInvoice('notes', e.target.value)}
                    placeholder="Notes - any relevant information not already covered, payment instructions, thank you notes..."
                    className="w-full text-xs text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-lg p-2.5 outline-none focus:border-blue-400 transition-colors resize-none placeholder:text-slate-400"
                  />
                </div>

                {/* Terms */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Terms
                  </label>
                  <textarea
                    rows={2}
                    value={invoice.terms}
                    onChange={(e) => updateInvoice('terms', e.target.value)}
                    placeholder="Terms and conditions - late fees, payment methods, delivery terms, warranty..."
                    className="w-full text-xs text-slate-700 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-lg p-2.5 outline-none focus:border-blue-400 transition-colors resize-none placeholder:text-slate-400"
                  />
                </div>

                {/* Optional Bank & Payment Details Drawer */}
                <div>
                  {!showPaymentDetails ? (
                    <button
                      type="button"
                      onClick={() => setShowPaymentDetails(true)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 print:hidden"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>+ Add Bank / Payment Details (IBAN, PayPal, Venmo, QR)</span>
                    </button>
                  ) : (
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                          Payment & Remittance Information
                        </span>
                        <button
                          type="button"
                          onClick={() => setShowPaymentDetails(false)}
                          className="text-slate-400 hover:text-slate-600 text-xs print:hidden"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={invoice.paymentDetails.bankName || ''}
                          onChange={(e) => updatePaymentDetails('bankName', e.target.value)}
                          placeholder="Bank Name"
                          className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={invoice.paymentDetails.accountName || ''}
                          onChange={(e) => updatePaymentDetails('accountName', e.target.value)}
                          placeholder="Account Name / Beneficiary"
                          className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={invoice.paymentDetails.accountNumber || ''}
                          onChange={(e) => updatePaymentDetails('accountNumber', e.target.value)}
                          placeholder="Account / IBAN Number"
                          className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={invoice.paymentDetails.routingNumber || ''}
                          onChange={(e) => updatePaymentDetails('routingNumber', e.target.value)}
                          placeholder="Routing / SWIFT Code"
                          className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={invoice.paymentDetails.paypalEmail || ''}
                          onChange={(e) => updatePaymentDetails('paypalEmail', e.target.value)}
                          placeholder="PayPal Email (Optional)"
                          className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={invoice.paymentDetails.venmoHandle || ''}
                          onChange={(e) => updatePaymentDetails('venmoHandle', e.target.value)}
                          placeholder="Venmo Handle (Optional)"
                          className="px-2 py-1 rounded border border-slate-200 text-xs bg-white"
                        />
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Financial Summary Block */}
              <div className="md:col-span-5 space-y-3">
                
                {/* Subtotal */}
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    {formatCurrency(summary.subtotal, invoice.currency)}
                  </span>
                </div>

                {/* Discount Row or Add Button */}
                {showDiscount ? (
                  <div className="flex items-center justify-between text-slate-600 gap-2 py-1">
                    <div className="flex items-center gap-1">
                      <span>Discount</span>
                      <button
                        type="button"
                        onClick={() => updateInvoice('discountType', invoice.discountType === 'percentage' ? 'fixed' : 'percentage')}
                        className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] font-bold text-slate-600 print:hidden"
                      >
                        {invoice.discountType === 'percentage' ? '%' : invoice.currency.symbol}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={invoice.discountValue || 0}
                        onChange={(e) => updateInvoice('discountValue', Number(e.target.value) || 0)}
                        aria-label="Discount Value"
                        className="w-16 text-right font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                      <span className="font-semibold text-rose-600 min-w-[70px] text-right">
                        -{formatCurrency(summary.overallDiscount, invoice.currency)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          updateInvoice('discountValue', 0);
                          setShowDiscount(false);
                        }}
                        className="text-slate-300 hover:text-rose-600 text-xs print:hidden"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-right print:hidden">
                    <button
                      type="button"
                      onClick={() => setShowDiscount(true)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      + Discount
                    </button>
                  </div>
                )}

                {/* Tax Row or Add Button */}
                {showTax ? (
                  <div className="flex items-center justify-between text-slate-600 gap-2 py-1">
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={invoice.taxName || 'Tax'}
                        onChange={(e) => updateInvoice('taxName', e.target.value)}
                        placeholder="Tax / VAT"
                        className="w-16 text-xs text-slate-600 bg-transparent border-none outline-none font-medium"
                      />
                      <span className="text-[10px] font-bold text-slate-400">(%)</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={invoice.taxRate || 0}
                        onChange={(e) => {
                          updateInvoice('taxRate', Number(e.target.value) || 0);
                          updateInvoice('taxType', 'on_total');
                        }}
                        aria-label="Tax Rate Percentage"
                        className="w-16 text-right font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                      <span className="font-semibold text-slate-900 min-w-[70px] text-right">
                        +{formatCurrency(summary.taxAmount, invoice.currency)}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          updateInvoice('taxRate', 0);
                          updateInvoice('taxType', 'none');
                          setShowTax(false);
                        }}
                        className="text-slate-300 hover:text-rose-600 text-xs print:hidden"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-right print:hidden">
                    <button
                      type="button"
                      onClick={() => setShowTax(true)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      + Tax (VAT/GST)
                    </button>
                  </div>
                )}

                {/* Shipping Row or Add Button */}
                {showShipping ? (
                  <div className="flex items-center justify-between text-slate-600 gap-2 py-1">
                    <span>Shipping</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={invoice.shippingFee || 0}
                        onChange={(e) => updateInvoice('shippingFee', Number(e.target.value) || 0)}
                        aria-label="Shipping Fee"
                        className="w-20 text-right font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-xs outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          updateInvoice('shippingFee', 0);
                          setShowShipping(false);
                        }}
                        className="text-slate-300 hover:text-rose-600 text-xs print:hidden"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-right print:hidden">
                    <button
                      type="button"
                      onClick={() => setShowShipping(true)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      + Shipping
                    </button>
                  </div>
                )}

                {/* Grand Total */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-base font-extrabold text-slate-900">
                  <span>Total</span>
                  <span className="text-lg" style={{ color: invoice.primaryColor || '#1e293b' }}>
                    {formatCurrency(summary.grandTotal, invoice.currency)}
                  </span>
                </div>

                {/* Amount Paid */}
                <div className="flex items-center justify-between text-slate-600 py-1">
                  <span>Amount Paid</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-400 font-bold">{invoice.currency.symbol}</span>
                    <input
                      type="number"
                      min="0"
                      value={invoice.amountPaid || 0}
                      onChange={(e) => updateInvoice('amountPaid', Number(e.target.value) || 0)}
                      aria-label="Amount Paid"
                      className="w-24 text-right font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs outline-none focus:border-blue-400"
                    />
                  </div>
                </div>

                {/* Balance Due Highlight */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 text-white font-bold text-sm shadow-xs">
                  <span>Balance Due</span>
                  <span className="text-base font-extrabold text-emerald-400">
                    {formatCurrency(summary.balanceDue, invoice.currency)}
                  </span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ==================================================================== */}
        {/* RIGHT COLUMN: ACTION SIDEBAR (Clean, Simple, Instant Actions)       */}
        {/* ==================================================================== */}
        <aside className="lg:col-span-4 xl:col-span-3 space-y-5 print:hidden sticky top-20">
          
          {/* Main Primary Action: Download PDF */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-3">
            
            <button
              type="button"
              onClick={handleTriggerDownload}
              className="w-full py-3.5 px-5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-sm cursor-pointer hover:shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice (PDF)</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerDownload}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>Print Invoice</span>
            </button>

            {onSaveInvoice && (
              <button
                type="button"
                onClick={onSaveInvoice}
                className="w-full py-2 px-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                {showSaveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5 text-slate-500" />
                    <span>Save Draft</span>
                  </>
                )}
              </button>
            )}

          </div>

          {/* Quick Settings: Currency & Accent Color */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-4 text-xs">
            
            {/* Currency Selector */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">
                Currency
              </label>
              <select
                value={invoice.currency.code}
                onChange={(e) => {
                  const curr = CURRENCIES.find((c) => c.code === e.target.value);
                  if (curr) updateInvoice('currency', curr);
                }}
                className="w-full font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none cursor-pointer focus:border-blue-500"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol}) — {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Accent Color Palette */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="font-bold text-slate-700 flex items-center justify-between">
                <span>Color Theme</span>
                <span className="text-[10px] font-normal text-slate-400">Header & accents</span>
              </label>
              
              <div className="flex flex-wrap gap-2 pt-1">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => updateInvoice('primaryColor', c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                      invoice.primaryColor === c.hex 
                        ? 'ring-2 ring-offset-2 ring-slate-800 scale-110' 
                        : 'hover:scale-105 opacity-90 hover:opacity-100'
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Font Style */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <label className="font-bold text-slate-700 block">
                Typography
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => updateInvoice('fontFamily', 'sans')}
                  className={`py-1.5 rounded-lg font-sans text-xs font-semibold border transition-all ${
                    invoice.fontFamily === 'sans'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Sans
                </button>

                <button
                  type="button"
                  onClick={() => updateInvoice('fontFamily', 'serif')}
                  className={`py-1.5 rounded-lg font-serif text-xs font-semibold border transition-all ${
                    invoice.fontFamily === 'serif'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Serif
                </button>

                <button
                  type="button"
                  onClick={() => updateInvoice('fontFamily', 'mono')}
                  className={`py-1.5 rounded-lg font-mono text-xs font-semibold border transition-all ${
                    invoice.fontFamily === 'mono'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Mono
                </button>
              </div>
            </div>

          </div>

          {/* Quick Templates & History Actions */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs space-y-3 text-xs">
            
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">Quick Samples</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onLoadSample && onLoadSample('web_design')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/70 font-medium text-slate-700 transition-colors"
              >
                Web Dev
              </button>
              <button
                type="button"
                onClick={() => onLoadSample && onLoadSample('consulting')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/70 font-medium text-slate-700 transition-colors"
              >
                Consulting
              </button>
              <button
                type="button"
                onClick={() => onLoadSample && onLoadSample('creative_photo')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/70 font-medium text-slate-700 transition-colors"
              >
                Design / Photo
              </button>
              <button
                type="button"
                onClick={() => onLoadSample && onLoadSample('contractor_trade')}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-left border border-slate-200/70 font-medium text-slate-700 transition-colors"
              >
                Contractor
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              {onNewInvoice && (
                <button
                  type="button"
                  onClick={onNewInvoice}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 py-1"
                >
                  + Blank Invoice
                </button>
              )}

              {onOpenHistory && (
                <button
                  type="button"
                  onClick={onOpenHistory}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>History ({savedCount})</span>
                </button>
              )}
            </div>

          </div>

        </aside>

      </div>

    </div>
  );
};
