"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { JournalsList } from "@/src/components/JournalsList";
import { graphql, useFragment } from "@/src/gql";
import { useQuery } from "@apollo/client";

const journalPageQuery = graphql(`
  query journalPageQuery {
    ...journalsListFragment
  }
`);

export default function Journal() {
  const { data, loading, error } = useQuery(journalPageQuery);
  return (
    <div className="flex flex-col md:flex-row gap-4 p-5">
      <div>
        <Label className="">Journal</Label>
        <Textarea />
        <Button>Save Note</Button>
      </div>
      <div>
        <Input placeholder="Search for a note..." />
        {data && <JournalsList journalsList={data} />}
      </div>
    </div>
  );
}
