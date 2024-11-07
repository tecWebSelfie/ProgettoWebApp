import mongoose from "mongoose";

export interface DBConfig {
  readonly protocol: string;
  readonly username: string;
  readonly password: string;
  readonly hostname: string;
  readonly port: number;
  readonly dbname: string;
  readonly authSource: string;
  readonly uri: string;
}

export const dbConfig: DBConfig = {
  //compose mongodb url
  protocol: process.env.DB_PROTOCOL || "mongodb",
  username: process.env.MONGO_INITDB_ROOT_USERNAME || "admin",
  password: process.env.MONGO_INITDB_ROOT_PASSWORD || "password",
  hostname: process.env.DB_HOSTNAME || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 27017,
  dbname: process.env.DB_NAME || "db",
  authSource: process.env.DB_AUTHSRC || "admin",
  uri: `${process.env.DB_PROTOCOL}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=${process.env.DB_AUTHSRC}`,
};

export default dbConfig;
