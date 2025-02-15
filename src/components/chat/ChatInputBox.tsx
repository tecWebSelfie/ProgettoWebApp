"use client";

import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { ChatInput } from "../ui/chat/chat-input";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { useMutation, useSuspenseQuery } from "@apollo/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

const chatInputBoxFragment = graphql(`
  fragment chatInputBox on User {
    _id
  }
`);

const chatInputBoxMutation = graphql(`
  mutation chatInputBox($message: CreateOneMessageInput!) {
    message_createOne(record: $message) {
      recordId
      record {
        summary
      }
      error {
        message
      }
    }
  }
`);

export default function ChatInputBox(
  props: {
    chatInputBoxFragment: FragmentType<typeof chatInputBoxFragment>;
  } & React.ComponentProps<typeof ChatInput>,
) {
  const { data: session } = useSession();

  const { _id: attendeeId } = useFragment(
    chatInputBoxFragment,
    props.chatInputBoxFragment,
  );
  const [submitMessage, result] = useMutation(chatInputBoxMutation);

  const [chatInputValue, setChatInputValue] = useState("");
  return (
    <>
      <ChatInput
        value={chatInputValue}
        placeholder="send a message..."
        onChange={(e) => setChatInputValue(e.target.value)}
      />
      <Button
        type="submit"
        size="icon"
        onClick={() => {
          console.log("submitting message");
          submitMessage({
            variables: {
              message: {
                summary: chatInputValue,
                organizer: session.user.id,
                attendees: [attendeeId],
              },
            },
            optimisticResponse: {
              message_createOne: {
                recordId: "optimistic",
                record: {
                  summary: "hello",
                },
                error: null,
              },
            },
          });
        }}
      >
        <Send className="size-4" />
      </Button>
    </>
  );
}
