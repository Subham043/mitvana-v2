/*
 * Base Configuration
 */

const API_ENDPOINT = "http://localhost:8000";
const APP_ENDPOINT = "http://localhost";

export const base = {
  MODE: "development",
  BASE_PREFIX: "/",
  API_ENDPOINT,
  APP_ENDPOINT: `${APP_ENDPOINT}:3000`,
  CAPTCHA_KEY: `6LfdxAsqAAAAAKgz_kC9H0j1vkIrF1hzh6aw8TSQ`,
} as const;