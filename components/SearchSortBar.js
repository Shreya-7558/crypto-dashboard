export default function SearchSortBar({ search, onSearch, sort, onSort }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
      <input
        className="border border-slate-300 rounded px-3 py-2 w-full sm:w-72"
        placeholder="Search by name or symbol"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-600">Sort by</label>
        <select
          className="border border-slate-300 rounded px-2 py-2"
          value={`${sort.key}:${sort.dir}`}
          onChange={(e) => {
            const [key, dir] = e.target.value.split(':')
            onSort({ key, dir })
          }}
        >
          <option value="current_price:asc">Price ↑</option>
          <option value="current_price:desc">Price ↓</option>
          <option value="market_cap:asc">Market Cap ↑</option>
          <option value="market_cap:desc">Market Cap ↓</option>
          <option value="price_change_percentage_24h:asc">24h % ↑</option>
          <option value="price_change_percentage_24h:desc">24h % ↓</option>
        </select>
      </div>
    </div>
  )
}
