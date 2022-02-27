import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: 'auth',
  initialState: {
    groups: [],
    placeLists: [],
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setPlaceLists: (state, action) => {
      state.placeLists = action.payload;
    },
  }
});

export const {
  setGroups,
  setPlaceLists,
} = groupSlice.actions;

export default groupSlice.reducer;