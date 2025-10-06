import { useEffect, useRef } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { clear } from '@/store/slices/wsSlice'

export default function RealtimeFeedModal({ open, onClose, symbol }) {
  const dispatch = useDispatch()
  const messages = useSelector(s => s.ws.messages)
  const tokenRef = useRef(null)

  useEffect(() => {
    tokenRef.current = process.env.NEXT_PUBLIC_FINNHUB_TOKEN || ''
  }, [])

  useEffect(() => {
    if (!open || !symbol) return
    if (!tokenRef.current) return
    // clear previous messages when opening
    dispatch(clear())
    dispatch({ type: 'ws/connect', payload: { token: tokenRef.current } })
    dispatch({ type: 'ws/subscribe', payload: symbol })

    return () => {
      dispatch({ type: 'ws/unsubscribe', payload: symbol })
    }
  }, [open, symbol, dispatch])

  return (
    <Modal open={open} onClose={onClose} title={`Live Feed: ${symbol}`}>
      <div className="text-sm text-slate-600 mb-2">Streaming quotes/trades from Finnhub</div>
      <div className="h-72 overflow-auto border rounded p-2 bg-slate-50 text-xs">
        {messages.length === 0 && <div className="text-slate-500">Waiting for messages...</div>}
        {messages.map((m, idx) => (
          <pre key={idx} className="whitespace-pre-wrap">{JSON.stringify(m, null, 2)}</pre>
        ))}
      </div>
    </Modal>
  )
}
