import React, { useState, useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  DollarSign, 
  Download, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  Filter, 
  Sparkles,
  ChevronRight,
  PieChart as PieIcon,
  BarChart3,
  Layers,
  ArrowDownRight
} from 'lucide-react';
import { Invoice, InvoiceStatus } from '../types';
import { calculateInvoiceSummary, formatCurrency } from '../utils/calculator';
import { DEFAULT_CURRENCY } from '../data/currencies';

interface InvoiceDashboardProps {
  invoices: Invoice[];
  onSelectInvoice: (invoice: Invoice) => void;
  onNewInvoice: () => void;
  onNavigateHistory: () => void;
}

export const InvoiceDashboard: React.FC<InvoiceDashboardProps> = ({
  invoices,
  onSelectInvoice,
  onNewInvoice,
  onNavigateHistory,
}) => {
  const [timeRange, setTimeRange] = useState<'all' | '6m' | 'ytd'>('all');
  const [chartType, setChartType] = useState<'bar' | 'area'>('bar');

  // Compute stats across all invoices
  const {
    totalInvoiced,
    totalCollected,
    totalOutstanding,
    totalOverdue,
    statusCounts,
    statusValues,
    monthlyData,
    clientData,
    collectionRate,
    averageInvoiceValue,
    recentInvoices,
  } = useMemo(() => {
    let invoiced = 0;
    let collected = 0;
    let outstanding = 0;
    let overdue = 0;

    const counts: Record<InvoiceStatus, number> = {
      paid: 0,
      pending: 0,
      overdue: 0,
      draft: 0,
    };

    const values: Record<InvoiceStatus, number> = {
      paid: 0,
      pending: 0,
      overdue: 0,
      draft: 0,
    };

    // Client earnings accumulator
    const clientEarnings: Record<string, { name: string; total: number; count: number; paid: number }> = {};

    // Monthly earnings accumulator (keyed by YYYY-MM)
    const monthsMap: Record<string, { month: string; invoiced: number; collected: number; count: number }> = {};

    // Generate last 6-8 months keys so chart always has proper timeline
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = d.toLocaleString('en-US', { month: 'short' });
      monthsMap[key] = { month: monthLabel, invoiced: 0, collected: 0, count: 0 };
    }

    invoices.forEach((inv) => {
      const sum = calculateInvoiceSummary(inv);
      const grandTotal = sum.grandTotal;
      const paid = inv.status === 'paid' ? grandTotal : (inv.amountPaid || 0);
      const balance = Math.max(0, grandTotal - paid);

      invoiced += grandTotal;
      collected += paid;

      // Status count & value
      const status = inv.status || 'draft';
      counts[status] = (counts[status] || 0) + 1;
      values[status] = (values[status] || 0) + grandTotal;

      if (status === 'overdue') {
        overdue += balance || grandTotal;
      }
      if (status === 'pending' || status === 'overdue') {
        outstanding += balance;
      }

      // Client aggregation
      const clientName = inv.client.companyName || inv.client.name || 'Unnamed Client';
      if (!clientEarnings[clientName]) {
        clientEarnings[clientName] = { name: clientName, total: 0, count: 0, paid: 0 };
      }
      clientEarnings[clientName].total += grandTotal;
      clientEarnings[clientName].count += 1;
      clientEarnings[clientName].paid += paid;

      // Monthly aggregation
      const dateStr = inv.issueDate || inv.createdAt;
      if (dateStr) {
        const d = new Date(dateStr);
        if (!isNaN(d.getTime())) {
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
          const monthLabel = d.toLocaleString('en-US', { month: 'short' });
          if (!monthsMap[key]) {
            monthsMap[key] = { month: monthLabel, invoiced: 0, collected: 0, count: 0 };
          }
          monthsMap[key].invoiced += grandTotal;
          monthsMap[key].collected += paid;
          monthsMap[key].count += 1;
        }
      }
    });

    // Convert monthly map to sorted array
    const sortedMonths = Object.keys(monthsMap)
      .sort()
      .map((key) => ({
        key,
        month: monthsMap[key].month,
        invoiced: Math.round(monthsMap[key].invoiced),
        collected: Math.round(monthsMap[key].collected),
        count: monthsMap[key].count,
      }));

    // Convert clients to top array
    const topClients = Object.values(clientEarnings)
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    // Recent 5 invoices sorted by date
    const sortedRecent = [...invoices].sort((a, b) => {
      const da = new Date(a.issueDate || a.createdAt).getTime();
      const db = new Date(b.issueDate || b.createdAt).getTime();
      return db - da;
    }).slice(0, 5);

    const rate = invoiced > 0 ? Math.round((collected / invoiced) * 100) : 0;
    const avg = invoices.length > 0 ? invoiced / invoices.length : 0;

    return {
      totalInvoiced: invoiced,
      totalCollected: collected,
      totalOutstanding: outstanding,
      totalOverdue: overdue,
      statusCounts: counts,
      statusValues: values,
      monthlyData: sortedMonths,
      clientData: topClients,
      collectionRate: rate,
      averageInvoiceValue: avg,
      recentInvoices: sortedRecent,
    };
  }, [invoices]);

  // Donut chart status data
  const statusPieData = useMemo(() => [
    { name: 'Paid', value: statusCounts.paid, amount: statusValues.paid, color: '#10b981' },
    { name: 'Pending', value: statusCounts.pending, amount: statusValues.pending, color: '#f59e0b' },
    { name: 'Overdue', value: statusCounts.overdue, amount: statusValues.overdue, color: '#ef4444' },
    { name: 'Draft', value: statusCounts.draft, amount: statusValues.draft, color: '#64748b' },
  ].filter((item) => item.value > 0), [statusCounts, statusValues]);

  // Quick export CSV
  const handleExportCSV = () => {
    const headers = ['Invoice #', 'Client', 'Issue Date', 'Due Date', 'Status', 'Grand Total', 'Amount Paid', 'Balance Due'];
    const rows = invoices.map((inv) => {
      const sum = calculateInvoiceSummary(inv);
      return [
        `"${inv.invoiceNumber}"`,
        `"${inv.client.name || inv.client.companyName}"`,
        `"${inv.issueDate}"`,
        `"${inv.dueDate}"`,
        `"${inv.status}"`,
        sum.grandTotal.toFixed(2),
        (inv.amountPaid || 0).toFixed(2),
        sum.balanceDue.toFixed(2),
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Invoice_Performance_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Custom tooltips for clean Tailwind styling
  const CustomMonthlyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg border border-slate-800 text-xs space-y-1">
          <p className="font-bold text-slate-200 border-b border-slate-700 pb-1">{label}</p>
          <div className="flex items-center justify-between gap-4 text-emerald-400">
            <span>Collected:</span>
            <span className="font-semibold">{formatCurrency(payload[0]?.value || 0, DEFAULT_CURRENCY)}</span>
          </div>
          {payload[1] && (
            <div className="flex items-center justify-between gap-4 text-blue-400">
              <span>Invoiced:</span>
              <span className="font-semibold">{formatCurrency(payload[1]?.value || 0, DEFAULT_CURRENCY)}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg border border-slate-800 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold" style={{ color: data.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: data.color }} />
            <span>{data.name}</span>
          </div>
          <p className="text-slate-300">
            Count: <span className="font-bold text-white">{data.value} {data.value === 1 ? 'invoice' : 'invoices'}</span>
          </p>
          <p className="text-slate-300">
            Total Value: <span className="font-bold text-white">{formatCurrency(data.amount, DEFAULT_CURRENCY)}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-8 pb-16">
      
      {/* Top Header & Fast Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Business Performance Dashboard
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Live Analytics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time visual tracking of monthly earnings, cash collections, and invoice fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onNewInvoice}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* 4 Key Performance Indicators (KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Invoiced Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Invoiced</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {formatCurrency(totalInvoiced, DEFAULT_CURRENCY)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="font-semibold text-slate-700">{invoices.length}</span> total invoices issued
          </div>
        </div>

        {/* KPI 2: Total Collected Cash */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Cash Collected</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">
            {formatCurrency(totalCollected, DEFAULT_CURRENCY)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{collectionRate}% collection rate</span>
          </div>
        </div>

        {/* KPI 3: Outstanding Receivables */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Pending Receivables</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-amber-600">
            {formatCurrency(totalOutstanding, DEFAULT_CURRENCY)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <span className="font-semibold text-amber-700">{statusCounts.pending}</span> pending payment
          </div>
        </div>

        {/* KPI 4: Overdue Balance */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Overdue Amount</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-rose-600">
            {formatCurrency(totalOverdue, DEFAULT_CURRENCY)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-rose-700 font-medium">
            <span>{statusCounts.overdue} {statusCounts.overdue === 1 ? 'invoice' : 'invoices'} overdue</span>
          </div>
        </div>

      </div>

      {/* Main Charts Section (2 Columns: Monthly Trend + Status Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART 1: Monthly Invoiced vs Collected (8 Columns) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                Monthly Revenue & Collections
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of invoiced billings vs actual collected earnings per month
              </p>
            </div>

            {/* Toggle Bar / Area chart view */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
              <button
                type="button"
                onClick={() => setChartType('bar')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  chartType === 'bar' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Bar Chart
              </button>
              <button
                type="button"
                onClick={() => setChartType('area')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  chartType === 'area' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Trend Area
              </button>
            </div>
          </div>

          {/* Recharts Monthly Visualization */}
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    axisLine={{ stroke: '#e2e8f0' }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <Tooltip content={<CustomMonthlyTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }} 
                  />
                  <Bar 
                    name="Collected Cash" 
                    dataKey="collected" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={36} 
                  />
                  <Bar 
                    name="Invoiced Total" 
                    dataKey="invoiced" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    maxBarSize={36} 
                  />
                </BarChart>
              ) : (
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorInvoiced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    axisLine={{ stroke: '#e2e8f0' }} 
                    tickLine={false} 
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 11 }} 
                    axisLine={false} 
                    tickLine={false} 
                    tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                  />
                  <Tooltip content={<CustomMonthlyTooltip />} />
                  <Legend 
                    verticalAlign="top" 
                    align="right" 
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '12px', fontSize: '12px' }} 
                  />
                  <Area 
                    type="monotone" 
                    name="Collected Cash" 
                    dataKey="collected" 
                    stroke="#10b981" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorCollected)" 
                  />
                  <Area 
                    type="monotone" 
                    name="Invoiced Total" 
                    dataKey="invoiced" 
                    stroke="#3b82f6" 
                    strokeWidth={2.5}
                    fillOpacity={1} 
                    fill="url(#colorInvoiced)" 
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Invoice Status Counts Donut Chart (4 Columns) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-1">
              <PieIcon className="w-4 h-4 text-emerald-600" />
              Invoice Status Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of invoices by current fulfillment stage
            </p>
          </div>

          {/* Recharts Pie / Donut Chart */}
          <div className="h-52 w-full relative flex items-center justify-center">
            {statusPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-xs text-slate-400">
                No invoices found to display status.
              </div>
            )}
            
            {/* Center Summary Inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">{invoices.length}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Invoices</span>
            </div>
          </div>

          {/* Status Breakdown Legend List */}
          <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-semibold">Paid</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{statusCounts.paid}</span>
                <span className="text-slate-400">({formatCurrency(statusValues.paid, DEFAULT_CURRENCY)})</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-semibold">Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{statusCounts.pending}</span>
                <span className="text-slate-400">({formatCurrency(statusValues.pending, DEFAULT_CURRENCY)})</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="font-semibold">Overdue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{statusCounts.overdue}</span>
                <span className="text-slate-400">({formatCurrency(statusValues.overdue, DEFAULT_CURRENCY)})</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="font-semibold">Draft</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{statusCounts.draft}</span>
                <span className="text-slate-400">({formatCurrency(statusValues.draft, DEFAULT_CURRENCY)})</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Section: Top Clients & Recent Invoices List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Clients by Billings */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Top Clients by Billings
              </h3>
              <p className="text-xs text-slate-500">
                Highest contributing client accounts
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Ranked</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {clientData.map((client, idx) => {
              const share = totalInvoiced > 0 ? (client.total / totalInvoiced) * 100 : 0;
              return (
                <div key={client.name || idx} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 truncate max-w-[200px]">
                      {idx + 1}. {client.name}
                    </span>
                    <span className="font-extrabold text-slate-900">
                      {formatCurrency(client.total, DEFAULT_CURRENCY)}
                    </span>
                  </div>
                  
                  {/* Progress bar visual */}
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden flex">
                    <div 
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, share))}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{client.count} {client.count === 1 ? 'invoice' : 'invoices'}</span>
                    <span>{share.toFixed(1)}% of total billings</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Invoices Quick Table */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recent Invoices
              </h3>
              <p className="text-xs text-slate-500">
                Quick view of latest generated invoices
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateHistory}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View All History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 pt-1">
            {recentInvoices.map((inv) => {
              const sum = calculateInvoiceSummary(inv);
              const statusColors: Record<InvoiceStatus, string> = {
                paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                pending: 'bg-amber-50 text-amber-700 border-amber-200',
                overdue: 'bg-rose-50 text-rose-700 border-rose-200',
                draft: 'bg-slate-100 text-slate-700 border-slate-200',
              };

              return (
                <div
                  key={inv.id}
                  onClick={() => onSelectInvoice(inv)}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all cursor-pointer group text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 text-slate-500 flex items-center justify-center transition-colors font-bold text-xs">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-2">
                        <span>{inv.invoiceNumber}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusColors[inv.status]}`}>
                          {inv.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] truncate max-w-[180px] sm:max-w-xs">
                        {inv.client.companyName || inv.client.name} • {inv.issueDate}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">
                      {formatCurrency(sum.grandTotal, inv.currency || DEFAULT_CURRENCY)}
                    </div>
                    <span className="text-[11px] text-blue-600 group-hover:underline">
                      Edit invoice →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
