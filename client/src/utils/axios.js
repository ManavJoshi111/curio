import axios from "axios";
import { SERVER_URL } from "./constants";

const instance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});

instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  return config;
});

export const get = async (url, params = {}) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await instance.post(url, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await instance.put(url, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const del = async (url, data = {}) => {
  try {
    const response = await instance.delete(url, data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
