import { createSlice } from "@reduxjs/toolkit";
import queryString from "query-string";
import { requestGetGroup } from "../../../apis/groupApi";
import { requestGetMyList, requestGetMyListDefault } from "../../../apis/placeApi";
import { extractPlacesFromGroupData, extractPlacesFromMyListData } from "../../../utils/functions/common";
import { setCurrentGroup } from "../group/groupSlice";

export const placeSlice = createSlice({
  name: 'place',
  initialState: {
    currentPlaces: [],
    focusedPlace: undefined,
  },
  reducers: {
    setCurrentPlaces: (state, action) => {
      state.currentPlaces = action.payload;
    },
    setFocusedPlace: (state, action) => {
      state.focusedPlace = action.payload;
    },
  }
});

export const {
  setCurrentPlaces,
  setFocusedPlace,
} = placeSlice.actions;

export default placeSlice.reducer;

export function updateCurrentPlaces(location) {
  return async function updateCurrentPlaces(dispatch, getState) {
    const queries = queryString.parse(location.search);

    let data, isGroup = false;
    // 선택된 'group'이나 'mylist'가 있는 경우
    if ('type' in queries && 'id' in queries) {
      // 선택된 것이 'group'인 경우
      if (queries.type === 'group') {
        data = await requestGetGroup(queries.id);
        isGroup = true;
      // 선택된 것이 'mylist'인 경우
      } else if (queries.type === 'mylist') {
        data = await requestGetMyList(queries.id);
      }

    // 어떠한 리스트도 선택되지 않은 경우
    } else {
      data = await requestGetMyListDefault(); 
    }
    
    // currentGroup을 변경
    dispatch(setCurrentGroup({
      ...data,
      isGroup: isGroup
    }));

    // currentPlaces를 변경
    const places = isGroup ? extractPlacesFromGroupData(data) : extractPlacesFromMyListData(data);
    dispatch(setCurrentPlaces(places));
  };
};