import { configDotenv } from "dotenv";

export const dotEnvOutput = configDotenv({
  path: [
    "./.env",
    "./.env.local",
    process.env.NODE_ENV === "development"
      ? "./.env.development"
      : "./.env.production",
    process.env.NODE_ENV === "development"
      ? "./.env.development.local"
      : "./.env.production.local",
  ],
});
