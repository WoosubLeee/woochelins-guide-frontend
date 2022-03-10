import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    myLists: [],
    groupsUpdateNeeded: false,
    currentGroup: undefined,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setMyLists: (state, action) => {
      state.myLists = action.payload;
    },
    setGroupsUpdateNeeded: (state, action) => {
      state.groupsUpdateNeeded = action.payload;
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
  }
});

export const {
  setGroups,
  setMyLists,
  setGroupsUpdateNeeded,
  setCurrentGroup,
} = groupSlice.actions;

export default groupSlice.reducer;