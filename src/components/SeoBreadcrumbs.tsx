import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface SeoBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const SeoBreadcrumbs: React.FC<SeoBreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs font-medium text-slate-500 py-2.5 px-3 bg-white/80 backdrop-blur rounded-lg border border-slate-200/80 mb-6 shadow-xs ${className}`}
    >
      <ol className="flex items-center space-x-2 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
        <li className="flex items-center" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (items[0]?.onClick) items[0].onClick();
              else {
                window.location.hash = '';
              }
            }}
            className="flex items-center gap-1 text-slate-600 hover:text-blue-600 transition-colors"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5" />
            <span itemProp="name">Home</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1 || item.current;

          return (
            <li
              key={index}
              className="flex items-center space-x-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              {isLast ? (
                <span
                  className="text-slate-900 font-semibold truncate max-w-[280px] sm:max-w-md"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  className="text-slate-600 hover:text-blue-600 transition-colors truncate max-w-[200px]"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </a>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
