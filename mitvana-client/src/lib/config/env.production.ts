import { base } from "./env.base";

const APP_ENDPOINT = "https://portal.aaaedu.in";
const API_ENDPOINT = "https://server-api.aaaedu.in";

/*
 * Configuration for production env
 */

export const env_production = {
  ...base,
  MODE: "production",
  API_ENDPOINT,
  APP_ENDPOINT,
} as const;