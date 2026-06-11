import { base } from "./env.base";

const APP_ENDPOINT = "https://mitvana.com";
const API_ENDPOINT = "https://api.mitvana.com";

/*
 * Configuration for production env
 */

export const env_production = {
  ...base,
  MODE: "production",
  API_ENDPOINT,
  APP_ENDPOINT,
} as const;