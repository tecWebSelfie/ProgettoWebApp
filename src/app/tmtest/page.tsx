"use client";

import { graphql } from "@/src/gql";
import { gql, useQuery } from "@apollo/client";

const tmTestQuery = gql`
  query tmTest {
    timeMachine @client
  }
`;

export default function TmTest() {
  const { data, loading, error } = useQuery(tmTestQuery);

  return (
    <div>
      current time is:{" "}
      {data?.timeMachine.toDateString() || "I don't know, sorry :("}
    </div>
  );
}
