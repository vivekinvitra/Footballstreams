import { render } from '../dist/server/entry-server.js';

// Don't import index.html at build time — esbuild in Pages doesn't support the `?raw` loader.
// Instead fetch the site's index.html at runtime from the request origin.
async function getIndexHtml(request) {
  const origin = new URL(request.url).origin;
  const res = await fetch(`${origin}/index.html`);
  if (!res.ok) throw new Error(`Failed to fetch index.html: ${res.status}`);
  return await res.text();
}

// Simple serializer that prevents closing </script> injection
function safeSerialize(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export async function onRequest(context) {
  const url = context.request.url;
  try {
    const { html, data, head } = await render(url);

    const indexHtml = await getIndexHtml(context.request);
    let output = indexHtml.replace('<!--ssr-outlet-->', html);

    // Inject initial data for hydration
    const initScript = `<script>window.__SSR_DATA__ = ${safeSerialize(data)};</script>`;
    const moduleScriptIndex = output.indexOf('<script type="module"');
    if (moduleScriptIndex !== -1) {
      output = output.slice(0, moduleScriptIndex) + initScript + '\n' + output.slice(moduleScriptIndex);
    } else if (output.indexOf('</head>') !== -1) {
      output = output.replace('</head>', initScript + '\n</head>');
    } else {
      output = output.replace('</body>', `${initScript}</body>`);
    }

    // Inject server-rendered head if available
    if (head) {
      if (output.indexOf('<!--ssr-head-->') !== -1) {
        output = output.replace('<!--ssr-head-->', head);
      } else if (output.indexOf('</head>') !== -1) {
        output = output.replace('</head>', head + '\n</head>');
      }
    }

    return new Response(output, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  } catch (err) {
    console.error('SSR function error', err && err.stack ? err.stack : err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export default { onRequest };