import { Article } from '../data/articles';

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogType?: 'website' | 'article';
  articleData?: Article;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function updatePageSeo(options: SeoOptions) {
  // 1. Update Document Title
  document.title = options.title;

  // 2. Update Meta Description
  updateMetaTag('name', 'description', options.description);
  updateMetaTag('property', 'og:description', options.description);
  updateMetaTag('property', 'twitter:description', options.description);

  // 3. Update Meta Title
  updateMetaTag('name', 'title', options.title);
  updateMetaTag('property', 'og:title', options.title);
  updateMetaTag('property', 'twitter:title', options.title);

  // 4. Update Meta Keywords
  if (options.keywords) {
    updateMetaTag('name', 'keywords', options.keywords);
  }

  // 5. Update Canonical & OpenGraph URL
  updateMetaTag('property', 'og:url', options.canonicalUrl);
  updateMetaTag('property', 'twitter:url', options.canonicalUrl);
  updateMetaTag('property', 'og:type', options.ogType || 'website');

  let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', options.canonicalUrl);

  // 6. Update Dynamic JSON-LD Structured Data
  updateDynamicStructuredData(options);
}

function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateDynamicStructuredData(options: SeoOptions) {
  const existingScript = document.getElementById('dynamic-seo-ld');
  if (existingScript) {
    existingScript.remove();
  }

  const scriptsToInject: any[] = [];

  // Breadcrumbs Schema
  if (options.breadcrumbs && options.breadcrumbs.length > 0) {
    scriptsToInject.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: options.breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `https://invoicesforfree.com${item.url}`,
      })),
    });
  }

  // Article Schema
  if (options.articleData) {
    const article = options.articleData;
    scriptsToInject.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      image: 'https://invoicesforfree.com/favicon.ico',
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'InvoicesForFree',
        url: 'https://invoicesforfree.com/',
        logo: {
          '@type': 'ImageObject',
          url: 'https://invoicesforfree.com/favicon.ico',
        },
      },
      datePublished: article.publishDate,
      dateModified: article.updatedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': options.canonicalUrl,
      },
    });
  }

  if (scriptsToInject.length > 0) {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.id = 'dynamic-seo-ld';
    scriptTag.text = JSON.stringify(scriptsToInject.length === 1 ? scriptsToInject[0] : scriptsToInject);
    document.head.appendChild(scriptTag);
  }
}
