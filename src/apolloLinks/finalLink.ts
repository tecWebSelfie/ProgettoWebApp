import { Operation, split } from "@apollo/client";
import { httpLink } from "./httpLink";
import { wsLink } from "./wsLink";
import { getMainDefinition } from "@apollo/client/utilities";

const checkIfOperationIsSubscription = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
};

export const finalLink = split(
  checkIfOperationIsSubscription,
  wsLink,
  httpLink,
);
