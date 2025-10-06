import { useState } from 'react'
import RealtimeFeedModal from './RealtimeFeedModal'

const PRESETS = ['AAPL', 'MSFT', 'TSLA', 'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'COIN', 'GOOGL']

export default function WebsocketPanel() {
  const [symbol, setSymbol] = useState('AAPL')
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <label className="block text-sm text-slate-600 mb-1">Symbol</label>
          <input
            className="border border-slate-300 rounded px-3 py-2 w-full"
            placeholder="e.g., AAPL or BINANCE:BTCUSDT"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">Presets</label>
          <select className="border border-slate-300 rounded px-2 py-2" onChange={e => setSymbol(e.target.value)} value={symbol}>
            {PRESETS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded" onClick={() => setOpen(true)}>
          Open Live Feed
        </button>
      </div>

      <RealtimeFeedModal open={open} onClose={() => setOpen(false)} symbol={symbol} />
    </div>
  )
}
