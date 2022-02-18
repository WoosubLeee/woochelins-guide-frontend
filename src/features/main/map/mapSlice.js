import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isMapApiLoaded: false,
    listData: undefined,
    focusedPlace: undefined,
  },
  reducers: {
    mapApiLoaded: state => {
      state.isMapApiLoaded = true;
    },
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    focusPlace: (state, action) => {
      state.focusedPlace = action.payload;
    },
    removeFocusedPlace: (state) => {
      state.focusedPlace = undefined;
    },
  }
});

export const {
  mapApiLoaded,
  setListData,
  focusPlace,
  removeFocusedPlace
} = mapSlice.actions;

export default mapSlice.reducer;