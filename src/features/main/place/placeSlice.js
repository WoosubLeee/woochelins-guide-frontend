import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    currentPlaces: [],
    placesUpdateNeeded: false,
    focusedPlace: undefined,
    sessionToken: undefined,
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
    removeFocusedPlace: (state) => {
      state.focusedPlace = undefined;
    },
    setSessionToken: (state, action) => {
      state.sessionToken = action.payload;
    },
  }
});

export const {
  setCurrentPlaces,
  setPlacesUpdateNeeded,
  setFocusedPlace,
  removeFocusedPlace,
  setSessionToken,
} = placeSlice.actions;

export default placeSlice.reducer;