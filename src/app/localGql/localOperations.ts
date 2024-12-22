import { graphql } from "@/gql/gql";

export const TIME_MACHINE_FRAGMENT = graphql(`
  fragment TimeMachineFragment on Query {
    timeMachine @client
  }
`);
