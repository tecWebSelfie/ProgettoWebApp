import { JournalsList } from "@/src/components/JournalsList";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/src/components/ui/sidebar";
import { FragmentType, graphql, useFragment } from "@/src/gql";

const journalSidebarFragment = graphql(`
  fragment journalSidebar on Query {
    ...journalsListFragment
  }
`);

export default function JournalSidebar(props: {
  parentDoc: FragmentType<typeof journalSidebarFragment>;
}) {
  const sideBarFragment = useFragment(journalSidebarFragment, props.parentDoc);
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Journals List</SidebarGroupLabel>
      <SidebarGroupContent>
        <JournalsList journalsList={sideBarFragment} />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
