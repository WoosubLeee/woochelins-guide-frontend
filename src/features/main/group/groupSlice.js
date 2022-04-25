import { createSlice } from "@reduxjs/toolkit";
import { requestGetGroupsUser } from "../../../apis/groupApi";
import { requestGetMyListsUser } from "../../../apis/placeApi";
import { addIsGroupProperty, processMyListData, snakeToCamel } from "../../../utils/functions/common";

export const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    myLists: [],
    currentGroup: undefined,
  },
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },
    setMyLists: (state, action) => {
      state.myLists = action.payload;
    },
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },
  }
});

export const {
  setGroups,
  setMyLists,
  setCurrentGroup,
} = groupSlice.actions;

export default groupSlice.reducer;

export async function updateGroupsAndMylists(dispatch, getState) {
  const groupRes = await requestGetGroupsUser();
  let groups = await groupRes.json();
  groups = addIsGroupProperty(groups.map(list => snakeToCamel(list)));
  dispatch(setGroups(groups));

  const mylistRes = await requestGetMyListsUser();
  let mylists = await mylistRes.json();
  mylists = snakeToCamel(mylists).map(list => processMyListData(list));
  mylists = addIsGroupProperty(mylists);
  dispatch(setMyLists(mylists));
};