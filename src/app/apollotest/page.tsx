"use client";

import { graphql } from "@/gql/gql";
import { useQuery, gql } from "@apollo/client";
import Sumier from "./Sumier";

const TEST_QUERY = graphql(`
  query TestQuery {
    ...notificationQuery
  }
`);

export default function ApolloTest() {
  const { data, loading, error } = useQuery(TEST_QUERY);

  return (
    <div>
      {loading && <h1>sto caricando</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <Sumier notification={data} />}
    </div>
  );
}
