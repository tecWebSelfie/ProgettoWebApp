"use client";

import { graphql } from "@/gql/gql";
import { useQuery, gql } from "@apollo/client";

const TEST_QUERY = graphql(`
  query TestQuery($id: MongoID!) {
    notification_findById(_id: $id) {
      title
      _id
    }
  }
`);

export default function ApolloTest() {
  const id = "6728f4cab054e1d356685c46";
  const { data, loading, error } = useQuery(TEST_QUERY, { variables: { id } });

  return (
    <div>
      {loading && <h1>sto caricando</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <h1>{data.notification_findById?.title}</h1>}
    </div>
  );
}
