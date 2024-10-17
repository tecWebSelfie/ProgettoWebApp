import mongoose from "mongoose";

//compose mongodb url
const protocol = process.env.DB_PROTOCOL || "mongodb";
const username = process.env.MONGO_INITDB_ROOT_USERNAME || "";
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || "";
const hostname = process.env.DB_HOSTNAME || "127.0.0.1";
const port = process.env.DB_PORT || 27017;
const dbname = process.env.DB_NAME || "db";
const authSource = process.env.DB_AUTHSRC || null;
const dburi = `${protocol}://${username}:${password}@${hostname}:${port}/${dbname}`;

mongoose.connect(dburi, { authSource });
