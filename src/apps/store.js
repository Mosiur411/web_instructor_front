import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";
import { apiSlice } from "./apiSlice";
import { eventApi } from "../redux/event/eventApi"; 
import eventReducer from "../redux/event/eventSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [eventApi.reducerPath]: eventApi.reducer, 
    auth: authReducer,
    event: eventReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware, eventApi.middleware), 
  // eslint-disable-next-line no-undef
  devTools: process.env.NODE_ENV !== "production",
});
