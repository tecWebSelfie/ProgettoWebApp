import { Operation, split, HttpLink } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { hashSHA256 } from "@graphql-yoga/plugin-apq";
import { getMainDefinition } from "@apollo/client/utilities";
import { SSELink, sseLink } from "./sseLink";

const checkIfOperationIsSubscription = ({ query }: Operation) => {
  const definition = getMainDefinition(query);
  return (
    definition.kind === "OperationDefinition" &&
    definition.operation === "subscription"
  );
};

export const finalLink = split(
  checkIfOperationIsSubscription,
  new SSELink({ url: "http://localhost:3000/graphql" }),
  new HttpLink({ uri: "http://localhost:3000/graphql" }),
);

export const createFinalLink = () =>
  createPersistedQueryLink({
    useGETForHashedQueries: true,
    sha256: hashSHA256,
  }).concat(
    split(
      checkIfOperationIsSubscription,
      new SSELink({ url: "http://localhost:3000/graphql" }),
      new HttpLink({ uri: "http://localhost:3000/graphql" }),
    ),
  );
