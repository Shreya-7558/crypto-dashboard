import Image from 'next/image'
import Link from 'next/link'
import FavoriteStar from './FavoriteStar'

function formatCurrency(n) {
  if (n === null || n === undefined) return '-'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n)
}

function formatPercent(n) {
  if (n === null || n === undefined) return '-'
  return `${n.toFixed(2)}%`
}

export default function CoinTable({ coins, favorites, onToggleFavorite }) {
  if (!coins || coins.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400">
        No coin data available
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="text-left text-slate-600 text-sm">
            <th className="px-3">Fav</th>
            <th className="px-3">Name</th>
            <th className="px-3">Price</th>
            <th className="px-3">24h %</th>
            <th className="px-3">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map(c => (
            <tr key={c.id} className="bg-white shadow-sm">
              <td className="px-3 py-2">
                <FavoriteStar active={favorites.includes(c.id)} onClick={() => onToggleFavorite(c.id)} />
              </td>
              <td className="px-3 py-2 flex items-center gap-2">
                {c.image && (
                  <Image src={c.image} alt={c.name} width={20} height={20} />
                )}
                <Link className="text-blue-600 hover:underline" href={`/coin/${c.id}`}>{c.name} ({c.symbol.toUpperCase()})</Link>
              </td>
              <td className="px-3 py-2">{formatCurrency(c.current_price)}</td>
              <td className={`px-3 py-2 ${c.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatPercent(c.price_change_percentage_24h)}</td>
              <td className="px-3 py-2">{formatCurrency(c.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
