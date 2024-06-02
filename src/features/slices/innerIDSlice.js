import { createSlice } from "@reduxjs/toolkit";
export const innerIDSlice = createSlice({
  name: "innerID",
  initialState: {
    value: 0,
  },
  reducers: {
    setInnerID: (state, action) => {
      console.log("changing state in redux! ", action);
      state.value = action.payload;
    },
  },
});
export const { setInnerID } = innerIDSlice.actions;
export default innerIDSlice.reducer;
