export async function fetchTopCoinsSSR() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
  
  const headers = {}
  if (process.env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY
  }
  
  const res = await fetch(url, { 
    headers,
    next: { revalidate: 60 } // Cache for 60 seconds
  })
  
  if (!res.ok) {
    const errorText = await res.text()
    console.error('CoinGecko API Error:', res.status, errorText)
    throw new Error(`Failed to fetch coins: ${res.status} ${res.statusText}`)
  }
  
  return res.json()
}

export async function fetchCoinAndChartSSR(id) {
  const headers = {}
  if (process.env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY
  }
  
  const [detailRes, chartRes] = await Promise.all([
    fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`, { headers }),
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`, { headers })
  ])
  
  if (!detailRes.ok) {
    const errorText = await detailRes.text()
    console.error('CoinGecko Detail API Error:', detailRes.status, errorText)
    throw new Error(`Failed to fetch coin detail: ${detailRes.status}`)
  }
  
  if (!chartRes.ok) {
    const errorText = await chartRes.text()
    console.error('CoinGecko Chart API Error:', chartRes.status, errorText)
    throw new Error(`Failed to fetch chart: ${chartRes.status}`)
  }
  
  return { detail: await detailRes.json(), chart: await chartRes.json() }
}
