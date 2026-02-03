import { render } from '../src/entry-server';

console.log("SSR FUNCTION LOADED");

async function getIndexHtml(request) {
  const origin = new URL(request.url).origin;
  const res = await fetch(`${origin}/index.html`);
  if (!res.ok) throw new Error(`Failed to fetch index.html`);
  return res.text();
}

function safeSerialize(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export async function onRequest(context) {
  const { request } = context;
  const pathname = new URL(request.url).pathname;

  if (
    pathname === '/index.html' ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return fetch(request);
  }

  try {
    const { html, data, head } = await render(request.url);
    let page = await getIndexHtml(request);

    page = page.replace('<!--ssr-outlet-->', html);
    page = page.replace(
      '</head>',
      `${head}<script>window.__SSR_DATA__=${safeSerialize(data)}</script></head>`
    );

    return new Response(page, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  } catch (e) {
    console.error(e);
    return new Response('Internal Server Error', { status: 500 });
  }
}