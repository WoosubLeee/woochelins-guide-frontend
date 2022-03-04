import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMapApiLoaded: false,
    googleMap: undefined,
    kakaoMap: undefined,
    googleFocusedMarker: undefined,
    kakaoFocusedMarker: undefined,
    mapCenter: undefined,
    zoomLevel: undefined,
  },
  reducers: {
    mapApiLoaded: state => {
      state.isMapApiLoaded = true;
    },
    setGoogleMap: (state, action) => {
      state.googleMap = action.payload;
    },
    setKakaoMap: (state, action) => {
      state.kakaoMap = action.payload;
    },
    setGoogleFocusedMarker: (state, action) => {
      state.googleFocusedMarker = action.payload;
    },
    setKakaoFocusedMarker: (state, action) => {
      state.kakaoFocusedMarker = action.payload;
    },
    setMapCenter: (state, action) => {
      state.mapCenter = action.payload;
    },
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
  }
});

export const {
  mapApiLoaded,
  setGoogleMap,
  setKakaoMap,
  setGoogleFocusedMarker,
  setKakaoFocusedMarker,
  setMapCenter,
  setZoomLevel,
} = mapSlice.actions;

export default mapSlice.reducer;