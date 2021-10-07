import axios from "axios";
require('dotenv').config()
const endpoint = process.env.REACT_APP_API_URL;


// const https = require('https');
// const agent = new https.Agent({
//     rejectUnauthorized: false,
// });
// const client = axios.create({ //all axios can be used, shown in axios documentation
//     baseURL: process.env.REACT_APP_API_URL,
//     responseType: 'json',
//     withCredentials: true,
//     httpsAgent: agent
// });
// At instance level
// const instance = axios.create({
//   httpsAgent: new https.Agent({  
//     rejectUnauthorized: false
//   })
// });
// instance.get('https://3.1.222.201');


export async function get(url) {
  return await axios.get(endpoint + url, {
    headers: { "Content-type": "application/json" },
  });
}
export async function getWithToken(url, token) {
  return await axios.get(endpoint + url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getWithTokenParams(url, params, token) {
  return await axios.get(endpoint + url, {
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function getWithParams(url, params) {
  return await axios.get(endpoint + url, {
    params: params,
    headers: { "Content-type": "application/json" },
  });
}
export async function post(url, body) {
  return await axios.post(endpoint + url, body,{
    headers: { "Content-type": "application/json",
    withCredentials: true,
   },
  });
  
}

export async function postWithToken(url, body, token) {
  return await axios.post(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      withCredentials: true,
    },
  });
}

export async function patch(url, body) {
  return await axios.patch(endpoint + url, body);
}

export async function patchWithToken(url, body, token) {
  return await axios.patch(endpoint + url, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
}

export async function put(url, body) {
  return await axios.put(endpoint + url, body);
}
export async function putWithToken(url, body, token) {
  return await axios.put(endpoint + url, body, {
    headers: { Authorization: `Bearer ${token}`,
    "Content-type": "application/json",
    },
  });
}

export async function del(url, token) {
  return await axios.delete(endpoint + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
}