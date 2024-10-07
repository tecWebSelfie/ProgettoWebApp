import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { graphqlschema } from "../../db/models/event";
import mongoose from "mongoose";

const protocol = process.env.DB_PROTOCOL || "mongodb";
const username = process.env.MONGO_INITDB_ROOT_USERNAME || "";
const password = process.env.MONGO_INITDB_ROOT_PASSWORD || "";
const hostname = process.env.DB_HOSTNAME || "127.0.0.1";
const port = process.env.DB_PORT || 27017;
const dbname = process.env.DB_NAME || "db";
const dbauthsrc = process.env.DB_AUTHSRC || null;

mongoose.connect(
  `${protocol}://${username}:${password}@${hostname}:${port}/${dbname}`,
  { authSource: dbauthsrc },
);

const app = createYoga({ schema: graphqlschema, logging: "debug" });

export async function GET(request: NextRequest) {
  return app.handle(request);
}

export async function POST(request: NextRequest) {
  return app.handle(request);
}
