# Setup Instructions - Fix Coin Data Display

## Problem
The crypto dashboard is not showing coin data because CoinGecko API now requires an API key.

## Solution

### Step 1: Get a CoinGecko API Key
1. Visit https://www.coingecko.com/en/api
2. Sign up for a free account
3. Get your **Demo API Key** (free tier)

### Step 2: Add API Key to Environment Variables
1. Open the `.env.local` file in the project root (create it if it doesn't exist)
2. Add your CoinGecko API key:
```
COINGECKO_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_FINNHUB_TOKEN=your_finnhub_token_here
```

### Step 3: Restart the Development Server
1. Stop the current dev server (Ctrl+C)
2. Run: `npm run dev`
3. Open http://localhost:3000

## What Was Fixed

### 1. API Library (`lib/coingecko.js`)
- Added support for CoinGecko API key via environment variable
- Added proper error handling and logging
- Added request caching to reduce API calls

### 2. Home Page (`pages/index.js`)
- Added error display when API fails
- Shows helpful message with link to get API key
- Handles empty coin data gracefully

### 3. Coin Table Component (`components/CoinTable.js`)
- Added check for empty data
- Shows "No coin data available" message when appropriate

### 4. Documentation
- Updated README.md with API key requirements
- Updated .env.example with COINGECKO_API_KEY

## Testing
After adding the API key and restarting:
1. You should see the list of top 50 cryptocurrencies
2. If there's still an error, check the browser console for details
3. Verify your API key is correct in `.env.local`

## Alternative: Test Without API Key
If you want to test the UI without getting an API key immediately, you can temporarily add mock data in `pages/index.js` by modifying the `getServerSideProps` function to return sample data.

## Need Help?
- CoinGecko API Docs: https://docs.coingecko.com/reference/introduction
- Check browser console (F12) for detailed error messages
- Verify `.env.local` file is in the project root directory
