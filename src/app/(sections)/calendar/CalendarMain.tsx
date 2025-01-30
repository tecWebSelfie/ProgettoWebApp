import { graphql } from "@/src/gql";
import { FragmentType } from "@/src/gql";

const calendarMainFragment = graphql(`
  fragment calendarMain on Query {
    user_count #this is a placeholder
  }
`);

export default function CalendarMain(props: {
  parentDoc: FragmentType<typeof calendarMainFragment>;
}) {
  return <div>Calendar Main</div>;
}
