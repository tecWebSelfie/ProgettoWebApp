"use client";

import { graphql } from "@/gql/gql";
import Sumier from "./Sumier";
import { useQuery } from "@apollo/client";

const TEST_QUERY = graphql(`
  query TestQuery {
    event_findOne {
      _id
    }
    ...notificationQuery
  }
`);

export default function ApolloTest() {
  //const { data, loading, error } = useQuery(TEST_QUERY);
  const { data, loading, error } = useQuery(TEST_QUERY);
  data?.event_findOne?._id;
  return (
    <div>
      {loading && <h1>sto caricando</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <Sumier notification={data} />}
    </div>
  );
}
