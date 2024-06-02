import { createSlice } from "@reduxjs/toolkit";
export const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    value: 0,
  },
  reducers: {
    setSubscriber: (state, action) => {
      console.log("changing state in redux! ", action);
      state.value = action.payload;
    },
  },
});
export const { setSubscriber } = subscriberSlice.actions;
export default subscriberSlice.reducer;
