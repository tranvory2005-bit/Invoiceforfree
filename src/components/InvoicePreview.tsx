import React from 'react';
import { Invoice } from '../types';
import { calculateInvoiceSummary, formatCurrency } from '../utils/calculator';
import { Building2, Mail, Phone, Globe, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
  const summary = calculateInvoiceSummary(invoice);

  const fontClass = 
    invoice.fontFamily === 'serif' 
      ? 'font-serif' 
      : invoice.fontFamily === 'mono' 
        ? 'font-mono' 
        : 'font-sans';

  // Watermark or Status Badge
  const renderStatusBadge = () => {
    switch (invoice.status) {
      case 'paid':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5" /> PAID IN FULL
          </div>
        );
      case 'overdue':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
            <AlertTriangle className="w-3.5 h-3.5" /> OVERDUE
          </div>
        );
      case 'pending':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5" /> PAYMENT PENDING
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-300">
            DRAFT
          </div>
        );
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${fontClass}`}>
      
      {/* Outer Paper Container */}
      <div 
        id="invoice-print-area" 
        className="bg-white text-gray-800 rounded-2xl shadow-lg border border-gray-200/80 p-8 sm:p-12 print:shadow-none print:border-none print:p-0 print:m-0 print:w-full min-h-[900px] flex flex-col justify-between"
      >
        <div className="space-y-8">
          
          {/* STYLE 1: ELEGANT / BANNER HEADER */}
          {invoice.templateStyle === 'elegant' && (
            <div>
              <div 
                className="p-6 rounded-xl text-white mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{ backgroundColor: invoice.primaryColor }}
              >
                <div className="flex items-center gap-4">
                  {invoice.sender.logoUrl && (
                    <div className="w-16 h-16 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0">
                      <img src={invoice.sender.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">{invoice.sender.name}</h1>
                    <p className="text-xs opacity-90">{invoice.sender.cityStateZip}, {invoice.sender.country}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs uppercase tracking-widest font-semibold opacity-80 block">INVOICE</span>
                  <span className="text-xl font-extrabold">{invoice.invoiceNumber}</span>
                  <div className="mt-1">{renderStatusBadge()}</div>
                </div>
              </div>
            </div>
          )}

          {/* STYLE 2: MODERN / TOP BAR HEADER */}
          {invoice.templateStyle === 'modern' && (
            <div>
              <div className="h-2 rounded-t-xl mb-6" style={{ backgroundColor: invoice.primaryColor }} />
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  {invoice.sender.logoUrl && (
                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 p-2 flex items-center justify-center shrink-0">
                      <img src={invoice.sender.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">{invoice.sender.name}</h1>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs">{invoice.sender.address}, {invoice.sender.cityStateZip}</p>
                  </div>
                </div>

                <div className="text-left sm:text-right space-y-1">
                  <div className="text-2xl font-black text-gray-900 uppercase tracking-tight">INVOICE</div>
                  <div className="text-sm font-bold" style={{ color: invoice.primaryColor }}>#{invoice.invoiceNumber}</div>
                  <div className="pt-1">{renderStatusBadge()}</div>
                </div>
              </div>
            </div>
          )}

          {/* STYLE 3: CLASSIC / FORMAL HEADER */}
          {invoice.templateStyle === 'classic' && (
            <div>
              <div className="text-center pb-4 border-b-2 border-double border-gray-300 space-y-1">
                {invoice.sender.logoUrl && (
                  <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                    <img src={invoice.sender.logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                )}
                <h1 className="text-2xl font-serif font-bold text-gray-900 uppercase tracking-wide">{invoice.sender.name}</h1>
                <p className="text-xs text-gray-600">{invoice.sender.address} • {invoice.sender.cityStateZip} • {invoice.sender.email}</p>
              </div>
              
              <div className="flex items-center justify-between py-4 border-b border-gray-200">
                <div className="text-xl font-bold uppercase tracking-widest text-gray-800">INVOICE STATEMENT</div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-900"># {invoice.invoiceNumber}</span>
                  {renderStatusBadge()}
                </div>
              </div>
            </div>
          )}

          {/* STYLE 4: MINIMAL & STYLE 5: COMPACT */}
          {(invoice.templateStyle === 'minimal' || invoice.templateStyle === 'compact') && (
            <div className="flex items-start justify-between pb-6 border-b border-gray-100">
              <div className="space-y-1">
                {invoice.sender.logoUrl && (
                  <img src={invoice.sender.logoUrl} alt="Logo" className="h-10 object-contain mb-2" />
                )}
                <h1 className="text-lg font-bold text-gray-900">{invoice.sender.name}</h1>
                <p className="text-xs text-gray-500">{invoice.sender.email}</p>
              </div>

              <div className="text-right space-y-1">
                <span className="text-xs uppercase font-semibold text-gray-400 tracking-wider">INVOICE</span>
                <div className="text-lg font-bold text-gray-900">{invoice.invoiceNumber}</div>
                <div>{renderStatusBadge()}</div>
              </div>
            </div>
          )}

          {/* Sender & Client Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs py-2">
            
            {/* Bill From (Sender Details) */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Billed From
              </span>
              <div className="font-bold text-gray-900 text-sm">{invoice.sender.name}</div>
              {invoice.sender.address && <p className="text-gray-600">{invoice.sender.address}</p>}
              {invoice.sender.cityStateZip && <p className="text-gray-600">{invoice.sender.cityStateZip}, {invoice.sender.country}</p>}
              {invoice.sender.email && <p className="text-gray-600 flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> {invoice.sender.email}</p>}
              {invoice.sender.phone && <p className="text-gray-600 flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> {invoice.sender.phone}</p>}
              {invoice.sender.taxId && (
                <p className="text-gray-500 font-medium pt-1">{invoice.sender.taxIdLabel || 'Tax ID'}: {invoice.sender.taxId}</p>
              )}
            </div>

            {/* Bill To (Client Details) */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                Billed To
              </span>
              <div className="font-bold text-gray-900 text-sm">{invoice.client.name}</div>
              {invoice.client.companyName && <div className="font-semibold text-gray-800">{invoice.client.companyName}</div>}
              {invoice.client.address && <p className="text-gray-600">{invoice.client.address}</p>}
              {invoice.client.cityStateZip && <p className="text-gray-600">{invoice.client.cityStateZip}, {invoice.client.country}</p>}
              {invoice.client.email && <p className="text-gray-600 flex items-center gap-1.5"><Mail className="w-3 h-3 text-gray-400" /> {invoice.client.email}</p>}
              {invoice.client.phone && <p className="text-gray-600 flex items-center gap-1.5"><Phone className="w-3 h-3 text-gray-400" /> {invoice.client.phone}</p>}
            </div>

          </div>

          {/* Dates & Reference Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-gray-50/80 rounded-xl border border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Invoice Date</span>
              <span className="font-semibold text-gray-900">{invoice.issueDate}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Payment Due</span>
              <span className="font-bold text-gray-900">{invoice.dueDate}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Terms</span>
              <span className="font-semibold text-gray-900">{invoice.paymentTerms || 'Due on Receipt'}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">PO / Ref Number</span>
              <span className="font-semibold text-gray-900">{invoice.referenceNumber || 'N/A'}</span>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr 
                  className="text-[11px] font-bold uppercase tracking-wider border-b border-gray-200"
                  style={{ color: invoice.primaryColor }}
                >
                  <th className="py-3 px-2 w-[55%]">Description</th>
                  <th className="py-3 px-2 text-right w-[15%]">Qty</th>
                  <th className="py-3 px-2 text-right w-[15%]">Rate</th>
                  <th className="py-3 px-2 text-right w-[15%]">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs text-gray-800">
                {invoice.items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-2 font-medium text-gray-900 whitespace-pre-line">{item.description}</td>
                    <td className="py-3 px-2 text-right text-gray-600 font-medium">{item.quantity}</td>
                    <td className="py-3 px-2 text-right text-gray-600">{formatCurrency(item.rate, invoice.currency)}</td>
                    <td className="py-3 px-2 text-right font-bold text-gray-900">{formatCurrency(item.amount, invoice.currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Summary Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-gray-200">
            
            {/* Payment Info / Notes */}
            <div className="w-full sm:w-1/2 space-y-4 text-xs">
              {(invoice.paymentDetails.bankName || invoice.paymentDetails.paypalEmail || invoice.paymentDetails.accountNumber) && (
                <div className="bg-gray-50/80 p-3.5 rounded-xl border border-gray-200/80 space-y-1">
                  <span className="font-bold text-gray-900 block mb-1">How To Pay:</span>
                  {invoice.paymentDetails.bankName && <p className="text-gray-600"><strong className="text-gray-800">Bank:</strong> {invoice.paymentDetails.bankName}</p>}
                  {invoice.paymentDetails.accountName && <p className="text-gray-600"><strong className="text-gray-800">Account Name:</strong> {invoice.paymentDetails.accountName}</p>}
                  {invoice.paymentDetails.accountNumber && <p className="text-gray-600"><strong className="text-gray-800">Account/IBAN:</strong> {invoice.paymentDetails.accountNumber}</p>}
                  {invoice.paymentDetails.routingNumber && <p className="text-gray-600"><strong className="text-gray-800">Routing/Sort:</strong> {invoice.paymentDetails.routingNumber}</p>}
                  {invoice.paymentDetails.ibanSwift && <p className="text-gray-600"><strong className="text-gray-800">SWIFT/BIC:</strong> {invoice.paymentDetails.ibanSwift}</p>}
                  {invoice.paymentDetails.paypalEmail && <p className="text-gray-600"><strong className="text-gray-800">PayPal/Venmo:</strong> {invoice.paymentDetails.paypalEmail}</p>}
                </div>
              )}

              {invoice.notes && (
                <div>
                  <span className="font-bold text-gray-900 block mb-0.5">Notes:</span>
                  <p className="text-gray-600 whitespace-pre-line leading-relaxed">{invoice.notes}</p>
                </div>
              )}

              {invoice.terms && (
                <div>
                  <span className="font-bold text-gray-900 block mb-0.5">Terms & Conditions:</span>
                  <p className="text-gray-500 whitespace-pre-line text-[11px] leading-relaxed">{invoice.terms}</p>
                </div>
              )}
            </div>

            {/* Calculations Box */}
            <div className="w-full sm:w-1/2 max-w-xs ml-auto space-y-2 text-xs">
              <div className="flex justify-between py-1 text-gray-600 border-b border-gray-100">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">{formatCurrency(summary.subtotal, invoice.currency)}</span>
              </div>

              {summary.overallDiscount > 0 && (
                <div className="flex justify-between py-1 text-emerald-600 border-b border-gray-100">
                  <span>Discount</span>
                  <span className="font-semibold">-{formatCurrency(summary.overallDiscount, invoice.currency)}</span>
                </div>
              )}

              {summary.taxAmount > 0 && (
                <div className="flex justify-between py-1 text-gray-600 border-b border-gray-100">
                  <span>{invoice.taxName || 'Tax'} ({invoice.taxRate}%)</span>
                  <span className="font-semibold text-gray-900">+{formatCurrency(summary.taxAmount, invoice.currency)}</span>
                </div>
              )}

              {summary.shippingFee > 0 && (
                <div className="flex justify-between py-1 text-gray-600 border-b border-gray-100">
                  <span>Shipping & Handling</span>
                  <span className="font-semibold text-gray-900">+{formatCurrency(summary.shippingFee, invoice.currency)}</span>
                </div>
              )}

              <div className="flex justify-between py-2 text-sm font-bold text-gray-900 border-b-2 border-gray-900">
                <span>Total Amount Due</span>
                <span style={{ color: invoice.primaryColor }}>{formatCurrency(summary.grandTotal, invoice.currency)}</span>
              </div>

              {summary.amountPaid > 0 && (
                <div className="flex justify-between py-1 text-gray-600">
                  <span>Amount Paid / Deposit</span>
                  <span className="font-semibold text-emerald-600">-{formatCurrency(summary.amountPaid, invoice.currency)}</span>
                </div>
              )}

              <div 
                className="flex justify-between py-2.5 px-3 rounded-lg text-sm font-extrabold text-white mt-2"
                style={{ backgroundColor: invoice.primaryColor }}
              >
                <span>Balance Due</span>
                <span>{formatCurrency(summary.balanceDue, invoice.currency)}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer Signature & Thank You Note */}
        <div className="pt-8 border-t border-gray-100 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            <p className="font-medium text-gray-600">Thank you for your business!</p>
            {invoice.sender.website && <p className="text-[11px] text-gray-400">{invoice.sender.website}</p>}
          </div>

          <div className="text-right text-[11px] text-gray-400">
            Generated with Invoice Generator Pro
          </div>
        </div>

      </div>

    </div>
  );
};
