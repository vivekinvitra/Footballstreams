import { render } from '../src/entry-server';

function safeSerialize(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

async function getIndexHtml(context) {
  const res = await context.env.ASSETS.fetch(
    new Request('http://internal/index.html')
  );

  if (!res.ok) {
    throw new Error('Failed to fetch index.html from ASSETS');
  }

  return res.text();
}

export async function onRequest(context) {
  const { request } = context;
  const pathname = new URL(request.url).pathname;

  // Bypass static assets
  if (
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    return context.env.ASSETS.fetch(request);
  }

  try {
    const { html, data, head } = await render(request.url);
    let page = await getIndexHtml(context);

    page = page.replace('<!--ssr-outlet-->', html);
    page = page.replace(
      '</head>',
      `${head || ''}<script>window.__SSR_DATA__=${safeSerialize(data)}</script></head>`
    );

    return new Response(page, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  } catch (err) {
    console.error('SSR error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}