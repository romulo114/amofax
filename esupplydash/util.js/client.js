const BASE_URL = process.env.BASE_URL;

const client = (endpoint, { body, ...customConfig } = {}) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const config = {
    method: body ? "POST" : "GET",
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
  return fetch(`${BASE_URL}/${endpoint}`, config).then(async (response) => {
    if (response.ok) {
      console.log(response);
      return await response.json();
    } else {
      const errorMessage = await response.text();
      return Promise.reject(new Error(errorMessage));
    }
  });
};

export default client;
