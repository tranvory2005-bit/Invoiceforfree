import React from 'react';
import { Article } from '../data/articles';
import { GoogleAd } from './GoogleAd';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Share2, 
  Sparkles,
  FileText,
  ChevronRight
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onOpenEditor: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  onOpenEditor
}) => {
  const handleScrollTo = (anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.subtitle,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto pb-20">
      {/* Top Breadcrumb & Navigation */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Invoicing Guides & Articles</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Guide</span>
          </button>
          
          <button
            onClick={onOpenEditor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open Invoice Generator</span>
          </button>
        </div>
      </div>

      {/* Article Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-4 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{article.category}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6">
          {article.subtitle}
        </p>

        {/* Metadata & Author Card */}
        <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {article.author.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{article.author.name}</div>
              <div className="text-xs text-slate-500">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6 w-full sm:w-auto">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published {new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary Box */}
      <div className="mb-8 p-5 rounded-xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-100 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Executive Summary & Takeaway</span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed font-medium">
          {article.summary}
        </p>
      </div>

      {/* Table of Contents */}
      <div className="mb-10 p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-slate-500" />
          <span>Table of Contents</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {article.tableOfContents.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScrollTo(item.anchor)}
              className="text-left text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 py-1 px-2 rounded hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{item.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Editorial Content Body */}
      <div className="space-y-10 text-slate-800 leading-relaxed text-base">
        {article.sections.map((section, idx) => (
          <section key={idx} id={section.anchor} className="scroll-mt-24 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight border-b border-slate-100 pb-2">
              {section.heading}
            </h2>

            {section.content.map((paragraph, pIdx) => (
              <p key={pIdx} className="text-slate-700 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Custom Callout Box */}
            {section.callout && (
              <div className={`p-4 rounded-xl border my-4 ${
                section.callout.type === 'tip' 
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
                  : section.callout.type === 'warning'
                  ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                  : 'bg-blue-50/70 border-blue-200 text-blue-950'
              }`}>
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-1">
                  {section.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-emerald-600" />}
                  {section.callout.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-600" />}
                  {section.callout.type === 'info' && <BookOpen className="w-4 h-4 text-blue-600" />}
                  <span>{section.callout.title}</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {section.callout.text}
                </p>
              </div>
            )}

            {/* Checklist */}
            {section.checklist && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Actionable Checklist:
                </div>
                {section.checklist.map((item, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* AdSense Placement Inside Editorial Content */}
      <div className="mt-12 pt-6 border-t border-slate-200">
        <GoogleAd 
          client="ca-pub-2875537731587160"
          slot="2802725446"
          label="Advertisement" 
        />
      </div>

      {/* Action Footer Call to Action */}
      <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center shadow-lg">
        <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
          Ready to Create Your Professional Invoice?
        </h3>
        <p className="text-blue-100 text-sm max-w-xl mx-auto mb-6">
          Use our 100% free online invoice generator. No sign-up, no subscriptions, and zero watermarks.
        </p>
        <button
          onClick={onOpenEditor}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm hover:bg-blue-50 transition-all shadow-md cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Launch Free Invoice Maker Now</span>
        </button>
      </div>
    </article>
  );
};
