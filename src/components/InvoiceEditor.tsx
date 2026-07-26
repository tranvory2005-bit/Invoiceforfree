import React from 'react';
import { 
  Plus, 
  Trash2, 
  Building2, 
  UserCheck, 
  Calendar, 
  DollarSign, 
  Percent, 
  CreditCard, 
  Sparkles, 
  Palette, 
  Image as ImageIcon,
  FileText,
  HelpCircle,
  Truck,
  Hash,
  Type
} from 'lucide-react';
import { Invoice, InvoiceItem, InvoiceTemplateStyle, InvoiceStatus } from '../types';
import { CURRENCIES } from '../data/currencies';
import { calculateInvoiceSummary, PRESET_COLORS, formatCurrency } from '../utils/calculator';

interface InvoiceEditorProps {
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

export const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ invoice, setInvoice }) => {
  const summary = calculateInvoiceSummary(invoice);

  // Field updater helpers
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
      description: 'New Line Item / Service Description',
      quantity: 1,
      rate: 100,
      amount: 100,
    };
    setInvoice((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) {
      alert('Invoice must have at least one line item.');
      return;
    }
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateSender('logoUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Document Control & Branding Ribbon */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Palette className="w-4 h-4 text-blue-600" />
              Template Styling & Branding
            </h2>
            <p className="text-xs text-gray-500">
              Customize layout, primary accent color, typography & document currency
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Currency Selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <DollarSign className="w-3.5 h-3.5 text-gray-500" />
              <label className="text-xs font-semibold text-gray-600">Currency:</label>
              <select
                value={invoice.currency.code}
                onChange={(e) => {
                  const curr = CURRENCIES.find((c) => c.code === e.target.value);
                  if (curr) updateInvoice('currency', curr);
                }}
                className="text-xs font-semibold text-gray-900 bg-transparent outline-none cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol}) - {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Selector */}
            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
              <label className="text-xs font-semibold text-gray-600">Status:</label>
              <select
                value={invoice.status}
                onChange={(e) => updateInvoice('status', e.target.value as InvoiceStatus)}
                className="text-xs font-bold capitalize bg-transparent outline-none cursor-pointer text-gray-900"
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending Payment</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>

        {/* Template Style, Accent Color, Font Choice */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* Template Layout Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Template Layout Style
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['modern', 'classic', 'minimal', 'elegant', 'compact'] as InvoiceTemplateStyle[]).map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => updateInvoice('templateStyle', style)}
                  className={`py-1.5 px-2 text-xs font-medium capitalize rounded-lg border transition-all text-center ${
                    invoice.templateStyle === style
                      ? 'bg-blue-50 text-blue-700 border-blue-600 font-semibold shadow-2xs'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Color Accent Picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Brand Accent Color
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    title={c.name}
                    onClick={() => updateInvoice('primaryColor', c.hex)}
                    className={`w-6 h-6 rounded-full transition-transform ${c.bg} ${
                      invoice.primaryColor === c.hex ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : 'hover:scale-105 opacity-85'
                    }`}
                  />
                ))}
              </div>
              <input
                type="color"
                value={invoice.primaryColor}
                onChange={(e) => updateInvoice('primaryColor', e.target.value)}
                className="w-7 h-7 rounded-lg border border-gray-300 cursor-pointer p-0.5 bg-white"
                title="Custom Color"
              />
            </div>
          </div>

          {/* Font Family Selection */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-gray-500" />
              Typography Style
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { key: 'sans', label: 'Modern Sans' },
                { key: 'serif', label: 'Classic Serif' },
                { key: 'mono', label: 'Clean Mono' },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => updateInvoice('fontFamily', f.key as any)}
                  className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all ${
                    invoice.fontFamily === f.key
                      ? 'bg-blue-50 text-blue-700 border-blue-600 font-semibold'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sender (Your Business) & Client Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Your Business (Sender) */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Your Business Info (Sender)
            </h3>
          </div>

          {/* Logo Input */}
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            {invoice.sender.logoUrl ? (
              <div className="relative w-16 h-16 rounded-lg bg-white p-1 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                <img src={invoice.sender.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                <button
                  type="button"
                  onClick={() => updateSender('logoUrl', '')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-bl p-0.5 text-[10px]"
                  title="Remove Logo"
                >
                  ×
                </button>
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-gray-200/80 flex items-center justify-center text-gray-500 shrink-0">
                <ImageIcon className="w-6 h-6" />
              </div>
            )}
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-700 bg-white px-2.5 py-1 border border-blue-200 rounded-md shadow-2xs">
                  Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
                <span className="text-xs text-gray-400">or paste URL below</span>
              </div>
              <input
                type="text"
                placeholder="https://example.com/logo.png"
                value={invoice.sender.logoUrl || ''}
                onChange={(e) => updateSender('logoUrl', e.target.value)}
                className="w-full text-xs px-2.5 py-1 bg-white border border-gray-200 rounded-md outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Name</label>
              <input
                type="text"
                value={invoice.sender.name}
                onChange={(e) => updateSender('name', e.target.value)}
                placeholder="e.g. Apex Digital Design Studio"
                className="w-full text-xs font-semibold px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={invoice.sender.email}
                onChange={(e) => updateSender('email', e.target.value)}
                placeholder="billing@company.com"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={invoice.sender.phone}
                onChange={(e) => updateSender('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                value={invoice.sender.address}
                onChange={(e) => updateSender('address', e.target.value)}
                placeholder="742 Evergreen Terrace, Suite 400"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">City, State Zip</label>
              <input
                type="text"
                value={invoice.sender.cityStateZip}
                onChange={(e) => updateSender('cityStateZip', e.target.value)}
                placeholder="San Francisco, CA 94107"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={invoice.sender.country}
                onChange={(e) => updateSender('country', e.target.value)}
                placeholder="United States"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tax ID Label & No.</label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={invoice.sender.taxIdLabel}
                  onChange={(e) => updateSender('taxIdLabel', e.target.value)}
                  placeholder="VAT / EIN"
                  className="w-1/3 text-xs px-2 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={invoice.sender.taxId}
                  onChange={(e) => updateSender('taxId', e.target.value)}
                  placeholder="US-94-3829102"
                  className="w-2/3 text-xs px-2.5 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Website</label>
              <input
                type="text"
                value={invoice.sender.website || ''}
                onChange={(e) => updateSender('website', e.target.value)}
                placeholder="https://company.com"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Client Info (Bill To) & Invoice Dates */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Client Info (Bill To)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Client Contact Name</label>
              <input
                type="text"
                value={invoice.client.name}
                onChange={(e) => updateClient('name', e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full text-xs font-semibold px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Organization</label>
              <input
                type="text"
                value={invoice.client.companyName || ''}
                onChange={(e) => updateClient('companyName', e.target.value)}
                placeholder="Lumina Health Technologies"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Client Email</label>
              <input
                type="email"
                value={invoice.client.email}
                onChange={(e) => updateClient('email', e.target.value)}
                placeholder="s.jenkins@client.io"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Client Phone</label>
              <input
                type="text"
                value={invoice.client.phone}
                onChange={(e) => updateClient('phone', e.target.value)}
                placeholder="+1 (555) 876-5432"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-1">Client Street Address</label>
              <input
                type="text"
                value={invoice.client.address}
                onChange={(e) => updateClient('address', e.target.value)}
                placeholder="120 Market Street, 12th Floor"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">City, State Zip</label>
              <input
                type="text"
                value={invoice.client.cityStateZip}
                onChange={(e) => updateClient('cityStateZip', e.target.value)}
                placeholder="Seattle, WA 98101"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={invoice.client.country}
                onChange={(e) => updateClient('country', e.target.value)}
                placeholder="United States"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Hash className="w-3 h-3 text-gray-400" />
                Invoice Number
              </label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoice('invoiceNumber', e.target.value)}
                className="w-full text-xs font-bold text-blue-700 px-3 py-2 bg-blue-50/50 border border-blue-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">PO / Ref Number</label>
              <input
                type="text"
                value={invoice.referenceNumber || ''}
                onChange={(e) => updateInvoice('referenceNumber', e.target.value)}
                placeholder="PO-2026-88"
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                Issue Date
              </label>
              <input
                type="date"
                value={invoice.issueDate}
                onChange={(e) => updateInvoice('issueDate', e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                Due Date
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoice('dueDate', e.target.value)}
                className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 3. Items Table Section */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Invoice Line Items
            </h3>
            <p className="text-xs text-gray-500">
              Add services, products, hours, rates & custom descriptions
            </p>
          </div>
          <button
            type="button"
            onClick={addItem}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </button>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/60 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-2.5 px-3 w-[50%]">Item Description</th>
                <th className="py-2.5 px-2 w-[15%] text-right">Qty / Hours</th>
                <th className="py-2.5 px-2 w-[18%] text-right">Rate ({invoice.currency.symbol})</th>
                <th className="py-2.5 px-3 w-[17%] text-right">Amount</th>
                <th className="py-2.5 px-2 w-[50px] text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {invoice.items.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50/40 transition-colors group">
                  <td className="py-2.5 px-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                      placeholder="Service description or item title..."
                      className="w-full font-medium text-gray-900 px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                      className="w-full text-right font-semibold text-gray-900 px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-2 text-right">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.rate}
                      onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)}
                      className="w-full text-right font-semibold text-gray-900 px-2 py-1.5 border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                    />
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-gray-900">
                    {formatCurrency(item.amount, invoice.currency)}
                  </td>
                  <td className="py-2.5 px-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Tax, Discounts, Shipping & Financial Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Taxes, Discounts & Adjustments */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
            <Percent className="w-4 h-4 text-amber-600" />
            Taxes, Discounts & Adjustments
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Tax Settings */}
            <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-700">Tax Type & Rate</label>
              <select
                value={invoice.taxType}
                onChange={(e) => updateInvoice('taxType', e.target.value as any)}
                className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
              >
                <option value="none">No Tax Applied</option>
                <option value="on_total">Tax on Subtotal (%)</option>
              </select>

              {invoice.taxType === 'on_total' && (
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={invoice.taxName}
                    onChange={(e) => updateInvoice('taxName', e.target.value)}
                    placeholder="Tax Name (VAT / Sales Tax)"
                    className="w-2/3 text-xs px-2 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                  />
                  <div className="relative w-1/3">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={invoice.taxRate}
                      onChange={(e) => updateInvoice('taxRate', Number(e.target.value))}
                      className="w-full text-xs font-bold px-2 py-1.5 pr-5 bg-white border border-gray-300 rounded-lg outline-none"
                    />
                    <span className="absolute right-2 top-1.5 text-xs text-gray-400">%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Overall Discount */}
            <div className="space-y-2 bg-gray-50 p-3 rounded-xl border border-gray-200">
              <label className="block text-xs font-bold text-gray-700">Discount</label>
              <div className="flex gap-1.5">
                <select
                  value={invoice.discountType}
                  onChange={(e) => updateInvoice('discountType', e.target.value as any)}
                  className="w-1/2 text-xs font-semibold px-2 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                >
                  <option value="fixed">Fixed ({invoice.currency.symbol})</option>
                  <option value="percentage">Percent (%)</option>
                </select>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={invoice.discountValue}
                  onChange={(e) => updateInvoice('discountValue', Number(e.target.value))}
                  placeholder="0"
                  className="w-1/2 text-xs font-bold px-2 py-1.5 bg-white border border-gray-300 rounded-lg outline-none"
                />
              </div>
            </div>

            {/* Shipping & Handling */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-gray-500" />
                Shipping / Handling Fee ({invoice.currency.symbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={invoice.shippingFee}
                onChange={(e) => updateInvoice('shippingFee', Number(e.target.value))}
                className="w-full text-xs font-semibold px-3 py-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>

            {/* Amount Paid / Deposit */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-gray-700 flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                Amount Paid / Deposit ({invoice.currency.symbol})
              </label>
              <input
                type="number"
                min="0"
                step="any"
                value={invoice.amountPaid}
                onChange={(e) => updateInvoice('amountPaid', Number(e.target.value))}
                className="w-full text-xs font-semibold text-emerald-700 px-3 py-2 border border-gray-300 rounded-lg outline-none"
              />
            </div>

          </div>
        </div>

        {/* Live Calculation Summary Breakdown Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>Financial Summary</span>
              <span className="text-blue-400 font-mono text-[11px]">{invoice.currency.code}</span>
            </h3>

            <div className="py-3 space-y-2 text-xs font-medium border-b border-slate-800">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>{formatCurrency(summary.subtotal, invoice.currency)}</span>
              </div>

              {summary.overallDiscount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-{formatCurrency(summary.overallDiscount, invoice.currency)}</span>
                </div>
              )}

              {summary.taxAmount > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>{invoice.taxName || 'Tax'} ({invoice.taxRate}%)</span>
                  <span>+{formatCurrency(summary.taxAmount, invoice.currency)}</span>
                </div>
              )}

              {summary.shippingFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Shipping & Handling</span>
                  <span>+{formatCurrency(summary.shippingFee, invoice.currency)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Amount Due</span>
                <span className="text-blue-400">{formatCurrency(summary.grandTotal, invoice.currency)}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-400">Amount Paid / Deposit:</span>
              <span className="text-emerald-400 font-semibold">{formatCurrency(summary.amountPaid, invoice.currency)}</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Balance Due:</span>
            <span className="text-lg font-extrabold text-amber-400">
              {formatCurrency(summary.balanceDue, invoice.currency)}
            </span>
          </div>
        </div>

      </div>

      {/* 5. Payment Details, Bank Info & Terms */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 pb-3 border-b border-gray-100">
          <CreditCard className="w-4 h-4 text-teal-600" />
          Payment Instructions & Bank Wire Info
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Bank Name</label>
            <input
              type="text"
              value={invoice.paymentDetails.bankName || ''}
              onChange={(e) => updatePaymentDetails('bankName', e.target.value)}
              placeholder="e.g. Silicon Valley Commercial Bank"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Account Holder Name</label>
            <input
              type="text"
              value={invoice.paymentDetails.accountName || ''}
              onChange={(e) => updatePaymentDetails('accountName', e.target.value)}
              placeholder="e.g. Apex Digital Design LLC"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Account / IBAN Number</label>
            <input
              type="text"
              value={invoice.paymentDetails.accountNumber || ''}
              onChange={(e) => updatePaymentDetails('accountNumber', e.target.value)}
              placeholder="1234 5678 9012"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Routing / Sort Code</label>
            <input
              type="text"
              value={invoice.paymentDetails.routingNumber || ''}
              onChange={(e) => updatePaymentDetails('routingNumber', e.target.value)}
              placeholder="121000358"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">SWIFT / BIC Code</label>
            <input
              type="text"
              value={invoice.paymentDetails.ibanSwift || ''}
              onChange={(e) => updatePaymentDetails('ibanSwift', e.target.value)}
              placeholder="SVCBUS33XXX"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">PayPal / Venmo Handle</label>
            <input
              type="text"
              value={invoice.paymentDetails.paypalEmail || ''}
              onChange={(e) => updatePaymentDetails('paypalEmail', e.target.value)}
              placeholder="payments@mycompany.com"
              className="w-full text-xs px-3 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Notes to Recipient</label>
            <textarea
              rows={3}
              value={invoice.notes}
              onChange={(e) => updateInvoice('notes', e.target.value)}
              placeholder="Thank you for your business! Please reference Invoice # with payment."
              className="w-full text-xs p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Terms & Conditions</label>
            <textarea
              rows={3}
              value={invoice.terms}
              onChange={(e) => updateInvoice('terms', e.target.value)}
              placeholder="Payment is requested within 14 days of invoice date..."
              className="w-full text-xs p-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
