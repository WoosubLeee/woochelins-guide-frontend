const requestMETHODToken = async (method, url, data) => {
  const token = localStorage.getItem('token');
  let options = {
    method: method,
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    }
  }
  if (data) {
    options.body = JSON.stringify(data);
  }

  return await fetch(url, options);
}

export const requestGETToken = async url => {
  return await requestMETHODToken('GET', url);
};

export const requestPOST = async (url, data) => {
  let options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  };
  if (data) {
    options.body = JSON.stringify(data);
  }

  return await fetch(url, options);
};

export const requestPOSTToken = async (url, data) => {
  return await requestMETHODToken('POST', url, data);
};

export const requestDELETEToken = async (url, data) => {
  return await requestMETHODToken('DELETE', url, data);
};