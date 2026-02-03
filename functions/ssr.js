// Lazy-load server renderer to avoid startup failure if `dist/server/entry-server.js` isn't available at bundle time.
let _render;
async function getRender() {
  if (!_render) {
    try {
      const mod = await import('../src/entry-server.js');
      _render = mod.render || mod.default;
    } catch (err) {
      console.error('Failed to import SSR bundle', err);
      throw err;
    }
  }
  return _render;
}

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
    let renderer;
    try {
      renderer = await getRender();
    } catch (err) {
      console.error('SSR import error', err);
      return new Response('Internal Server Error', { status: 500 });
    }
    const { html, data, head } = await renderer(request.url);
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