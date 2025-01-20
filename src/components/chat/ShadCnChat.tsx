import { Send } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ShadCnChat(
  props: React.ComponentProps<typeof ExpandableChat>,
) {
  return (
    <ExpandableChat size="lg" position="bottom-right" {...props}>
      <ExpandableChatHeader className="flex-row text-center justify-start gap-4">
        <Avatar className="cursor-pointer">
          <AvatarImage src="/avatar.jpg" alt="Profile Badge" />
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
        <h1 className="text-xl font-semibold">Mario Rossi</h1>
        {/* <div className="flex gap-2 items-center pt-2">
          <Button variant="secondary">New Chat</Button>
          <Button variant="secondary">See FAQ</Button>
        </div> */}
      </ExpandableChatHeader>
      <ExpandableChatBody>
        <ChatMessageList>
          <ChatBubble>
            <ChatBubbleAvatar />
            <ChatBubbleMessage variant="received">testing</ChatBubbleMessage>
          </ChatBubble>
          <ChatBubble variant="sent">
            <ChatBubbleAvatar fallback="MR" />
            <ChatBubbleMessage>burdega</ChatBubbleMessage>
          </ChatBubble>
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <ChatInput placeholder="send a message..." />
        <Button type="submit" size="icon">
          <Send className="size-4" />
        </Button>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
