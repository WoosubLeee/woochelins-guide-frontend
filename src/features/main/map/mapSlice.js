import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMapApiLoaded: false,
    map: undefined,
    listData: undefined,
    listUpdateNeeded: true,
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
  }
});

export const {
  mapApiLoaded,
  setMap,
  setListData,
  setListUpdateNeeded,
} = mapSlice.actions;

export default mapSlice.reducer;