"use client";

import { JournalsList } from "@/src/components/JournalsList";
import { Input } from "@/src/components/ui/input";
import { JournalPageQueryDocument } from "@/src/gql/graphql";
import { useSuspenseQuery } from "@apollo/client";

const journalPageQuery = JournalPageQueryDocument;

export default function JournalSidebar() {
  const { data } = useSuspenseQuery(journalPageQuery, {
    variables: { journalId: "123" },
  });
  return (
    <>
      <Input placeholder="Search for a journal..." />
      {data && <JournalsList journalsList={data} />}
    </>
  );
}
