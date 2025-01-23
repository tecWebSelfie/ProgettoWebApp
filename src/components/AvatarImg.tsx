import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FragmentType, graphql, useFragment } from "@/src/gql";
import { FaUser } from "react-icons/fa";

const avatarImgFragment = graphql(`
  fragment AvatarImg on User {
    _id
    name
    surname
    photo
  }
`);

export function AvatarImg(props: {
  avatarImgFragment: FragmentType<typeof avatarImgFragment>;
}) {
  const { name, surname, photo } = useFragment(
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
        <FaUser />
      </AvatarFallback>
    </Avatar>
  );
}
