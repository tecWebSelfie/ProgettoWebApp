import { gql } from "@apollo/client";

export const TIME_MACHINE_FRAGMENT = gql`
  fragment TimeMachine on Query {
    TimeMachine @client
  }
`;
