import axios, { AxiosError } from "axios";
import type { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5067",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:5067/api/Auth/refresh",
            {
              refreshToken,
            }
          );

          const newAccessToken = refreshResponse.data.token;
          const newRefreshToken = refreshResponse.data.refreshToken;

          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", newRefreshToken);

          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          return api.request(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
