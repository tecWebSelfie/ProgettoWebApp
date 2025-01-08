import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

export const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${process.env.HOSTNAME}:${process.env.PORT}/graphql`,
  }),
);
