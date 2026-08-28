import React, { useState } from 'react';
import { Article, ARTICLES_DATA } from '../data/articles';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  TrendingUp,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { GoogleAd } from './GoogleAd';
import { SeoBreadcrumbs } from './SeoBreadcrumbs';

interface ArticleListProps {
  onSelectArticle: (slug: string) => void;
  onOpenEditor: () => void;
}

export const ArticleList: React.FC<ArticleListProps> = ({
  onSelectArticle,
  onOpenEditor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Billing Fundamentals', 'Tax & Compliance', 'Cashflow & Finance', 'Industry Guides'];

  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Semantic Breadcrumbs */}
      <div className="mb-6">
        <SeoBreadcrumbs
          items={[
            { name: 'Guides & Knowledge Hub', url: '#guides' },
          ]}
          onNavigate={(url) => {
            if (url === '#editor') {
              onOpenEditor();
            }
          }}
        />
      </div>
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-4 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Invoicing Knowledge Library & Editorial Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Master Business Invoicing, Global Taxes & Client Billing
        </h1>
        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
          In-depth guides, legal compliance blueprints, and payment strategies authored by accounting experts to help freelancers, contractors, and small business owners get paid faster.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides (e.g. VAT, Net 30, freelance contract, sales tax)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-sm shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Article Card */}
      {selectedCategory === 'All' && searchQuery === '' && (
        <div 
          onClick={() => onSelectArticle(ARTICLES_DATA[0].slug)}
          className="mb-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-lg cursor-pointer hover:shadow-xl transition-all group"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              Featured Pillar Guide
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {ARTICLES_DATA[0].readTime}</span>
              <span>•</span>
              <span>Updated {new Date(ARTICLES_DATA[0].updatedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 group-hover:text-blue-300 transition-colors">
            {ARTICLES_DATA[0].title}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 line-clamp-2 max-w-3xl">
            {ARTICLES_DATA[0].subtitle}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                {ARTICLES_DATA[0].author.avatar}
              </div>
              <span className="text-xs text-slate-300 font-medium">{ARTICLES_DATA[0].author.name}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Read Full Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      )}

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article.slug)}
            className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {article.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.readTime}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6">
                {article.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                By {article.author.name}
              </div>
              <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Educational AdSense Placement */}
      <div className="mb-16">
        <GoogleAd 
          client="ca-pub-2875537731587160"
          slot="2802725446"
          label="Advertisement" 
        />
      </div>

      {/* Trust & E-E-A-T Badges */}
      <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-xs mb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h3 className="text-lg font-extrabold text-slate-900 mb-1">
            Our Editorial Standards & Commitment
          </h3>
          <p className="text-xs text-slate-500">
            Every guide is authored, fact-checked, and updated regularly by finance practitioners to ensure accuracy across international jurisdictions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-1" />
            <div>
              <div className="text-xs font-bold text-slate-900 mb-0.5">Privacy First</div>
              <div className="text-xs text-slate-600">All invoice data generated remains on your device and is never stored on third-party servers.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
            <div>
              <div className="text-xs font-bold text-slate-900 mb-0.5">Global Tax Alignment</div>
              <div className="text-xs text-slate-600">Guides are reviewed against IRS (US), HMRC (UK), EU VAT Directives, and ATO (Australia) standards.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-1" />
            <div>
              <div className="text-xs font-bold text-slate-900 mb-0.5">100% Free Access</div>
              <div className="text-xs text-slate-600">All tools, invoice templates, and knowledge resources are free with no paywalls or sign-ups.</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA to Generator */}
      <div className="p-8 rounded-2xl bg-slate-900 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Ready to create your invoice?</h3>
        <p className="text-slate-300 text-xs max-w-md mx-auto mb-6">
          Put these principles into practice with our fast, free, and secure invoice maker.
        </p>
        <button
          onClick={onOpenEditor}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-md cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Launch Free Invoice Generator</span>
        </button>
      </div>

    </div>
  );
};
