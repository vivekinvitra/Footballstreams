<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1oemSNtwpfLTouQDy7qsadD8xjHvY-dMG

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## SSR & Cloudflare Pages

This repo now includes a minimal SSR setup and a Pages Function to serve SSR HTML on Cloudflare Pages.

Local testing (quick):

1. Install deps: `npm install`
2. Build client + server bundles: `npm run build:ssr`
3. Start the local SSR server: `npm run dev:ssr` (the server prefers `dist/server/entry-server.js` if present)
4. Visit `http://localhost:3002` to see server-rendered HTML.

Cloudflare Pages deployment notes:

- The `functions/[[path]].js` function handles all routes and uses `src/entry-server.tsx` to render the HTML. Cloudflare Pages will bundle source when deploying.
- If you prefer to use `vite-plugin-ssr` or a specific Cloudflare adapter, we can add it and adapt the process.

If you'd like, I can run a local SSR build and validate the output, then prepare a `wrangler.toml` or Pages build config for deployment.
