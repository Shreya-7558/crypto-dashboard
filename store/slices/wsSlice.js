import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'disconnected', // 'connected' | 'disconnected'
  lastMessage: null,
  messages: [], // keep a rolling window
}

const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    connected(state) { state.status = 'connected' },
    disconnected(state) { state.status = 'disconnected' },
    message(state, action) {
      state.lastMessage = action.payload
      state.messages = [action.payload, ...state.messages].slice(0, 100)
    },
    clear(state) { state.messages = []; state.lastMessage = null }
  }
})

export const { connected, disconnected, message, clear } = wsSlice.actions
export default wsSlice.reducer
