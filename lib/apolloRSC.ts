import { SchemaLink } from "@apollo/client/link/schema";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { yoga } from "@/src/app/graphql/yogaServer";

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    //since we are on server we can use schemaLink (no need of an http request)
    link: new SchemaLink({
      validate: true,
      schema: yoga.getEnveloped().schema,
    }),
  });
});
