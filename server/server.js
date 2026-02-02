import express from 'express';
import fs from 'fs';
import path from 'path';

let render;
try {
  // load the compiled server bundle from dist/server
  const mod = await import('../dist/server/entry-server.js');
  render = mod.render || mod.default;
} catch (err) {
  console.error('Compiled SSR bundle not found. Run `npm run build:ssr` before `npm run dev:ssr`.');
  throw err;
}

const app = express();
const port = process.env.PORT || 3002;

const templatePath = path.resolve(process.cwd(), 'dist', 'index.html');
if (!fs.existsSync(templatePath)) {
  throw new Error('dist/index.html not found. Run `npm run build` before `npm run dev:ssr`.');
}
const template = fs.readFileSync(templatePath, 'utf-8');

// Serve only static assets (JS/CSS/images) from the dist build so SSR handler can process HTML routes
app.use('/assets', express.static(path.resolve(process.cwd(), 'dist', 'assets')));
app.use('/img', express.static(path.resolve(process.cwd(), 'assets', 'img')));

app.get('*', async (req, res) => {
  try {
    const { html, data, head } = await render(req.url);
    console.log('[SSR] route=', req.url, ' headLength=', (head || '').length);
    if (head && head.length > 0) console.log('[SSR] head sample:', head.slice(0, 200));
    let output = template.replace('<!--ssr-outlet-->', html);
    const initScript = `<script>window.__SSR_DATA__ = ${JSON.stringify(data).replace(/</g, '\\u003c')};</script>`;
    // Insert init script before the first module script so the client entry can read __SSR_DATA__ synchronously
    const moduleScriptIndex = output.indexOf('<script type="module"');
    if (moduleScriptIndex !== -1) {
      output = output.slice(0, moduleScriptIndex) + initScript + '\n' + output.slice(moduleScriptIndex);
    } else if (output.indexOf('</head>') !== -1) {
      output = output.replace('</head>', initScript + '\n</head>');
    } else {
      output = output.replace('</body>', `${initScript}</body>`);
    }

    // Insert server rendered head tags if provided
    if (head) {
      if (output.indexOf('<!--ssr-head-->') !== -1) {
        output = output.replace('<!--ssr-head-->', head);
      } else if (output.indexOf('</head>') !== -1) {
        output = output.replace('</head>', head + '\n</head>');
      }
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(output);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => console.log(`SSR dev server running: http://localhost:${port}`));