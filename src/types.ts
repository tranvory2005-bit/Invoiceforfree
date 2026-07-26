export type InvoiceTemplateStyle = 'modern' | 'classic' | 'minimal' | 'elegant' | 'compact';

export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  placement: 'before' | 'after';
}

export interface BusinessInfo {
  name: string;
  logoUrl?: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  country: string;
  taxIdLabel: string; // e.g. "VAT ID", "EIN", "GSTIN", "Tax No."
  taxId: string;
  website?: string;
}

export interface ClientInfo {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  country: string;
  clientTaxId?: string;
  poNumber?: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  taxRate?: number; // percentage e.g. 10 for 10%
  amount: number;
}

export interface PaymentDetails {
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  routingNumber?: string;
  ibanSwift?: string;
  paypalEmail?: string;
  venmoHandle?: string;
  customPaymentNotes?: string;
  qrCodeLink?: string; // QR code payment link (e.g. PayPal/Venmo/UPI/Stripe payment link)
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  referenceNumber?: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string; // e.g. "Net 30", "Due on receipt", "Net 15"
  status: InvoiceStatus;
  
  currency: Currency;
  
  sender: BusinessInfo;
  client: ClientInfo;
  
  items: InvoiceItem[];
  
  taxType: 'none' | 'on_total' | 'per_item';
  taxRate: number; // overall tax rate percentage
  taxName: string; // e.g. "Sales Tax", "VAT", "GST"
  
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  
  shippingFee: number;
  amountPaid: number; // deposit or partial payment
  
  notes: string;
  terms: string;
  
  paymentDetails: PaymentDetails;
  
  // Custom Styling
  templateStyle: InvoiceTemplateStyle;
  primaryColor: string; // Hex color code
  fontFamily: 'sans' | 'serif' | 'mono';
  
  createdAt: string;
  updatedAt: string;
}

export interface InvoiceSummary {
  subtotal: number;
  itemDiscounts: number;
  overallDiscount: number;
  taxableAmount: number;
  taxAmount: number;
  shippingFee: number;
  grandTotal: number;
  amountPaid: number;
  balanceDue: number;
}
