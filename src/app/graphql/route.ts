import { NextRequest } from "next/server";
import { createYoga } from "graphql-yoga";
import { graphqlschema } from "../../db/models/event";
import mongoose from "mongoose";

mongoose.connect(process.env.DATABASE_URL, { authSource: "admin" });
console.log(process.env.DATABASE_URL);

const app = createYoga({ schema: graphqlschema });

export async function GET(request: NextRequest) {
  return app.handle(request);
}

export async function POST(request: NextRequest) {
  return app.handle(request);
}
