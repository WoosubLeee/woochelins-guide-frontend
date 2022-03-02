import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMapApiLoaded: false,
    map: undefined,
    focusedMarker: undefined,
  },
  reducers: {
    mapApiLoaded: state => {
      state.isMapApiLoaded = true;
    },
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setFocusedMarker: (state, action) => {
      state.focusedMarker = action.payload;
    },
  }
});

export const {
  mapApiLoaded,
  setMap,
  setFocusedMarker,
} = mapSlice.actions;

export default mapSlice.reducer;