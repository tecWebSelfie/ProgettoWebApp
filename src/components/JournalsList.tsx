import { ScrollArea } from "./ui/scroll-area";
import { graphql } from "@/gql/gql";
import { FragmentType, useFragment } from "../gql";
import { JournalListItem } from "./JournalListItem";

const journalsListFragment = graphql(`
  fragment journalsListFragment on Query {
    journal_findMany {
      _id
      ...journalsListItem
    }
  }
`);

export function JournalsList(props: {
  journalsList: FragmentType<typeof journalsListFragment>;
}) {
  const journalsList = useFragment(journalsListFragment, props.journalsList);
  return (
    <>
      <ScrollArea>
        <div className="flex flex-col gap-0.5">
          {journalsList.journal_findMany.map((journalItem) => (
            <JournalListItem key={journalItem._id} journal={journalItem} />
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
