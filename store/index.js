import { configureStore } from '@reduxjs/toolkit'
import coinsReducer from './slices/coinsSlice'
import favoritesReducer from './slices/favoritesSlice'
import { wsMiddleware } from './middleware/wsMiddleware'
import wsReducer from './slices/wsSlice'

const store = configureStore({
  reducer: {
    coins: coinsReducer,
    favorites: favoritesReducer,
    ws: wsReducer,
  },
  middleware: (getDefault) => getDefault().concat(wsMiddleware),
})

export default store
