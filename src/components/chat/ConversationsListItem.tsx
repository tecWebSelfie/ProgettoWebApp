import { FragmentType, graphql, useFragment } from "@/src/gql";
import { AvatarImg } from "../AvatarImg";
import { Separator } from "../ui/separator";
import { Scalars } from "@/src/gql/graphql";

const conversationsListItemFragment = graphql(`
  fragment conversationsListItem on Message {
    _id
    Organizer {
      _id
      ...AvatarImg
    }
    summary
    Attendees {
      _id
    }
  }
`);

export default function ConversationsListItem(props: {
  conversationsListItemFragment: FragmentType<
    typeof conversationsListItemFragment
  >;
  loadConversation: (
    organizerId: Scalars["MongoID"]["input"],
    attendeeId: Scalars["MongoID"]["input"],
  ) => void;
}) {
  const message = useFragment(
    conversationsListItemFragment,
    props.conversationsListItemFragment,
  );
  return (
    <>
      <div
        className="flex flex-row ps-3 items-baseline gap-3"
        onClick={() =>
          props.loadConversation(
            message.Organizer!!._id,
            message.Attendees[0]._id,
          )
        }
      >
        {message.Organizer && (
          <AvatarImg avatarImgFragment={message.Organizer} />
        )}
        <span>{message.summary}</span>
      </div>
    </>
  );
}
