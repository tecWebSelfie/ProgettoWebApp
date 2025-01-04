import { Operation, split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { sseLink } from "./sseLink";

const checkIfOperationIsSubscription = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
};

export const finalLink = split(
  checkIfOperationIsSubscription,
  sseLink,
  new HttpLink({ uri: "http://localhost:3000/graphql" }),
);
