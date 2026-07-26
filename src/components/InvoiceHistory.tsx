import React, { useState } from 'react';
import { 
  Search, 
  Trash2, 
  Copy, 
  Edit3, 
  Printer, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Invoice, InvoiceStatus } from '../types';
import { calculateInvoiceSummary, formatCurrency } from '../utils/calculator';

interface InvoiceHistoryProps {
  savedInvoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  onDeleteInvoice: (id: string) => void;
  onDuplicateInvoice: (invoice: Invoice) => void;
  onUpdateStatus: (id: string, newStatus: InvoiceStatus) => void;
  onNewInvoice: () => void;
  onPrintInvoice: (invoice: Invoice) => void;
}

export const InvoiceHistory: React.FC<InvoiceHistoryProps> = ({
  savedInvoices,
  onSelectInvoice,
  onDeleteInvoice,
  onDuplicateInvoice,
  onUpdateStatus,
  onNewInvoice,
  onPrintInvoice,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = savedInvoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.client.companyName && inv.client.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inv.sender.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: InvoiceStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" /> Paid
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertTriangle className="w-3 h-3 text-rose-600" /> Overdue
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" /> Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
            Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Search & Filter Header */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by invoice #, client name or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { key: 'all', label: 'All Invoices' },
            { key: 'draft', label: 'Drafts' },
            { key: 'pending', label: 'Pending' },
            { key: 'paid', label: 'Paid' },
            { key: 'overdue', label: 'Overdue' },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setStatusFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                statusFilter === f.key
                  ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-2xs'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}

          <button
            type="button"
            onClick={onNewInvoice}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors whitespace-nowrap ml-2"
          >
            <Plus className="w-3.5 h-3.5" />
            New
          </button>
        </div>

      </div>

      {/* Invoices List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-200/80 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">No invoices found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            {savedInvoices.length === 0
              ? 'You have not saved any invoices yet. Create your first invoice in the editor or load a sample template.'
              : 'No invoices match your search term or status filter criteria.'}
          </p>
          <button
            type="button"
            onClick={onNewInvoice}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors mt-2"
          >
            <Plus className="w-4 h-4" />
            Create First Invoice
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((inv) => {
            const summary = calculateInvoiceSummary(inv);
            return (
              <div
                key={inv.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-gray-100">
                    <div>
                      <span className="text-xs font-extrabold text-blue-700 block">
                        {inv.invoiceNumber}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        Due {inv.dueDate}
                      </span>
                    </div>
                    {getStatusBadge(inv.status)}
                  </div>

                  <div className="py-3 space-y-1">
                    <div className="text-sm font-bold text-gray-900 truncate">
                      {inv.client.name || 'Unnamed Client'}
                    </div>
                    {inv.client.companyName && (
                      <div className="text-xs text-gray-500 truncate">
                        {inv.client.companyName}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">Amount Due</span>
                    <span className="text-base font-extrabold text-gray-900">
                      {formatCurrency(summary.grandTotal, inv.currency)}
                    </span>
                  </div>
                </div>

                {/* Quick Status Switcher & Card Actions */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={inv.status}
                      onChange={(e) => onUpdateStatus(inv.id, e.target.value as InvoiceStatus)}
                      className="text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-1 outline-none"
                    >
                      <option value="draft">Mark Draft</option>
                      <option value="pending">Mark Pending</option>
                      <option value="paid">Mark Paid</option>
                      <option value="overdue">Mark Overdue</option>
                    </select>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onDuplicateInvoice(inv)}
                        title="Duplicate Invoice"
                        className="p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteInvoice(inv.id)}
                        title="Delete Invoice"
                        className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onSelectInvoice(inv)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onPrintInvoice(inv)}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
