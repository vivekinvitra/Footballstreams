import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { SSRDataProvider } from './contexts/SSRDataContext';
import { fetchDataForUrl } from './ssr/fetchDataForUrl';

export async function render(url: string) {
  const data = await fetchDataForUrl(url);

  const appHtml = renderToString(
    <SSRDataProvider data={data}>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </SSRDataProvider>
  );

  return { html: appHtml, data };
}

export default render;