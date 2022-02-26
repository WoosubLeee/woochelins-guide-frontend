import { processPlaceListData, snakeToCamel } from "../utils/functions/common";
import { requestDELETEToken, requestGETToken, requestPOSTToken } from "./apiRequest";

const BASE_URL = process.env.REACT_APP_SERVER_URL + 'places/'

// Place 관련 API들

export const requestGetPlace = async googleMapsId => {
  const url = BASE_URL + `${googleMapsId}/`;
  const res = await requestGETToken(url);
  return res;
};

// PlaceList 관련 API들

export const requestGetPlaceListDefault = async () => {
  const url = BASE_URL + 'list/user/default/';
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return processPlaceListData(data);
  }
};

export const requestGetPlaceListUser = async () => {
  const url = BASE_URL + 'list/';
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data.map(list => processPlaceListData(list));
  }
};

export const requestCreatePlaceList = async listInfo => {
  const url = BASE_URL + 'list/';
  const res = await requestPOSTToken(url, listInfo);
  if (res.status === 201) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};

export const requestGetPlaceList = async listId => {
  const url = BASE_URL + `list/${listId}/`;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return processPlaceListData(data);
  }
};

export const requestAddPlace = async (listId, placeInfo) => {
  const url = BASE_URL + `list/${listId}/add/`;
  const res = await requestPOSTToken(url, placeInfo);
  if (res.status === 201) {
    return res;
  }
};

export const requestRemovePlace = async (listId, googleMapsId) => {
  const url = BASE_URL + `list/${listId}/remove/`;
  const res = await requestDELETEToken(url, {google_maps_id: googleMapsId});
  if (res.status === 204) {
    return res;
  }
};

// GroupPlaceList 관련 API들

export const requestAddGroupPlace = async (listId, placeInfo) => {
  const url = BASE_URL + `group/list/${listId}/add/`;
  const res = await requestPOSTToken(url, placeInfo);
  if (res.status === 201) {
    return res;
  }
};

export const requestRemoveGroupPlace = async (listId, googleMapsId) => {
  const url = BASE_URL + `group/list/${listId}/remove/`;
  const res = await requestDELETEToken(url, {google_maps_id: googleMapsId});
  if (res.status === 204) {
    return res;
  }
};

export const requestGetGroupPlaceRecommenders = async (listId, googleMapsId) => {
  const url = BASE_URL + `group/list/${listId}/${googleMapsId}/`;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
};

// 기타 API들

export const requestGetSavedUserPlace = async googleMapsId => {
  const url = BASE_URL + `saved/user/${googleMapsId}/`;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};