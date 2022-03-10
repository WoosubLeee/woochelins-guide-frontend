import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    currentPlaces: [],
    placesUpdateNeeded: false,
    focusedPlace: undefined,
  },
  reducers: {
    setCurrentPlaces: (state, action) => {
      state.currentPlaces = action.payload;
    },
    setPlacesUpdateNeeded: (state, action) => {
      state.placesUpdateNeeded = action.payload;
    },
    setFocusedPlace: (state, action) => {
      state.focusedPlace = action.payload;
    },
  }
});

export const {
  setCurrentPlaces,
  setPlacesUpdateNeeded,
  setFocusedPlace,
} = placeSlice.actions;

export default placeSlice.reducer;