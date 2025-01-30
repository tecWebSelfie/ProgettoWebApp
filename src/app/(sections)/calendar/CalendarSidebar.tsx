import { graphql } from "@/src/gql";
import { FragmentType } from "@/src/gql";

const calendarSidebarFragment = graphql(`
  fragment calendarSidebar on Query {
    user_count #this is a placeholder
  }
`);

export default function CalendarSidebar(props: {
  parentDoc: FragmentType<typeof calendarSidebarFragment>;
}) {
  return <div>Calendar Sidebar</div>;
}
