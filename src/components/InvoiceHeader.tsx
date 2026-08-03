import React from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  History, 
  Plus, 
  Sparkles, 
  Eye, 
  Edit3, 
  Save, 
  Palette, 
  Upload,
  CheckCircle2
} from 'lucide-react';
import { Invoice, InvoiceTemplateStyle } from '../types';
import { PRESET_COLORS } from '../utils/calculator';
import { PolicyTab } from './PolicyModal';

interface InvoiceHeaderProps {
  activeTab: 'editor' | 'preview' | 'history';
  setActiveTab: (tab: 'editor' | 'preview' | 'history') => void;
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
  setInvoice,
  onSaveInvoice,
  onPrintInvoice,
  onLoadSample,
  onNewInvoice,
  savedCount,
  showSaveSuccess,
  onOpenPolicy,
}) => {
  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoice, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${invoice.invoiceNumber || 'invoice'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.invoiceNumber && parsed.items) {
            setInvoice(parsed);
          } else {
            alert('Invalid invoice JSON structure.');
          }
        } catch {
          alert('Could not parse JSON file.');
        }
      };
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs print:hidden">
      
      {/* Top AdSense Policy Navigation Bar */}
      {onOpenPolicy && (
        <div className="bg-slate-900 text-slate-300 py-1 px-4 sm:px-6 lg:px-8 text-[11px] font-medium flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Free PDF Invoice Builder • Privacy-First Local Storage</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 font-semibold text-slate-300">
            <button 
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Use
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenPolicy('about')}
              className="hover:text-blue-400 transition-colors hidden sm:inline"
            >
              About Us
            </button>
            <span className="hidden sm:inline">•</span>
            <button 
              onClick={() => onOpenPolicy('contact')}
              className="hover:text-blue-400 transition-colors"
            >
              Contact Us
            </button>
            <span>•</span>
            <button 
              onClick={() => onOpenPolicy('guide')}
              className="hover:text-blue-400 transition-colors hidden md:inline"
            >
              Guide
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3">
          
          {/* Logo & Main Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                    Invoice Generator
                  </h1>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                    Pro Builder
                  </span>
                </div>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Create, customize & export professional PDF invoices
                </p>
              </div>
            </div>

            {/* Mobile Tab Switcher */}
            <div className="flex md:hidden items-center bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'editor' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'preview' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                }`}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'history' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
                }`}
              >
                History ({savedCount})
              </button>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden md:flex items-center bg-gray-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'editor' 
                  ? 'bg-white text-gray-900 shadow-xs font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Edit3 className="w-4 h-4 text-blue-600" />
              Invoice Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'preview' 
                  ? 'bg-white text-gray-900 shadow-xs font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="w-4 h-4 text-indigo-600" />
              Live Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === 'history' 
                  ? 'bg-white text-gray-900 shadow-xs font-semibold' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="w-4 h-4 text-slate-600" />
              Saved Invoices ({savedCount})
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {/* Quick Samples Dropdown */}
            <div className="relative group">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Load Samples
              </button>
              <div className="absolute right-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Presets
                </div>
                <button
                  type="button"
                  onClick={() => onLoadSample('web_design')}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Tech & Design Studio</span>
                  <span className="text-[10px] text-gray-400">USD</span>
                </button>
                <button
                  type="button"
                  onClick={() => onLoadSample('consulting')}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Corporate Advisory</span>
                  <span className="text-[10px] text-gray-400">EUR</span>
                </button>
                <button
                  type="button"
                  onClick={() => onLoadSample('creative_photo')}
                  className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between"
                >
                  <span>Photography & Media</span>
                  <span className="text-[10px] text-gray-400">USD</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  type="button"
                  onClick={onNewInvoice}
                  className="w-full text-left px-3 py-2 text-xs text-blue-600 font-medium hover:bg-blue-50 flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Blank Invoice
                </button>
              </div>
            </div>

            {/* Save Draft Button */}
            <button
              type="button"
              onClick={onSaveInvoice}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap ${
                showSaveSuccess
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {showSaveSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-gray-500" />
                  Save Draft
                </>
              )}
            </button>

            {/* Print / Download PDF */}
            <button
              type="button"
              onClick={onPrintInvoice}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Download PDF
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
