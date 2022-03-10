import { processMyListData, snakeToCamel } from "../utils/functions/common";
import { requestDELETEToken, requestGETToken, requestPOSTToken } from "./apiRequest";

const BASE_URL = process.env.REACT_APP_SERVER_URL + 'places/'

// Place 관련 API들

export const requestSavePlace = async placeInfo => {
  const url = BASE_URL + 'place/';
  const res = await requestPOSTToken(url, placeInfo);
  return res;
};

export const requestGetPlace = async kakaoMapId => {
  const url = BASE_URL + `place/${kakaoMapId}/`;
  const res = await requestGETToken(url);
  return res;
};

// GroupPlace 관련 API들

export const requestGetGroupPlace = async groupPlaceId => {
  const url = BASE_URL + `groupplace/${groupPlaceId}/`;
  const res = await requestGETToken(url);
  return res;
};

// MyList 관련 API들

export const requestCreateMyList = async listInfo => {
  const url = BASE_URL + 'mylist/';
  const res = await requestPOSTToken(url, listInfo);
  if (res.status === 201) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};

export const requestGetMyList = async listId => {
  const url = BASE_URL + `mylist/${listId}/`;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return processMyListData(data);
  }
};

export const requestGetMyListsUser = async () => {
  const url = BASE_URL + 'mylist/user';
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data.map(list => processMyListData(list));
  }
};

export const requestGetMyListDefault = async () => {
  const url = BASE_URL + 'mylist/user/?default=1';
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return processMyListData(data);
  }
};

export const requestMyListPlaceAdd = async (listId, placeInfo) => {
  const url = BASE_URL + `mylist/${listId}/place/`;
  const res = await requestPOSTToken(url, placeInfo);
  if (res.status === 201) {
    return res;
  }
};

export const requestMyListPlaceRemove = async (listId, kakaoMapId) => {
  const url = BASE_URL + `mylist/${listId}/place/?kakao_map_id=${kakaoMapId}`;
  const res = await requestDELETEToken(url);
  if (res.status === 204) {
    return res;
  }
};