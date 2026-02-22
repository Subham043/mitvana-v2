import api, { type AxiosInstance } from "axios";
import { axiosConfig } from "@/lib/constants/axios";
// import { useAuthStore } from "@/stores/auth.store";
// import { api_routes } from "./routes/api_routes";

/*
 * Main Axios Instance with base url
 */

const axios: AxiosInstance = api.create(axiosConfig);


// -- Refresh Logic Vars
// let isRefreshing = false;
// let queue: ((token: string | null) => void)[] = [];

// // Notify waiting requests
// const processQueue = (token: string | null) => {
//   queue.forEach((cb) => cb(token));
//   queue = [];
// };

// Request interceptor: attach token
axios.interceptors.request.use((config) => {
  // const token = useAuthStore.getState().authToken;
  // if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor
// axios.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;

//     // Skip refresh endpoint
//     if (original?.url === api_routes.profile.refresh) {
//       return Promise.reject(error);
//     }

//     // Token expired?
//     if ((error.response?.status === 401) && !original._retry) {
//       original._retry = true;

//       // Queue all requests until refresh is completed
//       return new Promise((resolve, reject) => {
//         queue.push((token) => {
//           if (token) {
//             // Update the authorization header with the new token
//             original.headers.authorization = `Bearer ${token}`;
//             resolve(axios(original));
//           } else {
//             reject(error);
//           }
//         });

//         // Call refresh only once
//         if (!isRefreshing) {
//           isRefreshing = true;

//           useAuthStore.getState().refreshToken().then((refreshed) => {
//             isRefreshing = false;

//             if (refreshed) {
//               processQueue(useAuthStore.getState().authToken);
//             } else {
//               processQueue(null);
//             }
//           }).catch(() => {
//             isRefreshing = false;
//             processQueue(null);
//           });
//         }
//       });
//     }

//     return Promise.reject(error);
//   }
// );


export default axios;

export function getAxiosContext() {
  return {
    axios,
  }
}