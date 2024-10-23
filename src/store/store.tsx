import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store.getState>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch