import { ResolveUserFn, useGenericAuth } from "@envelop/generic-auth";
import { YogaInitialContext, createYoga } from "graphql-yoga";
import { graphqlschema } from "../../db/gqlschema";
import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { NextAuthRequest } from "next-auth/lib";

//define here properties to inject in graphql contexts
const context = {};

//this is the function that will be passed to genericAuth. It must return either the user object or null
const resolveUserFn: ResolveUserFn<
  User,
  typeof context & YogaInitialContext & { request: NextAuthRequest }
> = async function (context) {
  console.log(context.request.auth?.user);
  return context.request.auth?.user;
};

export const yoga = createYoga({
  schema: graphqlschema,
  plugins: [
    // eslint-disable-next-line
    useGenericAuth({
      mode: "protect-all",
      resolveUserFn,
    }),
  ],
  fetchAPI: { Request: NextRequest, Response: Response, fetch },
  context,
});
