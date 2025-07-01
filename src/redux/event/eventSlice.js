import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    eventRequest: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    eventSuccess: (state) => {
      state.isLoading = false;
      state.success = true;
      state.error = null;
    },
    eventFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetEventState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { eventRequest, eventSuccess, eventFail, resetEventState } = eventSlice.actions;
export default eventSlice.reducer;
