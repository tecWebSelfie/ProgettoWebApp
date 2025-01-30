import { config as configEnv } from "dotenv";

console.log("node env is ", process.env.NODE_ENV);

configEnv({
  path: [
    ".env",
    ".env.local",
    ...(process.env.NODE_ENV === "development"
      ? [".env.development", ".env.development.local"]
      : [".env.production", ".env.production.local"]),
  ],
});
