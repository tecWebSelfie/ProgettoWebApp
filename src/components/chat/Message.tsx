"use client";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { useSession } from "next-auth/react";

const chatMessageFragment = graphql(`
  fragment chatMessage on Message {
    _id
    Organizer {
      _id
      name
      surname
      photo
    }
    summary
  }
`);

export function Message(props: {
  chatMessage: FragmentType<typeof chatMessageFragment>;
}) {
  const message = useFragment(chatMessageFragment, props.chatMessage);
  const { data: session } = useSession();
  return (
    <ChatBubble>
      <ChatBubbleAvatar
        src={message.Organizer?.photo || undefined}
        fallback={
          (message.Organizer?.name?.[0] ?? "") +
          (message.Organizer?.surname?.[0] ?? "")
        }
      />
      <ChatBubbleMessage
        variant={
          message.Organizer?._id === session?.user.id ? "sent" : "received"
        }
      >
        {message.summary}
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
