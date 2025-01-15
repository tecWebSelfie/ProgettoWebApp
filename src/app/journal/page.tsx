"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { JournalsList } from "@/src/components/JournalsList";
import { graphql, useFragment } from "@/src/gql";
import { useQuery } from "@apollo/client";
import { JournalTextArea } from "@/src/components/JournalTextArea";
import { Types } from "mongoose";

const journalPageQuery = graphql(`
  query journalPageQuery($journalId: MongoID!) {
    ...journalTextAreaFragment
    ...journalsListFragment
  }
`);

export default function Journal() {
  const { data, loading, error } = useQuery(journalPageQuery);
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
