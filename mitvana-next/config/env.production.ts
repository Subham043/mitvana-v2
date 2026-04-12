import { base } from "./env.base";

const APP_ENDPOINT = "https://mitvana-admin.digisole.in";
const API_ENDPOINT = "https://mitvana-api.digisole.in";

/*
 * Configuration for production env
 */

export const env_production = {
  ...base,
  MODE: "production",
  API_ENDPOINT,
  APP_ENDPOINT,
} as const;