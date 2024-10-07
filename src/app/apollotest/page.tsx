"use client";

import { useQuery, gql } from "@apollo/client";

const TEST_QUERY = gql`
  query TestQuery($id: MongoID!) {
    event_findById(_id: $id) {
      name
    }
  }
`;
export default function ApolloTest() {
  const id = "67040c3501c258864be1562b";
  const { data, loading, error } = useQuery(TEST_QUERY, { variables: { id } });
  return (
    <div>
      {loading && <h1>sto caricando</h1>}
      {error && <h1>{error.message}</h1>}
      {data && <h1>{data.event_findById.name}</h1>}
    </div>
  );
}
