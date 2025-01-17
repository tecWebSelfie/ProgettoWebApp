import { useMutation } from "@apollo/client";
import { graphql, FragmentType, useFragment } from "../gql";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

const journalTextAreaFragment = graphql(`
  fragment journalTextAreaFragment on Query {
    journal_findById(_id: $selectedJournalId) {
      summary
      description
    }
  }
`);

const saveJournalMutation = graphql(`
  mutation saveJournalMutation($newJournal: CreateOneJournalInput!) {
    journal_createOne(record: $newJournal) {
      error {
        message
      }
    }
  }
`);

export function JournalTextArea(props: {
  journal: FragmentType<typeof journalTextAreaFragment>;
}) {
  const { journal_findById } = useFragment(
    journalTextAreaFragment,
    props.journal,
  );
  const [textAreaInput, setTextAreaInput] = useState(
    journal_findById?.description || "Write here",
  );
  const [saveJournal, { data, loading, error }] =
    useMutation(saveJournalMutation);
  return (
    <div>
      <Input value={journal_findById?.summary || "Insert Title"} />
      <Textarea
        onChange={(e) => setTextAreaInput(e.target.value)}
        defaultValue={textAreaInput}
      />
      <Button>Save Note</Button>
    </div>
  );
}
