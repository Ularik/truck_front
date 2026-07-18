import axios from "axios";
import { apiURL } from "./config";


const axiosApi = axios.create({
  baseURL: apiURL,
  withCredentials: true,
});


const logoutAndRedirect = async () => {
  try {
    console.log('logout');
  } catch (e) {
    console.log('Could not notify services about logout', e);
  }

  if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
    window.location.replace('/login');
  }
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

axiosApi.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

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
          await logoutAndRedirect();
        } catch (refreshError) {
          await logoutAndRedirect();

          return Promise.reject(refreshError);
        }
      }

    return Promise.reject(error);
  },
);


export default axiosApi;