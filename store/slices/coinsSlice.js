import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3'

export const fetchCoins = createAsyncThunk('coins/fetchCoins', async (_, { rejectWithValue }) => {
  try {
    const url = `${COINGECKO_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch coins')
    const data = await res.json()
    return data
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

export const fetchCoinDetails = createAsyncThunk('coins/fetchCoinDetails', async (id, { rejectWithValue }) => {
  try {
    const [detailRes, chartRes] = await Promise.all([
      fetch(`${COINGECKO_BASE}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`),
      fetch(`${COINGECKO_BASE}/coins/${id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
    ])
    if (!detailRes.ok) throw new Error('Failed to fetch coin detail')
    if (!chartRes.ok) throw new Error('Failed to fetch chart data')
    const detail = await detailRes.json()
    const chart = await chartRes.json()
    return { detail, chart }
  } catch (e) {
    return rejectWithValue(e.message)
  }
})

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  search: '',
  sort: { key: 'market_cap', dir: 'desc' },
  details: {},
}

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    setSearch(state, action) { state.search = action.payload },
    setSort(state, action) { state.sort = action.payload },
    hydrateList(state, action) { state.list = action.payload; state.status = 'succeeded' },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchCoins.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload })
      .addCase(fetchCoins.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload || 'Error' })
      .addCase(fetchCoinDetails.pending, (state) => { state.details = { ...state.details, status: 'loading' } })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => { state.details = { data: action.payload, status: 'succeeded' } })
      .addCase(fetchCoinDetails.rejected, (state, action) => { state.details = { status: 'failed', error: action.payload || 'Error' } })
  }
})

export const { setSearch, setSort, hydrateList } = coinsSlice.actions
export default coinsSlice.reducer
