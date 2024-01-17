import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
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
