import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};
export const auth = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggle: (state, action) => {
      return { open: action.payload };
    },
  },
});
export const { toggle } = auth.actions;
export default auth.reducer;
