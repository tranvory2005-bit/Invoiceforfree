import React, { useState, useEffect } from 'react';
import { Invoice, InvoiceStatus } from './types';
import { SAMPLE_INVOICES, CREATE_NEW_INVOICE_TEMPLATE } from './data/sampleInvoices';
import { ARTICLES_DATA, Article } from './data/articles';
import { InvoiceHeader, MainNavTab } from './components/InvoiceHeader';
import { InvoiceEditor } from './components/InvoiceEditor';
import { InvoiceHistory } from './components/InvoiceHistory';
import { InvoiceDashboard } from './components/InvoiceDashboard';
import { ArticleList } from './components/ArticleList';
import { ArticleView } from './components/ArticleView';
import { AboutUsPage } from './components/AboutUsPage';
import { ContactUsPage } from './components/ContactUsPage';
import { SeoFooter } from './components/SeoFooter';
import { InvoicingKnowledgeHub } from './components/InvoicingKnowledgeHub';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { CookieBanner } from './components/CookieBanner';
import { updatePageSeo } from './utils/seo';

const STORAGE_KEY_SAVED_INVOICES = 'invoice_generator_saved_list_v1';
const STORAGE_KEY_CURRENT_INVOICE = 'invoice_generator_current_draft_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('editor');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab>('privacy');

  // Handle URL hash routing
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash;
      const hash = rawHash.toLowerCase();

      if (hash.startsWith('#guide/')) {
        const slug = rawHash.substring(7);
        setSelectedArticleSlug(slug);
        setActiveTab('guides');
      } else if (hash === '#guides' || hash === '#articles' || hash === '#knowledge-hub') {
        setSelectedArticleSlug(null);
        setActiveTab('guides');
      } else if (hash === '#about-us' || hash === '#about') {
        setActiveTab('about');
      } else if (hash === '#contact-us' || hash === '#contact') {
        setActiveTab('contact');
      } else if (hash === '#dashboard') {
        setActiveTab('dashboard');
      } else if (hash === '#history') {
        setActiveTab('history');
      } else if (hash === '#privacy-policy' || hash === '#privacy') {
        setPolicyModalTab('privacy');
        setPolicyModalOpen(true);
      } else if (hash === '#terms-of-service' || hash === '#terms') {
        setPolicyModalTab('terms');
        setPolicyModalOpen(true);
      } else if (hash === '#invoicing-guide') {
        setSelectedArticleSlug(null);
        setActiveTab('guides');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenPolicy = (tab: PolicyTab) => {
    if (tab === 'about') {
      setActiveTab('about');
    } else if (tab === 'contact') {
      setActiveTab('contact');
    } else if (tab === 'guide') {
      setSelectedArticleSlug(null);
      setActiveTab('guides');
    } else {
      setPolicyModalTab(tab);
      setPolicyModalOpen(true);
    }
  };

  const handleSelectArticle = (slug: string) => {
    setSelectedArticleSlug(slug);
    setActiveTab('guides');
    window.location.hash = `#guide/${slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    setSelectedArticleSlug(null);
    window.location.hash = '#guides';
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  // Dynamic SEO Meta & JSON-LD updates on navigation
  useEffect(() => {
    if (activeTab === 'guides') {
      if (selectedArticleSlug) {
        const found = ARTICLES_DATA.find((a) => a.slug === selectedArticleSlug);
        if (found) {
          updatePageSeo({
            title: `${found.title} | InvoicesForFree Invoicing Guide`,
            description: found.summary,
            canonicalUrl: `https://invoicesforfree.com/#guide/${found.slug}`,
            ogType: 'article',
            articleData: found,
            breadcrumbs: [
              { name: 'Guides & Knowledge Hub', url: '/#guides' },
              { name: found.title, url: `/#guide/${found.slug}` },
            ],
          });
        } else {
          updatePageSeo({
            title: 'Invoicing Guides & Articles | InvoicesForFree',
            description: 'Read expert invoicing guides, tax compliance blueprints, payment terms, and cashflow strategies for freelancers and businesses.',
            canonicalUrl: 'https://invoicesforfree.com/#guides',
            breadcrumbs: [{ name: 'Guides & Knowledge Hub', url: '/#guides' }],
          });
        }
      } else {
        updatePageSeo({
          title: 'Invoicing Guides, Tax Compliance & Cashflow Center | InvoicesForFree',
          description: 'Explore comprehensive invoicing guides covering US Sales Tax, European VAT, GST, Net 30 payment terms, and industry-specific billing templates.',
          canonicalUrl: 'https://invoicesforfree.com/#guides',
          breadcrumbs: [{ name: 'Guides & Knowledge Hub', url: '/#guides' }],
        });
      }
    } else if (activeTab === 'about') {
      updatePageSeo({
        title: 'About Us — InvoicesForFree | Privacy-First 100% Free Invoicing Suite',
        description: 'Learn about InvoicesForFree, our founding mission to provide completely free, watermark-free PDF invoicing tools, and our local client-side privacy architecture.',
        canonicalUrl: 'https://invoicesforfree.com/#about-us',
        breadcrumbs: [{ name: 'About Us', url: '/#about-us' }],
      });
    } else if (activeTab === 'contact') {
      updatePageSeo({
        title: 'Contact Support & Help Desk | InvoicesForFree',
        description: 'Contact the InvoicesForFree support and editorial team. Submit questions, bug reports, feature requests, or inquiries.',
        canonicalUrl: 'https://invoicesforfree.com/#contact-us',
        breadcrumbs: [{ name: 'Contact Support', url: '/#contact-us' }],
      });
    } else if (activeTab === 'dashboard') {
      updatePageSeo({
        title: 'Business Performance & Invoicing Dashboard | InvoicesForFree',
        description: 'Track your total invoiced revenue, paid balances, outstanding accounts receivable, and client breakdown with visual charts and metrics.',
        canonicalUrl: 'https://invoicesforfree.com/#dashboard',
        breadcrumbs: [{ name: 'Business Dashboard', url: '/#dashboard' }],
      });
    } else if (activeTab === 'history') {
      updatePageSeo({
        title: 'Saved Invoices & Draft History | InvoicesForFree',
        description: 'Manage and review your saved client invoices, duplicate previous drafts, update payment status, and export PDF documents.',
        canonicalUrl: 'https://invoicesforfree.com/#history',
        breadcrumbs: [{ name: 'Invoice History', url: '/#history' }],
      });
    } else {
      updatePageSeo({
        title: invoice.invoiceNumber 
          ? `Invoice #${invoice.invoiceNumber} | InvoicesForFree — 100% Free Online Invoice Generator`
          : 'InvoicesForFree — 100% Free Online Invoice Generator & PDF Maker',
        description: 'InvoicesForFree is the #1 free online invoice generator. Create, customize, print, and download professional PDF invoices in seconds. No signup, no watermark, 100% free with logo branding, multi-currency, and tax calculation.',
        keywords: 'invoicesforfree, invoices for free, free invoice generator, invoice maker, create invoice online, free pdf invoice maker, invoice template, contractor billing, small business invoice creator',
        canonicalUrl: 'https://invoicesforfree.com/',
      });
    }
  }, [activeTab, selectedArticleSlug, invoice.invoiceNumber]);

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
      window.location.hash = '';
    }
  };

  // Create brand new blank invoice
  const handleNewInvoice = () => {
    setInvoice(CREATE_NEW_INVOICE_TEMPLATE());
    setActiveTab('editor');
    window.location.hash = '';
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
    window.location.hash = '';
  };

  const currentArticle = selectedArticleSlug
    ? ARTICLES_DATA.find((a) => a.slug === selectedArticleSlug) || ARTICLES_DATA[0]
    : null;

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col relative">
      
      {/* Top Header Navbar */}
      <InvoiceHeader
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'guides') {
            setSelectedArticleSlug(null);
            window.location.hash = '#guides';
          } else if (tab === 'about') {
            window.location.hash = '#about-us';
          } else if (tab === 'contact') {
            window.location.hash = '#contact-us';
          } else if (tab === 'dashboard') {
            window.location.hash = '#dashboard';
          } else if (tab === 'history') {
            window.location.hash = '#history';
          } else {
            window.location.hash = '';
          }
        }}
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
        
        {/* VIEW 1: CLEAN WYSIWYG INVOICE EDITOR */}
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
            
            {/* SEO & Invoicing Quick Reference */}
            <InvoicingKnowledgeHub />
          </>
        )}

        {/* VIEW 2: DEDICATED ARTICLES & INVOICING GUIDES */}
        {activeTab === 'guides' && (
          <div>
            {currentArticle ? (
              <ArticleView
                article={currentArticle}
                onBack={handleBackToArticles}
                onSelectArticle={handleSelectArticle}
                onOpenEditor={() => {
                  setActiveTab('editor');
                  window.location.hash = '';
                }}
              />
            ) : (
              <ArticleList
                onSelectArticle={handleSelectArticle}
                onOpenEditor={() => {
                  setActiveTab('editor');
                  window.location.hash = '';
                }}
              />
            )}
          </div>
        )}

        {/* VIEW 3: ABOUT US TRANSPARENCY PAGE (E-E-A-T) */}
        {activeTab === 'about' && (
          <AboutUsPage
            onOpenEditor={() => {
              setActiveTab('editor');
              window.location.hash = '';
            }}
            onOpenContact={() => {
              setActiveTab('contact');
              window.location.hash = '#contact-us';
            }}
          />
        )}

        {/* VIEW 4: CONTACT & SUPPORT DESK */}
        {activeTab === 'contact' && (
          <ContactUsPage
            onOpenEditor={() => {
              setActiveTab('editor');
              window.location.hash = '';
            }}
          />
        )}

        {/* VIEW 5: BUSINESS PERFORMANCE DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="pb-16">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('editor');
                  window.location.hash = '';
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Invoice Maker
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

        {/* VIEW 6: SAVED INVOICES HISTORY */}
        {activeTab === 'history' && (
          <div className="pb-16">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('editor');
                  window.location.hash = '';
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                ← Back to Invoice Maker
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
