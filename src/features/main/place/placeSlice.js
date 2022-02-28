import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    focusedPlace: undefined,
    sessionToken: undefined,
  },
  reducers: {
    
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
  setFocusedPlace,
  removeFocusedPlace,
  setSessionToken,
} = placeSlice.actions;

export default placeSlice.reducer;