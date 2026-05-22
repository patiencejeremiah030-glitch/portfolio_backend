import axios from "axios";
import { getApiBaseUrl } from "./config/apiBase";
import { formatApiError } from "./utils/apiHelpers";

const TOKEN_KEY = "portfolio_auth_token";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 60000,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    error.message = formatApiError(error);
    return Promise.reject(error);
  }
);

export default api;
