import axios from "axios";
import { BASE_URL } from "../helper";
const url = BASE_URL;

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default newRequest;
