import { requestGETToken, requestPOSTToken } from "./apiRequest";

const BASE_URL = process.env.REACT_APP_SERVER_URL + 'groups/';

export const requestGetGroupListUser = async () => {
  const url = BASE_URL;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
};

export const requestCreateGroup = async groupInfo => {
  const url = BASE_URL;
  const res = await requestPOSTToken(url, groupInfo);
  if (res.status === 201) {
    return res;
  }
};