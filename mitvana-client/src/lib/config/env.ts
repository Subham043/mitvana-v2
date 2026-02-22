import { env_development } from "./env.development";
import { env_production } from "./env.production";

/*
 * Function for generating config values based on the env mode
 */
function getEnv() {
  switch (import.meta.env.MODE) {
    case "development":
      return env_development;
    case "production":
      return env_production;
    default:
      return env_development;
  }
}

export const env = getEnv();