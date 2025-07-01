import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    userloading: (state, action) => {
      state.isLoading = false;
    },
    userLoggedIn: (state, action) => {
      state.userInfo = action.payload;
    },
    userLoggedOut: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
export const { userLoggedIn, userLoggedOut,userloading } = authSlice.actions;
export default authSlice.reducer;
