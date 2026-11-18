# Rayyan Portfolio

## Portfolio AI chat

The chat widget uses Google's Gemini Developer API through a server-side
function. The portfolio is exported as a static site for GitHub Pages, so the
API key must only be stored on the backend; never put `GEMINI_API_KEY` in a
`NEXT_PUBLIC_` variable or in browser code.

### Free-tier setup

1. Create a Gemini API key in [Google AI Studio](https://aistudio.google.com/apikey).
   Gemini offers a limited free tier for eligible models; check the current
   [pricing and limits](https://ai.google.dev/gemini-api/docs/pricing), which
   can change. Google may use free-tier inputs and outputs to improve its
   products, so this chatbot is intentionally limited to public portfolio
   information. Do not send private information to it.
2. Import this repository into [Vercel](https://vercel.com/new). Vercel detects
   the root `api/chat.ts` as a serverless function. Add these server-side
   environment variables in the Vercel project settings:
   - `GEMINI_API_KEY`: the key from Google AI Studio.
   - `PORTFOLIO_ORIGIN`: `https://raycoupdegrace.github.io` (the site origin,
     without the repository path).
3. Deploy the Vercel project and copy its function URL, ending in `/api/chat`.
4. Before building the GitHub Pages export, set the public endpoint URL. For
   example, in PowerShell:

   ```powershell
   $env:NEXT_PUBLIC_CHAT_API_URL = "https://your-vercel-project.vercel.app/api/chat"
   npm run build
   ```

   Publish the resulting `out` folder to the portfolio's `gh-pages` branch.
   `NEXT_PUBLIC_CHAT_API_URL` is a public URL, not a secret. The widget shows a
   setup notice until this endpoint is included in the static build.

The API limits each message to 800 characters and allows up to eight messages
per conversation. It also applies a best-effort per-instance request limit;
for a larger public launch, use a persistent rate limiter and review provider
quotas.
