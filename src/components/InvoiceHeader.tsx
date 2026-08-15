import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  History, 
  Plus, 
  Sparkles, 
  Save, 
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  LayoutDashboard,
  BarChart3
} from 'lucide-react';
import { Invoice } from '../types';
import { PolicyTab } from './PolicyModal';

interface InvoiceHeaderProps {
  activeTab: 'editor' | 'dashboard' | 'history';
  setActiveTab: (tab: 'editor' | 'dashboard' | 'history') => void;
  invoice: Invoice;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
  onSaveInvoice: () => void;
  onPrintInvoice: () => void;
  onLoadSample: (key: string) => void;
  onNewInvoice: () => void;
  savedCount: number;
  showSaveSuccess: boolean;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({
  activeTab,
  setActiveTab,
  invoice,
  onSaveInvoice,
  onPrintInvoice,
  onLoadSample,
  onNewInvoice,
  savedCount,
  showSaveSuccess,
  onOpenPolicy,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs print:hidden">
      
      {/* Top Banner with Quick Privacy & Policy Links */}
      {onOpenPolicy && (
        <div className="bg-slate-900 text-slate-300 py-1.5 px-4 sm:px-6 lg:px-8 text-[11px] font-medium flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="hidden sm:inline">100% Free Online Invoice Generator • Private & Secure</span>
            <span className="sm:hidden">Free Online Invoice Maker</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-semibold text-slate-300">
            <button 
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-blue-400 transition-colors"
            >
              Privacy
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-blue-400 transition-colors"
            >
              Terms
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenPolicy('guide')}
              className="hover:text-blue-400 transition-colors hidden sm:inline"
            >
              Invoicing Guide
            </button>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={() => onOpenPolicy('contact')}
              className="hover:text-blue-400 transition-colors"
            >
              Help
            </button>
          </div>
        </div>
      )}

      {/* Main Clean Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-4">
          
          {/* Logo & Main Title */}
          <div 
            onClick={() => setActiveTab('editor')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 group-hover:bg-blue-700 flex items-center justify-center text-white shadow-xs transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center">
                  <span>Invoices</span><span className="text-blue-600">ForFree</span>
                </h1>
                <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  100% Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Free Online Invoice Generator
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs (Editor, Dashboard, History) */}
          <nav className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'editor'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice Editor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>History</span>
              {savedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-slate-200 text-slate-800">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Mobile Tab Icons */}
            <div className="flex md:hidden items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`p-2 rounded-lg text-xs font-semibold cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'
                }`}
                title="Performance Dashboard"
              >
                <BarChart3 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`p-2 rounded-lg text-xs font-semibold cursor-pointer ${
                  activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-100'
                }`}
                title="Saved Invoices History"
              >
                <History className="w-4 h-4" />
              </button>
            </div>

            {/* New Invoice */}
            <button
              type="button"
              onClick={onNewInvoice}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">New Invoice</span>
            </button>

            {/* Download / Print Button (Quick Access in Nav on mobile/desktop) */}
            <button
              type="button"
              onClick={onPrintInvoice}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline sm:inline">Download PDF</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
