import axios from "axios";
import { store } from "../store/store";
import { clearAccessToken, setAccessToken } from "../store/slices/tokenSlice";
import { clearAuthUser } from "../store/slices/authSlice";
import { FRONT_ROUTES } from "../constants/frontRoutes";
import { API_ROUTES } from "../constants/api";

export const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.token.accessToken;
  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;
    console.log("Error status:", status);
    if (status === 401 && !originalRequest._retry) {
      store.dispatch(clearAccessToken());
      store.dispatch(clearAuthUser());
      window.location.href = FRONT_ROUTES.LOGIN;
      return Promise.reject(error);
    }
    if (
      status === 403 &&
      !originalRequest._retry &&
      error.response.data.error === "Unauthorized" &&
      error.response.data.message === "Access token expired"
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await AxiosInstance.post(API_ROUTES.REFRESH);
        const newAccessToken = refreshResponse.data.accessToken;
        store.dispatch(setAccessToken(newAccessToken));
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearAccessToken());
        store.dispatch(clearAuthUser());
        window.location.href = FRONT_ROUTES.LOGIN;
        return Promise.reject(refreshError);
      }
    }
  },
);
