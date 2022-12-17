import { configureStore } from "@reduxjs/toolkit";
import todoDataSlice from "./slices/todoDataSlice";
export const store = configureStore({
  reducer: {
    todoData: todoDataSlice,
  },
});
