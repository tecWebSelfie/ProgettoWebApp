"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  makeVar,
} from "@apollo/client";
import { finalLink } from "@/apolloLinks/finalLink";

/*
local variable implemented using Apollo's reactive variables.
 to use it in a component, import it and call useReactiveVar(timeMachine)
 to update it, call timeMachine(new Date())
 to read it, call timeMachine()
when updated, every component that uses it will re-render and active queries will re-fetch
*/
const timeMachine = makeVar(new Date());

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  link: finalLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          timeMachine: {
            read: () => timeMachine(),
          },
        },
      },
    },
  }),
  typeDefs: gql`
    extend type Query {
      timeMachine: Date!
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
