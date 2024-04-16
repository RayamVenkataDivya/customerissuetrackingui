import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from '../services/userApi'
import { ticketApi } from '../services/ticketApi'
import loginReducer from '../features/user/loginSlice'
export const store = configureStore({
  reducer: {
    loginReducer:loginReducer,
    [userApi.reducerPath]: userApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userApi.middleware,ticketApi.middleware)
})
setupListeners(store.dispatch)    