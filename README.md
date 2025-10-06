# Crypto Dashboard (Next.js + Redux Toolkit + WebSocket)

A practical dashboard showing top cryptocurrencies (CoinGecko) with SSR, favorites, search/sort, and a real-time feed (Finnhub WebSocket).

## Features
- Next.js Pages Router with SSR via `getServerSideProps` on `pages/index.js` and `pages/coin/[id].js`.
- Redux Toolkit: `coinsSlice`, `favoritesSlice`, `wsSlice`, and `wsMiddleware`.
- TailwindCSS for UI.
- 7-day price chart with `react-chartjs-2`.
- Finnhub WebSocket modal with selectable symbol.

## Quick Start
1. Copy `.env.example` to `.env.local` and set:
```
NEXT_PUBLIC_FINNHUB_TOKEN=YOUR_TOKEN
```
2. Install dependencies:
```
npm install
```
3. Run dev server:
```
npm run dev
```
4. Open http://localhost:3000

## Deploy to Netlify

### Method 1: Netlify CLI (Recommended)
1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy from project directory:
```bash
netlify deploy --prod
```

### Method 2: Netlify Dashboard
1. Push code to GitHub/GitLab/Bitbucket
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Add environment variable:
   - Key: `NEXT_PUBLIC_FINNHUB_TOKEN`
   - Value: Your Finnhub API token
7. Click "Deploy site"

### Method 3: Drag & Drop (Quick Test)
1. Build locally:
```bash
npm run build
```
2. Go to https://app.netlify.com/drop
3. Drag the `.next` folder

## Share Project

### Create ZIP file (Windows PowerShell):
```powershell
Compress-Archive -Path * -DestinationPath crypto-dashboard.zip -Force
```

Or exclude node_modules (recommended):
```powershell
$exclude = @('node_modules', '.next', 'out', '.git')
Get-ChildItem -Path . -Exclude $exclude | Compress-Archive -DestinationPath crypto-dashboard.zip -Force
```

## Notes
- CoinGecko APIs are public but rate-limited; avoid excessive refresh.
- Finnhub requires an API token. Get one at https://finnhub.io
- Favorites stored in `localStorage`.

## Structure
- `pages/` SSR pages
- `store/` Redux store and slices
- `components/` UI components
- `lib/` API helpers
- `styles/` Tailwind CSS

## Possible Improvements
- Pagination/infinite scroll
- Memoization optimizations (React.memo, useMemo, useCallback)
- Persist Redux state with middleware or redux-persist
