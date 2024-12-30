import { createHttpLink } from "@apollo/client";

export const httpLink = createHttpLink({
  uri: `http://${process.env.HOSTNAME}:${process.env.PORT}/graphql`,
});
