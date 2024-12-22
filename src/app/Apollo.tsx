"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { loadFilesSync } from "@graphql-tools/load-files";

const localTypeDefs = gql`
  extend type Query {
    TimeMachine: Date!
  }

  extend type Mutation {
    TimeMachine: Date!
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  typeDefs: localTypeDefs,
});

export default function Apollo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
