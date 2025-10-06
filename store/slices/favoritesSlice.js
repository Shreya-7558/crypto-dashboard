import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ids: [],
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(x => x !== id)
      } else {
        state.ids.push(id)
      }
    },
    setFavorites(state, action) { state.ids = action.payload || [] }
  }
})

export const { toggleFavorite, setFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
