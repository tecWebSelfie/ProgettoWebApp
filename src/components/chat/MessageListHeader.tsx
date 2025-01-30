"use client";

import { FragmentType, graphql, useFragment } from "@/src/gql";
import { AvatarImg } from "../AvatarImg";
import { FaArrowLeft } from "react-icons/fa6";
import { Button } from "../ui/button";

const messageListHeaderFragment = graphql(`
  fragment messageListHeader on User {
    name
    surname
    ...AvatarImg
  }
`);

export default function MessageListHeader(props: {
  messageListHeaderFragment: FragmentType<typeof messageListHeaderFragment>;
  goBack: () => void;
}) {
  const messageListHeaderData = useFragment(
    messageListHeaderFragment,
    props.messageListHeaderFragment,
  );
  return (
    <div className="flex flex-row items-center gap-3">
      <Button variant="ghost" size="icon" onClick={async () => props.goBack()}>
        <FaArrowLeft />
      </Button>
      {messageListHeaderData && (
        <AvatarImg avatarImgFragment={messageListHeaderData} />
      )}
      <span>{`${messageListHeaderData.name} ${messageListHeaderData.surname}`}</span>
    </div>
  );
}
