import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode:
    localStorage.getItem("currentMode") === null
      ? "dark"
      : localStorage.getItem("currentMode") === "dark"
      ? "dark"
      : "light",
  userId: "63701cc1f03239d40b000044",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const { setMode } = globalSlice.actions;
export default globalSlice.reducer;
