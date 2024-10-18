import mongoose from "mongoose";

export interface DBConfig {
  readonly protocol: String;
  readonly username: String;
  readonly password: String;
  readonly hostname: String;
  readonly port: Number;
  readonly dbname: String;
  readonly authSource: String;
  readonly url: String;
}

const dbConfig: DBConfig = {
  //compose mongodb url
  protocol: process.env.DB_PROTOCOL || "mongodb",
  username: process.env.MONGO_INITDB_ROOT_USERNAME || "",
  password: process.env.MONGO_INITDB_ROOT_PASSWORD || "",
  hostname: process.env.DB_HOSTNAME || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 27017,
  dbname: process.env.DB_NAME || "db",
  authSource: process.env.DB_AUTHSRC || null,
  url: `${process.env.DB_PROTOCOL}://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DB_HOSTNAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
};

export default dbConfig;
