import { YogaInitialContext } from "graphql-yoga";
import { Session } from "next-auth";

//define here properties to inject in graphql contexts
export const myContext = {};

export type YogaContext = typeof myContext &
  YogaInitialContext & {
    request: YogaInitialContext["request"] & { auth: Session };
  };
