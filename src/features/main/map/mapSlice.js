import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    kakaoMap: undefined,
    focusedMarker: undefined,
  },
  reducers: {
    setKakaoMap: (state, action) => {
      state.kakaoMap = action.payload;
    },
    setFocusedMarker: (state, action) => {
      state.focusedMarker = action.payload;
    },
  }
});

export const {
  setKakaoMap,
  setFocusedMarker,
} = mapSlice.actions;

export default mapSlice.reducer;