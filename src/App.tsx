import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceStatus } from './types';
import { SAMPLE_INVOICES, CREATE_NEW_INVOICE_TEMPLATE } from './data/sampleInvoices';
import { InvoiceHeader } from './components/InvoiceHeader';
import { InvoiceEditor } from './components/InvoiceEditor';
import { InvoiceHistory } from './components/InvoiceHistory';
import { InvoiceDashboard } from './components/InvoiceDashboard';
import { SeoFooter } from './components/SeoFooter';
import { InvoicingKnowledgeHub } from './components/InvoicingKnowledgeHub';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { CookieBanner } from './components/CookieBanner';

const STORAGE_KEY_SAVED_INVOICES = 'invoice_generator_saved_list_v1';
const STORAGE_KEY_CURRENT_INVOICE = 'invoice_generator_current_draft_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'editor' | 'dashboard' | 'history'>('editor');
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab>('privacy');

  // Handle URL hash links like #privacy-policy, #terms-of-service, #about-us, #contact-us, #dashboard
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#dashboard') {
        setActiveTab('dashboard');
      } else if (hash === '#privacy-policy' || hash === '#privacy') {
        setPolicyModalTab('privacy');
        setPolicyModalOpen(true);
      } else if (hash === '#terms-of-service' || hash === '#terms') {
        setPolicyModalTab('terms');
        setPolicyModalOpen(true);
      } else if (hash === '#about-us' || hash === '#about') {
        setPolicyModalTab('about');
        setPolicyModalOpen(true);
      } else if (hash === '#contact-us' || hash === '#contact') {
        setPolicyModalTab('contact');
        setPolicyModalOpen(true);
      } else if (hash === '#invoicing-guide' || hash === '#guide') {
        setPolicyModalTab('guide');
        setPolicyModalOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenPolicy = (tab: PolicyTab) => {
    setPolicyModalTab(tab);
    setPolicyModalOpen(true);
  };
  
  // Current active draft invoice
  const [invoice, setInvoice] = useState<Invoice>(() => {
    try {
      const savedDraft = localStorage.getItem(STORAGE_KEY_CURRENT_INVOICE);
      if (savedDraft) {
        return JSON.parse(savedDraft);
      }
    } catch (e) {
      console.error('Failed to parse saved draft invoice:', e);
    }
    return SAMPLE_INVOICES.web_design;
  });

  // Dynamic document title update
  useEffect(() => {
    if (activeTab === 'dashboard') {
      document.title = `Business Performance Dashboard | InvoicesForFree`;
    } else if (activeTab === 'history') {
      document.title = `Saved Invoices History | InvoicesForFree`;
    } else if (invoice.invoiceNumber) {
      document.title = `Invoice #${invoice.invoiceNumber} | InvoicesForFree — Free Invoice Generator`;
    } else {
      document.title = `InvoicesForFree — 100% Free Online Invoice Generator & PDF Maker`;
    }
  }, [activeTab, invoice.invoiceNumber]);

  // List of saved historical invoices
  const [savedInvoices, setSavedInvoices] = useState<Invoice[]>(() => {
    try {
      const savedList = localStorage.getItem(STORAGE_KEY_SAVED_INVOICES);
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved invoices history:', e);
    }
    return Object.values(SAMPLE_INVOICES);
  });

  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Auto-save active draft to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT_INVOICE, JSON.stringify(invoice));
    } catch (e) {
      console.error('Failed to auto-save current draft:', e);
    }
  }, [invoice]);

  // Persist saved list to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED_INVOICES, JSON.stringify(savedInvoices));
    } catch (e) {
      console.error('Failed to save invoices list:', e);
    }
  }, [savedInvoices]);

  // Save current draft to saved invoices list
  const handleSaveInvoice = () => {
    setSavedInvoices((prev) => {
      const existingIdx = prev.findIndex((inv) => inv.id === invoice.id);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = invoice;
        return copy;
      }
      return [invoice, ...prev];
    });

    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 2000);
  };

  // Trigger print dialog (Direct PDF export via browser print)
  const handlePrintInvoice = (targetInvoice?: Invoice) => {
    if (targetInvoice) {
      setInvoice(targetInvoice);
    }
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Load sample template
  const handleLoadSample = (key: string) => {
    const sample = SAMPLE_INVOICES[key];
    if (sample) {
      setInvoice({ ...sample, id: `inv-${Date.now()}` });
      setActiveTab('editor');
    }
  };

  // Create brand new blank invoice
  const handleNewInvoice = () => {
    setInvoice(CREATE_NEW_INVOICE_TEMPLATE());
    setActiveTab('editor');
  };

  // Delete invoice from history
  const handleDeleteInvoice = (id: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setSavedInvoices((prev) => prev.filter((inv) => inv.id !== id));
    }
  };

  // Duplicate invoice
  const handleDuplicateInvoice = (target: Invoice) => {
    const duplicated: Invoice = {
      ...target,
      id: `inv-${Date.now()}`,
      invoiceNumber: `${target.invoiceNumber}-COPY`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setInvoice(duplicated);
    setSavedInvoices((prev) => [duplicated, ...prev]);
    setActiveTab('editor');
  };

  // Update status directly from history list
  const handleUpdateStatus = (id: string, newStatus: InvoiceStatus) => {
    setSavedInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
    if (invoice.id === id) {
      setInvoice((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Select invoice from history to edit
  const handleSelectInvoice = (selected: Invoice) => {
    setInvoice(selected);
    setActiveTab('editor');
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col relative">
      
      {/* Top Header Navbar */}
      <InvoiceHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        invoice={invoice}
        setInvoice={setInvoice}
        onSaveInvoice={handleSaveInvoice}
        onPrintInvoice={() => handlePrintInvoice()}
        onLoadSample={handleLoadSample}
        onNewInvoice={handleNewInvoice}
        savedCount={savedInvoices.length}
        showSaveSuccess={showSaveSuccess}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* VIEW 1: CLEAN WYSIWYG INVOICE EDITOR & GUIDE */}
        {activeTab === 'editor' && (
          <>
            <InvoiceEditor 
              invoice={invoice} 
              setInvoice={setInvoice}
              onSaveInvoice={handleSaveInvoice}
              onPrintInvoice={() => handlePrintInvoice()}
              onNewInvoice={handleNewInvoice}
              savedCount={savedInvoices.length}
              showSaveSuccess={showSaveSuccess}
              onOpenHistory={() => setActiveTab('history')}
              onOpenDashboard={() => setActiveTab('dashboard')}
              onLoadSample={handleLoadSample}
            />
            
            {/* SEO & Educational Knowledge Center below the editor */}
            <InvoicingKnowledgeHub />
          </>
        )}

        {/* VIEW 2: BUSINESS PERFORMANCE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="pb-16">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Invoice Editor
              </button>
            </div>
            <InvoiceDashboard
              invoices={savedInvoices}
              onSelectInvoice={handleSelectInvoice}
              onNewInvoice={handleNewInvoice}
              onNavigateHistory={() => setActiveTab('history')}
            />
          </div>
        )}

        {/* VIEW 3: SAVED INVOICES HISTORY */}
        {activeTab === 'history' && (
          <div className="pb-16">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Invoice Editor
              </button>
            </div>
            <InvoiceHistory
              savedInvoices={savedInvoices}
              onSelectInvoice={handleSelectInvoice}
              onDeleteInvoice={handleDeleteInvoice}
              onDuplicateInvoice={handleDuplicateInvoice}
              onUpdateStatus={handleUpdateStatus}
              onNewInvoice={handleNewInvoice}
              onPrintInvoice={(inv) => handlePrintInvoice(inv)}
              onNavigateDashboard={() => setActiveTab('dashboard')}
            />
          </div>
        )}

      </main>

      {/* Footer */}
      <SeoFooter onOpenPolicy={handleOpenPolicy} />

      {/* Policy & Legal Modal */}
      <PolicyModal
        isOpen={policyModalOpen}
        initialTab={policyModalTab}
        onClose={() => setPolicyModalOpen(false)}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner onOpenPrivacyPolicy={() => handleOpenPolicy('privacy')} />

    </div>
  );
}
