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
import ChatInputBox from "./ChatInputBox";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { useEffect } from "react";

const newMessagesSubscription = graphql(`
  subscription newMessages {
    newMessages {
      _id
      Organizer {
        _id
        ...AvatarImg
      }
      ...chatMessage
    }
  }
`);

export default function MessageList(props: {
  messageListQueryRef: TransportedQueryRef<
    MessageListQuery,
    MessageListQueryVariables
  >;
  goBack: () => void;
  // messagesListFragment: FragmentType<typeof messagesListFragment>;
}) {
  const { subscribeToMore } = useQueryRefHandlers(props.messageListQueryRef);
  const { data: messagesList } = useReadQuery(props.messageListQueryRef);

  useEffect(() => {
    subscribeToMore({
      document: newMessagesSubscription,
      updateQuery(prev, { subscriptionData }) {
        return Object.assign({}, prev, {
          organizer: {
            ...prev.organizer,
            conversation: [
              ...(prev.organizer?.conversation ?? []),
              subscriptionData.data.newMessages,
            ],
          },
        });
      },
    });
  });

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
        {messagesList.organizer && (
          <ChatInputBox chatInputBoxFragment={messagesList.organizer} />
        )}
      </ExpandableChatFooter>
    </>
  );
}
