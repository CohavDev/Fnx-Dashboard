import { createSlice } from "@reduxjs/toolkit";
export const licenseSlice = createSlice({
  name: "license",
  initialState: {
    value: 0,
  },
  reducers: {
    setLicense: (state, action) => {
      console.log("changing state in redux! ", action);
      state.value = action.payload;
    },
  },
});
export const { setLicense } = licenseSlice.actions;
export default licenseSlice.reducer;
