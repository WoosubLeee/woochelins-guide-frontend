import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: true,
    isLoginChecked: false,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
      state.isLoginChecked = true;
    },
  }
});

export const { setIsLogin } = authSlice.actions;

export default authSlice.reducer;