export async function fetchTopCoinsSSR() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h'
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch coins')
  return res.json()
}

export async function fetchCoinAndChartSSR(id) {
  const [detailRes, chartRes] = await Promise.all([
    fetch(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`),
    fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
  ])
  if (!detailRes.ok) throw new Error('Failed to fetch coin detail')
  if (!chartRes.ok) throw new Error('Failed to fetch chart')
  return { detail: await detailRes.json(), chart: await chartRes.json() }
}
