import { configureStore } from '@reduxjs/toolkit'
import toast from './reducers/toast'
import api from './reduxQuery/api'
import { rtkQueryErrorLogger } from './reduxQuery/middleware/errorHandler'

export const store = configureStore({
  reducer: {
    api: api.reducer,
    toast
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch