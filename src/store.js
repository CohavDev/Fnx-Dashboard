import { configureStore } from "@reduxjs/toolkit";
import licenseReducer from "./features/license/licenseSlice";

export default configureStore({
  reducer: {
    license: licenseReducer,
  },
});
