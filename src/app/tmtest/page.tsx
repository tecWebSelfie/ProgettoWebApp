"use client";

import { Button } from "@/src/components/ui/button";
import { graphql } from "@/src/gql";
import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { timeMachine } from "@/src/reactiveVars";
// import timemachine from "timemachine";

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
      {data?.timeMachine.toString() || "I don't know, sorry :("}
      <Button
        onClick={
          () => {
            timeMachine(new Date("Thu, 01 Jan 1971 00:00:00 GMT"));
          }
          // onClick={() => {
          //   timemachine.config({
          //     dateString: "Thu, 01 Jan 1971 00:00:00 GMT",
          //     tick: true,
          //   });
          // }}
        }
      >
        Click to back to 1971
      </Button>
    </div>
  );
}
