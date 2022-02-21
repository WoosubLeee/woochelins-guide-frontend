import { requestGETToken, requestPOSTToken } from "./apiRequest";
import { processGroupData, snakeToCamel } from "../utils/functions/common";

const BASE_URL = process.env.REACT_APP_SERVER_URL + 'groups/';

export const requestGetGroupListUser = async () => {
  const url = BASE_URL;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = data.map(list => snakeToCamel(list));
    return data.map(group => processGroupData(group));
  }
};

export const requestCreateGroup = async groupInfo => {
  const url = BASE_URL;
  const res = await requestPOSTToken(url, groupInfo);
  if (res.status === 201) {
    let data = await res.json();
    data = snakeToCamel(data);
    return data;
  }
};

export const requestGetGroup = async groupId => {
  const url = BASE_URL + `${groupId}/`;
  const res = await requestGETToken(url);
  if (res.status === 200) {
    let data = await res.json();
    data = snakeToCamel(data);
    return processGroupData(data);
  }
};