import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {
    isLoggin: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;
