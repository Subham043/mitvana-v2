import api, { type AxiosInstance } from "axios";
import { axiosConfig } from "./constants/axios.option";
import { api_routes } from "./constants/routes.option";
import { useAuthStore } from "./store/auth.store";

/*
 * Main Axios Instance with base url
 */

const axios: AxiosInstance = api.create(axiosConfig);


// -- Refresh Logic Vars
let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

// Notify waiting requests
const processQueue = (token: string | null) => {
  queue.forEach((cb) => cb(token));
  queue = [];
};

// Request interceptor: attach token
axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().authToken;
  // 🔥 only set if not already set
  if (token && !config.headers?.authorization) {
    config.headers = config.headers || {};
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Skip refresh endpoint
    if (original?.url === api_routes.account.refresh) {
      return Promise.reject(error);
    }

    // Skip login endpoint
    if (original?.url === api_routes.auth.login) {
      return Promise.reject(error);
    }

    // Token expired?
    if ((error.response?.status === 401) && !original._retry) {
      original._retry = true;

      // Queue all requests until refresh is completed
      return new Promise((resolve, reject) => {
        queue.push((token) => {
          if (token) {
            original.headers = original.headers || {};
            // Update the authorization header with the new token
            original.headers.authorization = `Bearer ${token}`;
            resolve(axios(original));
          } else {
            reject(error);
          }
        });

        // Call refresh only once
        if (!isRefreshing) {
          isRefreshing = true;

          useAuthStore.getState().refreshToken().then((refreshed) => {
            isRefreshing = false;

            if (refreshed) {
              processQueue(useAuthStore.getState().authToken);
            } else {
              processQueue(null);
              if (typeof window !== "undefined") {
                window.location.href = "/auth/login";
              }
            }
          }).catch(() => {
            isRefreshing = false;
            processQueue(null);
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }
          });
        }
      });
    }

    return Promise.reject(error);
  }
);


export default axios;