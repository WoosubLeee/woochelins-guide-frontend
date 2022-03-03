import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMapApiLoaded: false,
    googleMap: undefined,
    naverMap: undefined,
    focusedMarker: undefined,
  },
  reducers: {
    mapApiLoaded: state => {
      state.isMapApiLoaded = true;
    },
    setGoogleMap: (state, action) => {
      state.googleMap = action.payload;
    },
    setNaverMap: (state, action) => {
      state.naverMap = action.payload;
    },
    setFocusedMarker: (state, action) => {
      state.focusedMarker = action.payload;
    },
  }
});

export const {
  mapApiLoaded,
  setGoogleMap,
  setNaverMap,
  setFocusedMarker,
} = mapSlice.actions;

export default mapSlice.reducer;