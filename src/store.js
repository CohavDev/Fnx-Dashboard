import { configureStore } from "@reduxjs/toolkit";
import licenseReducer from "./features/slices/licenseSlice";
import subscriberRedcuer from "./features/slices/subscriberSlice";
import innerIDReducer from "./features/slices/innerIDSlice";

export default configureStore({
  reducer: {
    license: licenseReducer,
    subscriber: subscriberRedcuer,
    innerID: innerIDReducer,
  },
});
