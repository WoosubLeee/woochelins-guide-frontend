import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    focusedPlace: undefined,
  },
  reducers: {
    setFocusedPlace: (state, action) => {
      state.focusedPlace = action.payload;
    },
    removeFocusedPlace: (state) => {
      state.focusedPlace = undefined;
    },
  }
});

export const {
  setFocusedPlace,
  removeFocusedPlace,
} = placeSlice.actions;

export default placeSlice.reducer;