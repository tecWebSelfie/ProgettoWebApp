import { config as configEnv } from "dotenv";

console.log("node env is ", process.env.NODE_ENV);

export const dev = process.env.NODE_ENV === "development";

configEnv({
  path: [
    ".env",
    ".env.local",
    ...(dev
      ? [".env.development", ".env.development.local"]
      : [".env.production", ".env.production.local"]),
  ],
});
