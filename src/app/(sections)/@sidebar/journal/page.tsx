"use client";

import { JournalsList } from "@/src/components/JournalsList";
import { Input } from "@/src/components/ui/input";
import { JournalPageQueryDocument } from "@/src/gql/graphql";
import { useQuery } from "@apollo/client";

const journalPageQuery = JournalPageQueryDocument;

export default function JournalSidebar() {
  const { data } = useQuery(journalPageQuery);
  return (
    <>
      <Input placeholder="Search for a journal..." />
      {data && <JournalsList journalsList={data} />}
    </>
  );
}
