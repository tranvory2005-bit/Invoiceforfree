import { Invoice } from '../types';
import { DEFAULT_CURRENCY, CURRENCIES } from './currencies';

export const SAMPLE_INVOICES: Record<string, Invoice> = {
  web_design: {
    id: 'sample-inv-001',
    invoiceNumber: 'INV-2026-001',
    referenceNumber: 'PO-98421',
    issueDate: '2026-08-01',
    dueDate: '2026-08-15',
    paymentTerms: 'Net 14 Days',
    status: 'pending',
    currency: DEFAULT_CURRENCY,
    
    sender: {
      name: 'Apex Digital Design Studio',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      email: 'billing@apexdigital.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 400',
      cityStateZip: 'San Francisco, CA 94107',
      country: 'United States',
      taxIdLabel: 'EIN / Tax ID',
      taxId: 'US-94-3829102',
      website: 'https://apexdigital.com',
    },
    
    client: {
      name: 'Sarah Jenkins',
      companyName: 'Lumina Health Technologies Inc.',
      email: 's.jenkins@luminahealth.io',
      phone: '+1 (555) 876-5432',
      address: '120 Market Street, 12th Floor',
      cityStateZip: 'Seattle, WA 98101',
      country: 'United States',
      clientTaxId: 'WA-884-201',
      poNumber: 'PO-2026-88',
    },
    
    items: [
      {
        id: 'item-1',
        description: 'Brand Identity & Web Application Interface Redesign (Figma Design System & Components)',
        quantity: 1,
        rate: 3800,
        amount: 3800,
      },
      {
        id: 'item-2',
        description: 'Frontend Development (React, TypeScript, Tailwind CSS & Motion Animations)',
        quantity: 45,
        rate: 95,
        amount: 4275,
      },
      {
        id: 'item-3',
        description: 'API Integration & Backend Route Setup (Node.js & Security Review)',
        quantity: 18,
        rate: 110,
        amount: 1980,
      },
      {
        id: 'item-4',
        description: 'Performance Optimization, Cross-browser QA Testing & Deployment Support',
        quantity: 1,
        rate: 650,
        amount: 650,
      },
    ],
    
    taxType: 'on_total',
    taxRate: 8.5,
    taxName: 'State Sales Tax',
    
    discountType: 'fixed',
    discountValue: 200,
    
    shippingFee: 0,
    amountPaid: 2500,
    
    notes: 'Thank you for choosing Apex Digital Studio! Please include Invoice # INV-2026-001 with your payment transaction note.',
    terms: 'Payment is requested within 14 days of invoice issue date. Late payments are subject to a 1.5% monthly interest surcharge after the due date.',
    
    paymentDetails: {
      bankName: 'Silicon Valley Commercial Bank',
      accountName: 'Apex Digital Design LLC',
      accountNumber: '•••• •••• 4910',
      routingNumber: '121000358',
      ibanSwift: 'SVCBUS33XXX',
      paypalEmail: 'payments@apexdigital.com',
      venmoHandle: '@ApexDigitalStudio',
      customPaymentNotes: 'ACH or Direct Wire preferred. Credit Card payments accepted via client portal link.',
    },
    
    templateStyle: 'modern',
    primaryColor: '#2563eb',
    fontFamily: 'sans',
    
    createdAt: '2026-08-01T10:00:00.000Z',
    updatedAt: '2026-08-01T10:00:00.000Z',
  },
  
  consulting: {
    id: 'sample-inv-002',
    invoiceNumber: 'INV-2026-089',
    referenceNumber: 'AGR-40192',
    issueDate: '2026-07-15',
    dueDate: '2026-08-14',
    paymentTerms: 'Net 30 Days',
    status: 'paid',
    currency: DEFAULT_CURRENCY,
    
    sender: {
      name: 'Vanguard Corporate Advisory Ltd.',
      email: 'finance@vanguardadvisory.com',
      phone: '+1 (555) 794-0912',
      address: '25 Bank Street, Financial Center',
      cityStateZip: 'New York, NY 10005',
      country: 'United States',
      taxIdLabel: 'Tax ID',
      taxId: 'US-98-2481029',
      website: 'https://vanguardadvisory.com',
    },
    
    client: {
      name: 'Marcus Vance',
      companyName: 'EuroTech Ventures Holding',
      email: 'm.vance@eurotechholdings.com',
      phone: '+1 (555) 123-5678',
      address: '450 Lexington Avenue',
      cityStateZip: 'New York, NY 10017',
      country: 'United States',
      clientTaxId: 'NY-291-039',
      poNumber: 'PO-2026-9921',
    },
    
    items: [
      {
        id: 'c-1',
        description: 'Q2 Strategic Expansion & M&A Due Diligence Advisory Report',
        quantity: 1,
        rate: 6500,
        amount: 6500,
      },
      {
        id: 'c-2',
        description: 'Financial Modeling & Regulatory Compliance Audit (Hours)',
        quantity: 20,
        rate: 200,
        amount: 4000,
      },
      {
        id: 'c-3',
        description: 'Executive Leadership Workshops & Strategic Realignment Sessions',
        quantity: 2,
        rate: 1500,
        amount: 3000,
      },
    ],
    
    taxType: 'on_total',
    taxRate: 5.0,
    taxName: 'Service Tax',
    
    discountType: 'percentage',
    discountValue: 5,
    
    shippingFee: 0,
    amountPaid: 13442.50,
    
    notes: 'All services performed under the Master Services Agreement executed Q1 2026.',
    terms: 'Strictly Net 30 days from invoice dispatch. Direct Wire or ACH.',
    
    paymentDetails: {
      bankName: 'JPMorgan Chase Commercial',
      accountName: 'Vanguard Corporate Advisory Ltd',
      accountNumber: '83920192',
      routingNumber: '021000021',
      ibanSwift: 'CHASUS33',
      paypalEmail: 'billing@vanguardadvisory.com',
    },
    
    templateStyle: 'elegant',
    primaryColor: '#334155',
    fontFamily: 'serif',
    
    createdAt: '2026-07-15T09:30:00.000Z',
    updatedAt: '2026-07-15T09:30:00.000Z',
  },
  
  creative_photo: {
    id: 'sample-inv-003',
    invoiceNumber: 'INV-2026-312',
    referenceNumber: 'EVENT-JUN-26',
    issueDate: '2026-06-20',
    dueDate: '2026-06-27',
    paymentTerms: 'Due on Receipt',
    status: 'paid',
    currency: DEFAULT_CURRENCY,
    
    sender: {
      name: 'Aura Lens Photography & Media',
      email: 'hello@auralensmedia.com',
      phone: '+1 (555) 901-2345',
      address: '410 Arts District Way',
      cityStateZip: 'Los Angeles, CA 90013',
      country: 'United States',
      taxIdLabel: 'Tax ID',
      taxId: 'CA-20-491029',
      website: 'https://auralensmedia.com',
    },
    
    client: {
      name: 'Elena Rostova',
      companyName: 'Velvet Horizon Fashion Week',
      email: 'elena@velvethorizon.com',
      phone: '+1 (555) 432-1098',
      address: '880 Sunset Blvd, Suite 200',
      cityStateZip: 'West Hollywood, CA 90069',
      country: 'United States',
    },
    
    items: [
      {
        id: 'p-1',
        description: 'Full Day Runway & Backstage Commercial Photography Coverage (10 Hours)',
        quantity: 1,
        rate: 2400,
        amount: 2400,
      },
      {
        id: 'p-2',
        description: 'High-Resolution Retouching & Color Grading (75 Select Stills)',
        quantity: 75,
        rate: 25,
        amount: 1875,
      },
      {
        id: 'p-3',
        description: 'Commercial Brand Usage Rights & Editorial Distribution License',
        quantity: 1,
        rate: 900,
        amount: 900,
      },
    ],
    
    taxType: 'none',
    taxRate: 0,
    taxName: 'Tax',
    
    discountType: 'fixed',
    discountValue: 175,
    
    shippingFee: 0,
    amountPaid: 5000,
    
    notes: 'Thank you for an incredible shoot! All digital deliverables uploaded to the client gallery.',
    terms: 'Full payment received. Thank you for your business!',
    
    paymentDetails: {
      bankName: 'Chase Commercial',
      accountName: 'Aura Lens Media LLC',
      paypalEmail: 'payments@auralensmedia.com',
      venmoHandle: '@AuraLens',
    },
    
    templateStyle: 'minimal',
    primaryColor: '#7c3aed',
    fontFamily: 'sans',
    
    createdAt: '2026-06-20T14:15:00.000Z',
    updatedAt: '2026-06-20T14:15:00.000Z',
  },

  cloud_migration: {
    id: 'sample-inv-004',
    invoiceNumber: 'INV-2026-044',
    referenceNumber: 'ENG-2026-09',
    issueDate: '2026-05-10',
    dueDate: '2026-05-24',
    paymentTerms: 'Net 14 Days',
    status: 'paid',
    currency: DEFAULT_CURRENCY,
    
    sender: {
      name: 'Apex Digital Design Studio',
      email: 'billing@apexdigital.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 400',
      cityStateZip: 'San Francisco, CA 94107',
      country: 'United States',
      taxIdLabel: 'EIN / Tax ID',
      taxId: 'US-94-3829102',
    },
    
    client: {
      name: 'David Chen',
      companyName: 'CloudScale Logistics Inc.',
      email: 'd.chen@cloudscalelogistics.com',
      phone: '+1 (555) 441-8899',
      address: '900 Technology Blvd',
      cityStateZip: 'Austin, TX 78701',
      country: 'United States',
    },
    
    items: [
      {
        id: 'cm-1',
        description: 'Microservices Architecture Migration & Docker Containerization',
        quantity: 40,
        rate: 130,
        amount: 5200,
      },
      {
        id: 'cm-2',
        description: 'CI/CD Pipeline Automation & Automated Infrastructure Scripts',
        quantity: 1,
        rate: 2200,
        amount: 2200,
      },
    ],
    
    taxType: 'none',
    taxRate: 0,
    taxName: 'Tax',
    discountType: 'fixed',
    discountValue: 0,
    shippingFee: 0,
    amountPaid: 7400,
    
    notes: 'Project completed on schedule with zero production downtime.',
    terms: 'Paid in full upon sign-off.',
    
    paymentDetails: {
      bankName: 'Silicon Valley Commercial Bank',
      accountName: 'Apex Digital Design LLC',
    },
    
    templateStyle: 'modern',
    primaryColor: '#059669',
    fontFamily: 'sans',
    
    createdAt: '2026-05-10T11:00:00.000Z',
    updatedAt: '2026-05-10T11:00:00.000Z',
  },

  overdue_retainer: {
    id: 'sample-inv-005',
    invoiceNumber: 'INV-2026-021',
    referenceNumber: 'RET-APRIL',
    issueDate: '2026-04-01',
    dueDate: '2026-04-15',
    paymentTerms: 'Net 14 Days',
    status: 'overdue',
    currency: DEFAULT_CURRENCY,
    
    sender: {
      name: 'Apex Digital Design Studio',
      email: 'billing@apexdigital.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 400',
      cityStateZip: 'San Francisco, CA 94107',
      country: 'United States',
      taxIdLabel: 'EIN / Tax ID',
      taxId: 'US-94-3829102',
    },
    
    client: {
      name: 'Rachel Adams',
      companyName: 'Nexus E-Commerce Brands',
      email: 'radams@nexusecom.io',
      phone: '+1 (555) 990-1122',
      address: '330 Michigan Ave',
      cityStateZip: 'Chicago, IL 60601',
      country: 'United States',
    },
    
    items: [
      {
        id: 'ret-1',
        description: 'Monthly Dedicated UI/UX Retainer & Conversion Optimization',
        quantity: 1,
        rate: 3500,
        amount: 3500,
      },
    ],
    
    taxType: 'none',
    taxRate: 0,
    taxName: 'Tax',
    discountType: 'fixed',
    discountValue: 0,
    shippingFee: 0,
    amountPaid: 0,
    
    notes: 'Payment reminder: this invoice is past its due date. Please settle balance promptly.',
    terms: '1.5% monthly late fee accrues after 30 days overdue.',
    
    paymentDetails: {
      bankName: 'Silicon Valley Commercial Bank',
      accountName: 'Apex Digital Design LLC',
    },
    
    templateStyle: 'modern',
    primaryColor: '#e11d48',
    fontFamily: 'sans',
    
    createdAt: '2026-04-01T08:00:00.000Z',
    updatedAt: '2026-04-01T08:00:00.000Z',
  },

  q1_audit: {
    id: 'sample-inv-006',
    invoiceNumber: 'INV-2026-012',
    referenceNumber: 'AUD-MARCH',
    issueDate: '2026-03-12',
    dueDate: '2026-03-26',
    paymentTerms: 'Net 14 Days',
    status: 'paid',
    currency: DEFAULT_CURRENCY,
    
    sender: {
      name: 'Apex Digital Design Studio',
      email: 'billing@apexdigital.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Suite 400',
      cityStateZip: 'San Francisco, CA 94107',
      country: 'United States',
      taxIdLabel: 'EIN / Tax ID',
      taxId: 'US-94-3829102',
    },
    
    client: {
      name: 'Sarah Jenkins',
      companyName: 'Lumina Health Technologies Inc.',
      email: 's.jenkins@luminahealth.io',
      phone: '+1 (555) 876-5432',
      address: '120 Market Street, 12th Floor',
      cityStateZip: 'Seattle, WA 98101',
      country: 'United States',
    },
    
    items: [
      {
        id: 'aud-1',
        description: 'Design Architecture Audit & Usability Accessibility (WCAG 2.1) Assessment',
        quantity: 1,
        rate: 4200,
        amount: 4200,
      },
    ],
    
    taxType: 'none',
    taxRate: 0,
    taxName: 'Tax',
    discountType: 'fixed',
    discountValue: 0,
    shippingFee: 0,
    amountPaid: 4200,
    
    notes: 'Comprehensive audit report and remediation matrix delivered.',
    terms: 'Payment received in full. Thank you!',
    
    paymentDetails: {
      bankName: 'Silicon Valley Commercial Bank',
      accountName: 'Apex Digital Design LLC',
    },
    
    templateStyle: 'modern',
    primaryColor: '#2563eb',
    fontFamily: 'sans',
    
    createdAt: '2026-03-12T10:00:00.000Z',
    updatedAt: '2026-03-12T10:00:00.000Z',
  }
};

export const CREATE_NEW_INVOICE_TEMPLATE = (): Invoice => ({
  id: `inv-${Date.now()}`,
  invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
  referenceNumber: '',
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  paymentTerms: 'Due on Receipt',
  status: 'draft',
  currency: DEFAULT_CURRENCY,
  
  sender: {
    name: 'My Business Name',
    logoUrl: '',
    email: 'billing@mycompany.com',
    phone: '+1 (555) 000-0000',
    address: '123 Business Way',
    cityStateZip: 'New York, NY 10001',
    country: 'United States',
    taxIdLabel: 'Tax ID / VAT',
    taxId: 'XX-XXXXXXX',
    website: 'https://mycompany.com',
  },
  
  client: {
    name: 'Client Contact Person',
    companyName: 'Client Organization LLC',
    email: 'accounts@clientcompany.com',
    phone: '+1 (555) 123-4567',
    address: '456 Corporate Ave',
    cityStateZip: 'Boston, MA 02108',
    country: 'United States',
    clientTaxId: '',
    poNumber: '',
  },
  
  items: [
    {
      id: `item-${Date.now()}-1`,
      description: 'Professional Consulting / Development Services',
      quantity: 10,
      rate: 85,
      amount: 850,
    },
    {
      id: `item-${Date.now()}-2`,
      description: 'Project Setup & Initial Deliverables',
      quantity: 1,
      rate: 350,
      amount: 350,
    }
  ],
  
  taxType: 'on_total',
  taxRate: 5,
  taxName: 'Sales Tax',
  
  discountType: 'fixed',
  discountValue: 0,
  
  shippingFee: 0,
  amountPaid: 0,
  
  notes: 'Thank you for your business! Please feel free to reach out with any questions.',
  terms: 'Payment is due within 14 days of invoice date.',
  
  paymentDetails: {
    bankName: 'Global Commercial Bank',
    accountName: 'My Business Name LLC',
    accountNumber: '1234 5678 9012',
    routingNumber: '987654321',
    ibanSwift: 'GCBKUS33',
    paypalEmail: 'billing@mycompany.com',
    customPaymentNotes: 'Please reference the invoice number on your wire transfer or payment check.',
  },
  
  templateStyle: 'modern',
  primaryColor: '#2563eb',
  fontFamily: 'sans',
  
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});
