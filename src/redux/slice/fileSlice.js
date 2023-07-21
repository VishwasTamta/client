import { createSlice } from "@reduxjs/toolkit";

const FileSlice = createSlice({
  name: "filePath",
  initialState: {
    path: ["/"],
  },
  reducers: {
    setInitialPath: (state, action) => {
      state.path = ["/"];
    },
    setPath: (state, action) => {
      const { path } = action.payload;
      state.path.push(path);
    },
    setCompletePath: (state, action) => {
      const { path } = action.payload;
      state.path = path;
    },
  },
});

export const { setInitialPath, setPath, setCompletePath } = FileSlice.actions;

export default FileSlice.reducer;

export const selectPath = (state) => state.fileExplorer.path;
