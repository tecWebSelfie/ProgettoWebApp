import { ResolveUserFn, useGenericAuth } from "@envelop/generic-auth";
import { YogaInitialContext, createYoga } from "graphql-yoga";
import { schema } from "@/db/gqlschema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth/lib";
import { mockedResolvers, mocks } from "./mocks";

//define here properties to inject in graphql contexts
const context = {};

//this is the function that will be passed to genericAuth. It must return either the user object or null
const resolveUserFn: ResolveUserFn<
  User,
  typeof context & YogaInitialContext & { request: NextAuthRequest }
> = async function (context) {
  console.log(
    "This output is in resolveUserFn(), " + context.request.auth?.user.scope,
  );
  return context.request.auth?.user;
};

export const yoga = createYoga({
  schema: process.env.MOCKING
    ? addMocksToSchema({ schema, mocks, preserveResolvers: true })
    : schema,
  plugins: [
    // eslint-disable-next-line
    useGenericAuth({
      mode: "protect-granular",
      resolveUserFn,
    }),
  ],
  fetchAPI: { Request: NextRequest, Response: Response, fetch },
  context,
  graphiql: {
    subscriptionsProtocol: "GRAPHQL_SSE",
  },
});
