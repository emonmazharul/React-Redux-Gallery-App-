import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import imageReducer from "./imageSlice";

const middlewares = getDefaultMiddleware({
  serializableCheck: false,
});
const store = configureStore({
  reducer: {
    user: userReducer,
    imageInfo: imageReducer,
  },
  middleware: middlewares,
});

export default store;
