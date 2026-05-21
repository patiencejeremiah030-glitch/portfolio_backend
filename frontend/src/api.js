import axios from "axios";
import { getApiBaseUrl } from "./config/apiBase";
import { formatApiError } from "./utils/apiHelpers";

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 60000,
  headers: { Accept: "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    error.message = formatApiError(error);
    return Promise.reject(error);
  }
);

export default api;
