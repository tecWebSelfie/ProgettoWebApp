import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { FaUser } from "react-icons/fa";

const avatarImgFragment = graphql(`
  fragment AvatarImg on User {
    _id
    nickname
    name
    surname
    photo
  }
`);

export function AvatarImg(props: {
  avatarImgFragment: FragmentType<typeof avatarImgFragment>;
}) {
  const { nickname, name, surname, photo } = useFragment(
    avatarImgFragment,
    props.avatarImgFragment,
  );
  return (
    <Avatar className="cursor-pointer">
      <AvatarImage
        src={photo ?? undefined}
        alt={`${name} ${surname} profile badge`}
      />
      <AvatarFallback>
        {(name?.[0] ?? "") + (surname?.[0] ?? "") || nickname[0]}
      </AvatarFallback>
    </Avatar>
  );
}
