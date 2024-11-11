import {
  ApolloLink,
  Operation,
  FetchResult,
  Observable,
} from "@apollo/client/core";
import { print, GraphQLError } from "graphql";
import { createClient, ClientOptions, Client } from "graphql-sse";

class SSELink extends ApolloLink {
  private client: Client;

  constructor(options: ClientOptions) {
    super();
    this.client = createClient(options);
  }

  public request(operation: Operation): Observable<FetchResult> {
    return new Observable((sink) => {
      return this.client.subscribe<FetchResult>(
        { ...operation, query: print(operation.query) },
        {
          next: (value) => sink.next(value as FetchResult),
          complete: sink.complete.bind(sink),
          error: sink.error.bind(sink),
        },
      );
    });
  }
}

export const sselink = new SSELink({
  url: "http://localhost:3000/graphql/stream",
});
