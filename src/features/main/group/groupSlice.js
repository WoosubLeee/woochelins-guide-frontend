import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    placeLists: [],
    currentGroup: undefined,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setPlaceLists: (state, action) => {
      state.placeLists = action.payload;
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
  }
});

export const {
  setGroups,
  setPlaceLists,
} = groupSlice.actions;

export default groupSlice.reducer;