import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  showPassword: false,
  error: false,
  errorMessage: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setLoading, setShowPassword, setError, setErrorMessage } = uiSlice.actions;
export default uiSlice.reducer;
