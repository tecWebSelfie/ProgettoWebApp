import { config as configEnv } from "dotenv";

export const dotEnvOutput = configEnv({
  path: [
    ".env",
    ".env.local",
    ...(process.env.NODE_ENV === "production"
      ? [".env.production", ".env.production.local"]
      : [".env.development", ".env.production.local"]),
  ],
});
