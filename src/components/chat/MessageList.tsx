"use client";

import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { Message } from "./Message";
import {
  QueryRef,
  useApolloClient,
  useQuery,
  useQueryRefHandlers,
  useReadQuery,
  useSuspenseQuery,
} from "@apollo/client";
import { TransportedQueryRef } from "@apollo/experimental-nextjs-app-support";
import { MessageListQuery, MessageListQueryVariables } from "@/src/gql/graphql";
import {
  ExpandableChatFooter,
  ExpandableChatHeader,
} from "../ui/chat/expandable-chat";
import MessageListHeader from "./MessageListHeader";
import { ChatInput } from "../ui/chat/chat-input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

export default function MessageList(props: {
  messageListQueryRef: TransportedQueryRef<
    MessageListQuery,
    MessageListQueryVariables
  >;
  goBack: () => void;
  // messagesListFragment: FragmentType<typeof messagesListFragment>;
}) {
  const { data: messagesList } = useReadQuery(props.messageListQueryRef);
  return (
    <>
      <ExpandableChatHeader>
        {messagesList.attendee && (
          <MessageListHeader
            messageListHeaderFragment={messagesList.attendee}
            goBack={props.goBack}
          />
        )}
      </ExpandableChatHeader>
      <ChatMessageList>
        {messagesList?.organizer?.conversation?.map(
          (message) =>
            message && <Message key={message._id} chatMessage={message} />,
        )}
      </ChatMessageList>
      <ExpandableChatFooter>
        <ChatInput placeholder="send a message..." />
        <Button type="submit" size="icon">
          <Send className="size-4" />
        </Button>
      </ExpandableChatFooter>
    </>
  );
}
