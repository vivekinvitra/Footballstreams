import React, { useEffect } from 'react';
import { useHead } from '../contexts/HeadContext';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const DEFAULT_TITLE = 'Football Streams - Live Scores & Fixtures';
const DEFAULT_DESCRIPTION = 'Live football scores, fixtures, predictions and match analysis for leagues worldwide.';
const DEFAULT_KEYWORDS = 'football, live, scores, fixtures, predictions, leagues';

function escapeHtml(s?: string) {
  if (!s) return '';
  return String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const { add } = useHead();
  const pageTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;

  const titleTag = `<title>${escapeHtml(pageTitle)}</title>`;
  const metaDesc = `<meta name="description" content="${escapeHtml(description || DEFAULT_DESCRIPTION)}">`;
  const metaKeys = `<meta name="keywords" content="${escapeHtml(keywords || DEFAULT_KEYWORDS)}">`;
  const ogTitle = `<meta property="og:title" content="${escapeHtml(pageTitle)}">`;
  const ogDesc = `<meta property="og:description" content="${escapeHtml(description || DEFAULT_DESCRIPTION)}">`;

  const headString = `${titleTag}${metaDesc}${metaKeys}${ogTitle}${ogDesc}`;

  if (typeof window === 'undefined') {
    // server: collect synchronously
    add(headString);
    return null;
  }

  // client: apply in effect to avoid SSR mismatch
  useEffect(() => {
    add(headString);
  }, [title, description, keywords]);

  return null;
};

export default SEO;
