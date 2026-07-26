import { Invoice, InvoiceSummary, Currency } from '../types';

export function calculateInvoiceSummary(invoice: Invoice): InvoiceSummary {
  const { items, taxType, taxRate, discountType, discountValue, shippingFee, amountPaid } = invoice;

  let subtotal = 0;
  let itemDiscounts = 0;

  items.forEach((item) => {
    const qty = Number(item.quantity) || 0;
    const rate = Number(item.rate) || 0;
    const itemSub = qty * rate;
    subtotal += itemSub;
  });

  // Overall Discount calculation
  let overallDiscount = 0;
  if (discountType === 'percentage') {
    overallDiscount = (subtotal * (Number(discountValue) || 0)) / 100;
  } else {
    overallDiscount = Number(discountValue) || 0;
  }
  // Ensure discount doesn't exceed subtotal
  overallDiscount = Math.min(subtotal, Math.max(0, overallDiscount));

  const taxableAmount = Math.max(0, subtotal - overallDiscount);

  // Tax calculation
  let taxAmount = 0;
  if (taxType === 'on_total' && taxRate > 0) {
    taxAmount = (taxableAmount * (Number(taxRate) || 0)) / 100;
  } else if (taxType === 'per_item') {
    items.forEach((item) => {
      const qty = Number(item.quantity) || 0;
      const rate = Number(item.rate) || 0;
      const itemTax = Number(item.taxRate) || 0;
      if (itemTax > 0) {
        taxAmount += (qty * rate * itemTax) / 100;
      }
    });
  }

  const shipping = Number(shippingFee) || 0;
  const grandTotal = Math.max(0, taxableAmount + taxAmount + shipping);
  const paid = Number(amountPaid) || 0;
  const balanceDue = Math.max(0, grandTotal - paid);

  return {
    subtotal,
    itemDiscounts,
    overallDiscount,
    taxableAmount,
    taxAmount,
    shippingFee: shipping,
    grandTotal,
    amountPaid: paid,
    balanceDue,
  };
}

export function formatCurrency(amount: number, currency: Currency): string {
  const num = Number(amount) || 0;
  const formattedNumber = num.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (currency.placement === 'after') {
    return `${formattedNumber} ${currency.symbol.trim()}`;
  }
  return `${currency.symbol}${formattedNumber}`;
}

export const PRESET_COLORS = [
  { name: 'Classic Blue', hex: '#2563eb', bg: 'bg-blue-600' },
  { name: 'Indigo Deep', hex: '#4f46e5', bg: 'bg-indigo-600' },
  { name: 'Slate Gray', hex: '#334155', bg: 'bg-slate-700' },
  { name: 'Emerald Green', hex: '#059669', bg: 'bg-emerald-600' },
  { name: 'Teal Cyan', hex: '#0d9488', bg: 'bg-teal-600' },
  { name: 'Burgundy Red', hex: '#9f1239', bg: 'bg-rose-800' },
  { name: 'Violet Luxe', hex: '#7c3aed', bg: 'bg-violet-600' },
  { name: 'Amber Gold', hex: '#d97706', bg: 'bg-amber-600' },
  { name: 'Pure Dark', hex: '#111827', bg: 'bg-gray-900' },
];
