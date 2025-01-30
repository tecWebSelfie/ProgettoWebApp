import { ResolveUserFn, useGenericAuth } from "@envelop/generic-auth";
import { useAPQ } from "@graphql-yoga/plugin-apq";
import { createYoga } from "graphql-yoga";
import { schema } from "@/db/gqlschema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { mocks } from "./mocks";
import { myContext as context } from "./context";
import type { YogaContext } from "./context";
//this is the function that will be passed to genericAuth. It must return either the user object or null
const resolveUserFn: ResolveUserFn<User, YogaContext> = async function (
  context,
) {
  console.log(
    "This output is in resolveUserFn(), " + context.request.auth?.user.scope,
  );
  return context.request.auth?.user;
};

export const yoga = createYoga({
  schema: process.env.MOCKING ? addMocksToSchema({ schema, mocks }) : schema,
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGenericAuth({
      mode: "protect-granular",
      resolveUserFn,
    }),
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useAPQ(),
  ],
  fetchAPI: { Request: NextRequest, Response: Response, fetch },
  context,
  graphiql: {
    subscriptionsProtocol: "GRAPHQL_SSE",
  },
});
