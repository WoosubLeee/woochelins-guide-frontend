import { snakeToCamel } from "../utils/functions/common";
import { requestGETToken, requestPOST, requestPOSTToken } from "./apiRequest";

const BASE_URL = process.env.REACT_APP_SERVER_URL + 'accounts/'

export const requestSignup = async userInfo => {
  const url = BASE_URL + 'signup/';
  const res = await requestPOST(url, userInfo);
  if (res.status === 201) {
    const loginRes = await requestLogin(userInfo);
    return loginRes;
  }
};

export const requestLogin = async userInfo => {
  const url = BASE_URL + 'login/';
  const res = await requestPOST(url, userInfo);
  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem('token', data.token);
  }
  return res;
};

export const requestIsValid = async () => {
  const url = BASE_URL + 'validate/';
  const res = await requestPOSTToken(url);
  return res;
};

export const requestGetGroupsLists = async () => {
  const url = BASE_URL + 'groups-lists/';
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};