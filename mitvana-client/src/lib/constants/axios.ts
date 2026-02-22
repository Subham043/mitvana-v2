import type { AxiosRequestConfig } from "axios";
import { env } from "@/lib/config/env";

export const axiosConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: undefined,
  },
  baseURL: env.API_ENDPOINT,
  withCredentials: true,
};