"use client";

import { Input } from "@/src/components/ui/input";
import { JournalsList } from "@/src/components/JournalsList";
import { graphql } from "@/src/gql";
import { useQuery } from "@apollo/client";
import { JournalTextArea } from "@/src/components/JournalTextArea";

const journalPageQuery = graphql(`
  query journalPageQuery($selectedJournalId: MongoID!) {
    ...journalTextAreaFragment
    ...journalsListFragment
  }
`);

export default function Journal() {
  const { data, loading, error } = useQuery(journalPageQuery, {
    variables: { selectedJournalId: "123" },
  });
  return (
    <div className="md:w-full  flex flex-col md:flex-row md:justify-center gap-4 p-5">
      {data && <JournalTextArea journal={data} />}
      <div className="flex flex-col gap-4">
        <Input placeholder="Search for a journal..." />
        {data && <JournalsList journalsList={data} />}
      </div>
    </div>
  );
}
