import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    currentPlaces: [],
    placesUpdateNeeded: false,
    focusedPlace: undefined,
    googlePlacesService: undefined,
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
    setGooglePlacesService: (state, action) => {
      state.googlePlacesService = action.payload;
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
  setGooglePlacesService,
  setSessionToken,
} = placeSlice.actions;

export default placeSlice.reducer;