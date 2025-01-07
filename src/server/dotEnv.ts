import { config as configEnv } from "dotenv";

console.log("node env is ", process.env.NODE_ENV);

export const dev = process.env.NODE_ENV === "development";

export const dotEnvOutput = configEnv({
  path: [
    ".env",
    ".env.local",
    dev ? ".env.development" : ".env.production",
    dev ? ".env.development.local" : ".env.production.local",
  ],
});
