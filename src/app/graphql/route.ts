import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { graphqlschema } from "../../db/gqlschema";
import dbConfig from "../../db/dbconfig";
import mongoose from "mongoose";

mongoose.connect(dbConfig.uri, { authSource: dbConfig.authSource });

const app = createYoga({ schema: graphqlschema, logging: "debug" });

export async function GET(request: NextRequest) {
  return app.handle(request);
}

export async function POST(request: NextRequest) {
  return app.handle(request);
}
