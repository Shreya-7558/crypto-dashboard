let socket = null

export const wsMiddleware = store => next => action => {
  const { type, payload } = action

  if (type === 'ws/connect') {
    const token = payload?.token
    if (!token) return next(action)
    if (socket) socket.close()
    socket = new WebSocket(`wss://ws.finnhub.io?token=${token}`)

    socket.onopen = () => {
      store.dispatch({ type: 'ws/connected' })
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        store.dispatch({ type: 'ws/message', payload: data })
      } catch {}
    }

    socket.onclose = () => {
      store.dispatch({ type: 'ws/disconnected' })
    }
  }

  if (type === 'ws/subscribe') {
    const symbol = payload
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ type: 'subscribe', symbol }))
    }
  }

  if (type === 'ws/unsubscribe') {
    const symbol = payload
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({ type: 'unsubscribe', symbol }))
    }
  }

  return next(action)
}
