import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slices/counterSlice'
import taskReducer from "../redux/slices/taskSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer, // ✅ Correct! `reducer` should be an object containing slices
        tasks: taskReducer,
    },
})
