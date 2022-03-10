import { requestDELETEToken, requestGETToken, requestPOSTToken } from "./apiRequest";
import { snakeToCamel } from "../utils/functions/common";

const BASE_URL = process.env.REACT_APP_SERVER_URL + 'groups/';

export const requestCreateGroup = async groupInfo => {
  const url = BASE_URL;
  const res = await requestPOSTToken(url, groupInfo);
  if (res.status === 201) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};

export const requestGetGroupsUser = async () => {
  const url = BASE_URL + 'user/';
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = data.map(list => snakeToCamel(list));
    return data;
  }
};

export const requestGetGroup = async groupId => {
  const url = BASE_URL + `${groupId}/`;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};

export const requestCreateGroupInvitationToken = async groupId => {
  const url = BASE_URL + `${groupId}/token/`;
  const res = await requestPOSTToken(url);
  if (res.status === 201) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};

export const requestGroupInvitationIsValid = async (groupId, token) => {
  const url = BASE_URL + `${groupId}/token/?token=${token}`;
  const res = await requestGETToken(url);
  return res;
};

export const requestGroupMemberAdd = async (groupId, token) => {
  const url = BASE_URL + `${groupId}/member/?token=${token}`;
  const res = await requestPOSTToken(url);
  return res;
};

export const requestGroupPlaceAdd = async (groupId, placeInfo) => {
  const url = BASE_URL + `${groupId}/place/`;
  const res = await requestPOSTToken(url, placeInfo);
  if (res.status === 201) {
    return res;
  }
};

export const requestGroupPlaceRemove = async (groupId, kakaoMapId) => {
  const url = BASE_URL + `${groupId}/place/?kakao_map_id=${kakaoMapId}`;
  const res = await requestDELETEToken(url);
  if (res.status === 204) {
    return res;
  }
};

export const requestIsGroupAdmin = async groupId => {
  const url = BASE_URL + `${groupId}/is_admin/`;
  const res = await requestGETToken(url);
  return res;
};