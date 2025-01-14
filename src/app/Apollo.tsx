"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  makeVar,
} from "@apollo/client";
import { finalLink } from "@/apolloLinks/finalLink";
import { timeMachine } from "../reactiveVars";
// import tm from "timemachine";

// tm.config({
//   dateString: "Thu, 01 Jan 2022 00:00:00 GMT",
//   tick: true,
// });

/*
local variable implemented using Apollo's reactive variables.
 to use it in a component, import it and call useReactiveVar(timeMachine)
 to update it, call timeMachine(new Date())
 to read it, call timeMachine()
when updated, every component that uses it will re-render and active queries will re-fetch
*/

// export const timeMachine = makeVar(new Date());

//date Machine ticks every second
// setInterval(() => {
//   timeMachine(new Date(timeMachine().getTime() + 1000));
// }, 1000);

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
