import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

export const todoDataSlice = createSlice({
  name: "todoData",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteTodo: (state, action) => {
      state.value = state.value.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo: (state, action) => {
      state.value += action.payload;
    },
    initializeTodo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, initializeTodo } =
  todoDataSlice.actions;

export default todoDataSlice.reducer;
