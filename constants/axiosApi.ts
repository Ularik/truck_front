import axios from "axios";
import { apiURL } from "./config";


const axiosApi = axios.create({
  baseURL: apiURL,
});

const logoutAndRedirect = async () => {
  try {
    const { useAuthStore } = await import("@/lib/store/userStore");
    useAuthStore.getState().logout();

  } catch (e) {
    console.log('Could not notify services about logout', e);
  }

  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        originalRequest.url !== "/api/token/pair" &&
        originalRequest.url !== "/api/token/refresh"
      ) {
        originalRequest._retry = true;

        try {
          const { useAuthStore } = await import("@/lib/store/userStore");
          const refreshToken = useAuthStore.getState().refreshToken;

          const result = await axios.post(`${apiURL}/token/refresh`, {
            refresh: refreshToken,
          });
          const { access } = result.data;
          const setAccessToken = useAuthStore((state) => state.setAccessToken);
          setAccessToken(access);

          return axiosApi(originalRequest);
        } catch (refreshError) {
          await logoutAndRedirect();

          return Promise.reject(refreshError);
        }
      }

    return Promise.reject(error);
  },
);

axiosApi.interceptors.request.use(
  async (config) => {
    try {
      const { useAuthStore } = await import("@/lib/store/userStore");
      const token = useAuthStore.getState().accessToken;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Ошибка при получении токена в интерцепторе:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosApi;