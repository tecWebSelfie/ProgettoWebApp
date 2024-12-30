import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  split,
  createHttpLink,
  Operation,
} from "@apollo/client";
import { finalLink } from "@/apolloLinks/finalLink";

const client = new ApolloClient({
  link: finalLink,
  cache: new InMemoryCache(),
});

export default function Apollo({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
