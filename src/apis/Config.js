import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    apiKey: "dummy_key",
    language: "en",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = "ACCESS_TOKEN_FROM_INTERCEPTOR";
    console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // HIDE LOADER
    return response;
  },
  function (error) {
    // SHOW SNACKBAR ERROR
    // HIDE LOADER
    // REFRESH TOKEN
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosInstance;
