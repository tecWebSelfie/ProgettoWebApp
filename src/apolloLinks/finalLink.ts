import { Operation, split } from "@apollo/client";
import { httpLink } from "./httpLink";
import { wsLink } from "./wsLink";

export const finalLink = split(
  (op: Operation) => op.operationName === "Subscription",
  wsLink,
  httpLink,
);
