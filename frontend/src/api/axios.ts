import axios from "axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "../auth/auth";
import { setUser } from "../types/loginType";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// inject token
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// auto refresh (ANTI LOOP)
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    //skip if refresh endpoint
    if (originalRequest.url.includes("/login/refreshToken")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/login/refreshToken");
        const newToken = res.data.accessToken;

        setAccessToken(newToken);
        if (res.data.data) setUser(res.data.data);
        
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch {
        clearAccessToken();
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;