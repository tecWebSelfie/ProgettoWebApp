import { ScrollArea } from "./ui/scroll-area";
import { graphql } from "@/gql/gql";
import { FragmentType, useFragment } from "../gql";
import { JournalListItem } from "./JournalListItem";
import { Button } from "./ui/button";
import { useSuspenseQuery } from "@apollo/client";
import { JournalSectionDocument } from "../gql/graphql";
import { ListPagination } from "./ListPagination";
import { Input } from "./ui/input";
import { Suspense, useState } from "react";

const journalsListFragment = graphql(`
  fragment journalsListFragment on Query {
    journal_connection(
      first: $journalsPerPageInList
      after: $nextJournalCursorInList
      last: $journalsPerPageInList
      before: $previousJournalCursorInList
      filter: { summary: $inputSearchString }
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          _id
          ...journalsListItem
        }
      }
    }
  }
`);

const journalsListQuery = graphql(`
  query journalsListQuery(
    $journalsPerPageInList: Int
    $nextJournalCursorInList: String
    $previousJournalCursorInList: String
    $inputSearchString: String
  ) {
    ...journalsListFragment
  }
`);

export function JournalsList(props: {
  journalsList: FragmentType<typeof journalsListFragment>;
}) {
  const [searchString, setSearchString] = useState("");

  const { data: queryResult, refetch } = useSuspenseQuery(journalsListQuery, {
    variables: {
      inputSearchString: searchString || null,
    },
  });
  const { journal_connection: journalsList } = useFragment(
    journalsListFragment,
    queryResult,
  );

  return (
    <>
      <Input
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search Journals"
        value={searchString}
      />
      <ScrollArea>
        <div className="flex flex-col gap-0.5">
          {journalsList?.edges.map(({ node: journalItem }) => (
            <JournalListItem key={journalItem._id} journal={journalItem} />
          ))}
        </div>
      </ScrollArea>
      <ListPagination
        hasPreviousPage={journalsList?.pageInfo.hasPreviousPage}
        hasNextPage={journalsList?.pageInfo.hasNextPage}
        refetchPreviousPage={() =>
          refetch({
            nextJournalCursorInList: journalsList?.pageInfo.startCursor,
          })
        }
        refetchNextPage={() =>
          refetch({
            previousJournalCursorInList: journalsList?.pageInfo.endCursor,
          })
        }
      />
    </>
  );
}
