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
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
          todo.description = action.payload.description;
          todo.priority = action.payload.priority;
          todo.status = action.payload.status;
        }
        return todo;
      });
    },
    initializeTodo: (state, action) => {
      state.value = action.payload;
    },
    checkTodo: (state, action) => {
      state.value = state.value.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.completeStatus = !todo.completeStatus;
        }
        return todo;
      });
    },
  },
});

export const { addTodo, checkTodo, deleteTodo, updateTodo, initializeTodo } =
  todoDataSlice.actions;

export default todoDataSlice.reducer;
