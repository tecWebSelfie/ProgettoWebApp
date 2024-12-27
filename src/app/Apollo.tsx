"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
  typeDefs: gql`
    extend type Query {
      TimeMachine: Date!
    }

    extend type Mutation {
      TimeMachine: Date!
    }
  `,
});

export default function Apollo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
