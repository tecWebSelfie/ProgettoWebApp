"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloNextAppProvider,
} from "@apollo/experimental-nextjs-app-support";
import { gql, HttpLink } from "@apollo/client";
import { finalLink, makeFinalLink } from "@/apolloLinks/finalLink";

// have a function to create a client for you
function makeClient() {
  const finalLink = makeFinalLink();
  // const httpLink = new HttpLink({
  // this needs to be an absolute url, as relative urls cannot be used in SSR
  // uri: "http://localhost:3000/graphql",
  // you can disable result caching here if you want to
  // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
  // fetchOptions: { cache: "no-store" },
  // you can override the default `fetchOptions` on a per query basis
  // via the `context` property on the options passed as a second argument
  // to an Apollo Client data fetching hook, e.g.:
  // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  // });

  // use the `ApolloClient` from "@apollo/experimental-nextjs-app-support"
  return new ApolloClient({
    // use the `InMemoryCache` from "@apollo/experimental-nextjs-app-support"
    cache: new InMemoryCache(),
    link: finalLink,
    typeDefs: gql`
      extend type Query {
        TimeMachine: Date!
      }

      extend type Mutation {
        TimeMachine: Date!
      }
    `,
  });
}

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql",
//   link: finalLink,
//   cache: new InMemoryCache(),
//   typeDefs: gql`
//     extend type Query {
//       TimeMachine: Date!
//     }

//     extend type Mutation {
//       TimeMachine: Date!
//     }
//   `,
// });

export default function Apollo({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
