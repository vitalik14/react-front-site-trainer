import axios from 'axios';

const { apiData: { baseURL, clientToken, userToken } } = window;

const headers = {
  Authorization: `Token client="${clientToken}" usertoken="${userToken}"`,
};

export const fetch = (url, params) => axios({
  baseURL,
  url,
  headers,
  params,
});

export const create = (url, data) => axios({
  method: 'post',
  baseURL,
  url,
  headers,
  data,
});

export const update = (url, data) => axios({
  method: 'put',
  baseURL,
  url,
  headers,
  data,
});

export const remove = url => axios({
  method: 'delete',
  baseURL,
  url,
  headers,
});
