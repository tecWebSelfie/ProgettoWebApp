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
import {
  ConversationsListQuery,
  ConversationsListQueryVariables,
  Scalars,
} from "@/src/gql/graphql";
import { Separator } from "@/components/ui/separator";
import { AvatarImg } from "../AvatarImg";
import ConversationsListItem from "./ConversationsListItem";
import { ExpandableChatHeader } from "../ui/chat/expandable-chat";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

export default function ConversationsList(props: {
  conversationsListQueryRef: TransportedQueryRef<
    ConversationsListQuery,
    ConversationsListQueryVariables
  >;
  loadConversation: (
    organizerId: Scalars["MongoID"]["input"],
    attendeeId: Scalars["MongoID"]["input"],
  ) => void;
}) {
  const {
    data: { user_findById },
  } = useReadQuery(props.conversationsListQueryRef);
  return (
    <>
      <ExpandableChatHeader>
        <Label className="text-lg">Conversations</Label>
      </ExpandableChatHeader>
      <ScrollArea className="pt-2">
        <div className="flex flex-col gap-2">
          {user_findById?.Messages?.map(
            (message) =>
              message && (
                <ConversationsListItem
                  key={message._id}
                  conversationsListItemFragment={message}
                  loadConversation={props.loadConversation}
                />
              ),
          )}
        </div>
      </ScrollArea>
    </>
  );
}
