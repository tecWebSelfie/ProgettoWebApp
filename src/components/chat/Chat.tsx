"use client";

import { ExpandableChat } from "@/components/ui/chat/expandable-chat";
import React, { Suspense, useState } from "react";

import { graphql } from "@/src/gql";
import {
  ConversationsListQuery,
  ConversationsListQueryVariables,
  Scalars,
} from "@/src/gql/graphql";
import { TransportedQueryRef } from "@apollo/experimental-nextjs-app-support";
import { useLoadableQuery } from "@apollo/client";
import ConversationsList from "./ConversationsList";
import MessageList from "./MessageList";
import { Progress } from "../ui/progress";

export const messageListQuery = graphql(`
  query messageList($organizerId: MongoID!, $attendeeId: MongoID!) {
    organizer: user_findById(_id: $organizerId) {
      _id
      conversation(attendeeId: $attendeeId) {
        _id
        Organizer {
          _id
          ...AvatarImg
        }
        ...chatMessage
      }
    }
    attendee: user_findById(_id: $attendeeId) {
      ...messageListHeader
    }
  }
`);

export default function Chat({
  conversationsQueryRef,
  ...props
}: {
  conversationsQueryRef: TransportedQueryRef<
    ConversationsListQuery,
    ConversationsListQueryVariables
  >;
} & React.ComponentProps<typeof ExpandableChat>) {
  const [loadConversation, conversationQueryRef, { reset }] =
    useLoadableQuery(messageListQuery);
  // const [activeConversation, setActiveConversation] = useState<
  //   Scalars["MongoID"]["input"] | undefined
  // >(undefined);
  return (
    <ExpandableChat size="lg" position="bottom-right" {...props}>
      <Suspense fallback={<Progress value={33} />}>
        {!conversationQueryRef ? (
          <ConversationsList
            conversationsListQueryRef={conversationsQueryRef}
            loadConversation={(organizerId, attendeeId) =>
              loadConversation({ organizerId, attendeeId })
            }
          />
        ) : (
          <MessageList
            messageListQueryRef={conversationQueryRef}
            goBack={reset}
          />
        )}
      </Suspense>
    </ExpandableChat>
  );
}
