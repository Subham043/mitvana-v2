import { base } from "./env.base";

const APP_ENDPOINT = "https://dashboard.mitvana.com";
const API_ENDPOINT = "https://api.mitvana.com";

/*
 * Configuration for production env
 */

export const env_production = {
  ...base,
  MODE: "production",
  API_ENDPOINT,
  APP_ENDPOINT,
  CAPTCHA_KEY: `6LdO1BktAAAAAGol-QXdDGcECdY8VCNf4zd4rtYd`,
} as const;