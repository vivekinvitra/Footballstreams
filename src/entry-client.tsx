import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { SSRDataProvider } from './contexts/SSRDataContext';
import { HeadProvider } from './contexts/HeadContext';
import './index.css';

const ssrData = (window as any).__SSR_DATA__ || null;

hydrateRoot(document.getElementById('root') as HTMLElement, (
  <React.StrictMode>
    <HeadProvider>
      <SSRDataProvider data={ssrData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SSRDataProvider>
    </HeadProvider>
  </React.StrictMode>
));
