import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Sync actions for immediate UI updates
    updateUserStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  setUser,
  clearError,
} = userSlice.actions;

export default userSlice.reducer; // This is the default export