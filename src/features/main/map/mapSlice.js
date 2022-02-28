import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMapApiLoaded: false,
    map: undefined,
    listData: undefined,
    listUpdateNeeded: true,
    focusedMarker: undefined,
  },
  reducers: {
    mapApiLoaded: state => {
      state.isMapApiLoaded = true;
    },
    setMap: (state, action) => {
      state.map = action.payload;
    },
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setListUpdateNeeded: (state, action) => {
      state.listUpdateNeeded = action.payload;
    },
    setFocusedMarker: (state, action) => {
      state.focusedMarker = action.payload;
    },
  }
});

export const {
  mapApiLoaded,
  setMap,
  setListData,
  setListUpdateNeeded,
  setFocusedMarker,
} = mapSlice.actions;

export default mapSlice.reducer;