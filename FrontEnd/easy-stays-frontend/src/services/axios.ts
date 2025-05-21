import axios, { AxiosError } from "axios";

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
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const refreshResponse = await axios.post(
            "http://localhost:5067/api/Auth/refresh",
            {
              refreshToken,
            }
          );

          const newAccessToken = refreshResponse.data.accessToken;
          localStorage.setItem("access_token", newAccessToken);

          if (error.config && error.config.headers) {
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return api.request(error.config);
          }
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);
export default api;
