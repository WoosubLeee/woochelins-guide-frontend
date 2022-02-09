import { createSlice } from "@reduxjs/toolkit";

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    isLoaded: false,
    focusedPlace: undefined,
  },
  reducers: {
    completeLoad: (state) => {
      state.isLoaded = true;
    },
    focusPlace: (state, action) => {
      state.focusedPlace = action.payload;
    },
  }
});

export const { completeLoad, focusPlace } = mapSlice.actions;

export default mapSlice.reducer;