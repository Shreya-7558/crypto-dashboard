import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hydrateList, setSearch, setSort } from '@/store/slices/coinsSlice'
import { toggleFavorite, setFavorites } from '@/store/slices/favoritesSlice'
import { fetchTopCoinsSSR } from '@/lib/coingecko'
import CoinTable from '@/components/CoinTable'
import SearchSortBar from '@/components/SearchSortBar'
import WebsocketPanel from '@/components/WebsocketPanel'

export async function getServerSideProps() {
  try {
    const coins = await fetchTopCoinsSSR()
    return { props: { coins } }
  } catch (e) {
    return { props: { coins: [], error: e.message || 'Failed to fetch' } }
  }
}

export default function Home({ coins, error }) {
  const dispatch = useDispatch()
  const { search, sort } = useSelector(s => s.coins)
  const favorites = useSelector(s => s.favorites.ids)

  useEffect(() => {
    // hydrate list from SSR
    dispatch(hydrateList(coins || []))
    // load favorites from localStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem('favorites') || '[]')
        dispatch(setFavorites(saved))
      } catch {}
    }
  }, [coins, dispatch])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    }
  }, [favorites])

  const list = useSelector(s => s.coins.list)

  const filteredSorted = useMemo(() => {
    let arr = Array.isArray(list) ? [...list] : []
    const q = (search || '').trim().toLowerCase()
    if (q) arr = arr.filter(c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q))
    const { key, dir } = sort || { key: 'market_cap', dir: 'desc' }
    arr.sort((a, b) => {
      const va = a[key] ?? 0
      const vb = b[key] ?? 0
      return dir === 'asc' ? va - vb : vb - va
    })
    return arr
  }, [list, search, sort])

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-4">Crypto Dashboard</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
          <p className="font-semibold">Error loading coin data:</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2">
            CoinGecko API may require an API key. Get one at{' '}
            <a href="https://www.coingecko.com/en/api" target="_blank" rel="noopener noreferrer" className="underline">
              coingecko.com/en/api
            </a>
            {' '}and add it to your .env.local file as COINGECKO_API_KEY
          </p>
        </div>
      )}

      <SearchSortBar
        search={search}
        onSearch={(v) => dispatch(setSearch(v))}
        sort={sort}
        onSort={(v) => dispatch(setSort(v))}
      />

      {filteredSorted.length === 0 && !error ? (
        <div className="text-center py-8 text-slate-500">
          No coins found. Try adjusting your search.
        </div>
      ) : (
        <CoinTable
          coins={filteredSorted}
          favorites={favorites}
          onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
        />
      )}

      <h2 className="text-xl font-semibold mt-8 mb-3">Realtime Feed (Finnhub)</h2>
      <WebsocketPanel />

      <div className="mt-8 text-xs text-slate-500">Data from CoinGecko. Realtime via Finnhub. For demo only.</div>
    </div>
  )
}
