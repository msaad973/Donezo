import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push({ id: Date.now(), ...action.payload, completed: false });
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) task.completed = !task.completed;
        },
    },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion } = taskSlice.actions;
export default taskSlice.reducer;
