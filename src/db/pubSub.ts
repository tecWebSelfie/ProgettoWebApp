import { createPubSub } from "graphql-yoga";
import { IMessage } from "./models/message";

export const pubSub = createPubSub<{
  n: [n: number];
  "user:messages": [userId: string, { message: IMessage }];
}>();
