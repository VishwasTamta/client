import { configureStore } from "@reduxjs/toolkit";
import FileReducer from "./slice/fileSlice";

export const store = configureStore({
  reducer: {
    fileExplorer: FileReducer,
  },
  devTools: true, //false at production
});
