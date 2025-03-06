import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer, // ✅ Correct! `reducer` should be an object containing slices
    },
})
