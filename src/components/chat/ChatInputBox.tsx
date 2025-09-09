"use client";

import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { ChatInput } from "../ui/chat/chat-input";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { ApolloCache, useMutation, useSuspenseQuery } from "@apollo/client";
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
    <div className="flex flex-row items-end gap-3">
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
            refetchQueries: ["messageList"],
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
              },
            },
            update(cache, { data }) {
              if (data?.message_createOne?.record) {
                cache.writeFragment({
                  fragment: graphql(`
                    fragment addMessage on User {
                      _id
                      conversation(attendeeId: $attendeeId) {
                        ...chatMessage
                      }
                    }
                  `),
                  fragmentName: "addMessage",
                  variables: {
                    attendeeId,
                  },
                  data: {
                    _id: session.user.id,
                    conversation: [data.message_createOne.record],
                  },
                });
              }
            },
          });
        }}
      >
        <Send className="size-4" />
      </Button>
    </div>
  );
}
