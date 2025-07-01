import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware), 
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== "production",
});
