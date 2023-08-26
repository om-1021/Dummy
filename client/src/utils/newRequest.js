import axios from "axios";
import { BASE_URL } from "../helper";
import { config } from "dotenv";
const url = BASE_URL;

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

newRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("acessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default newRequest;
