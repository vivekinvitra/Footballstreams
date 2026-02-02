import { render } from '../src/entry-server';
import indexHtml from '../index.html?raw';

// Simple serializer that prevents closing </script> injection
function safeSerialize(obj) {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}

export async function onRequest(context) {
  const url = context.request.url;
  try {
    const { html, data } = await render(url);

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

    return new Response(output, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  } catch (err) {
    console.error('SSR function error', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export default { onRequest };