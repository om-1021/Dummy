import axios from "axios";
import { BASE_URL } from "../helper";

const newRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default newRequest;
