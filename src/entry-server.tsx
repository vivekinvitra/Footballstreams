import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { SSRDataProvider } from './contexts/SSRDataContext';
import { fetchDataForUrl } from './ssr/fetchDataForUrl';
import { HeadProvider } from './contexts/HeadContext';

export async function render(url: string) {
  const data = await fetchDataForUrl(url);
  const collector: string[] = [];

  const appHtml = renderToString(
    <HeadProvider collector={collector}>
      <SSRDataProvider data={data}>
        <MemoryRouter initialEntries={[url]}>
          <App />
        </MemoryRouter>
      </SSRDataProvider>
    </HeadProvider>
  );

  const head = collector.join('');

  return { html: appHtml, data, head };
}

export default render;