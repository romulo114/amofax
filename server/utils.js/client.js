import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const BASE_URL = process.env.BASE_URL;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;

const client = (endpoint, { body, ...customConfig } = {}) => {
  const headers = {
    // "Content-Type": "application/json;charset=UTF-8",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  };

  const config = {
    method: body ? "POST" : "GET",
    url: `${BASE_URL}/${endpoint}?organization_id=${ORGANIZATION_ID}`,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  console.log(config);
  return axios(config)
    .then(async (response) => {
      if (response.status == 200) {
        return response.data;
      } else {
        return Promise.reject(new Error(response.message));
      }
    })
    .catch((error) => {
      return Promise.reject(error.response);
    });
};

export default client;
