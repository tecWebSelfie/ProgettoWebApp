"use client";

import { useMutation } from "@apollo/client";
import { graphql, FragmentType, useFragment } from "../gql";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FaRegPaperPlane } from "react-icons/fa";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { Types } from "mongoose";
import { JournalSectionDocument } from "../gql/graphql";

const journalTextAreaFragment = graphql(`
  fragment journalTextAreaFragment on Query {
    journal_findById(_id: $journalId) {
      summary
      description
    }
  }
`);

const saveJournalMutation = graphql(`
  mutation saveJournalMutation($newJournal: CreateOneJournalInput!) {
    journal_createOne(record: $newJournal) {
      record {
        _id
        summary
        description
      }
    }
  }
`);

export function JournalTextArea(props: {
  journal: FragmentType<typeof journalTextAreaFragment>;
}) {
  const { data: session } = useSession();

  const { journal_findById } = useFragment(
    journalTextAreaFragment,
    props.journal,
  );
  const [textAreaInput, setTextAreaInput] = useState(
    journal_findById?.description || "Write here",
  );
  const [titleInput, setTitleInput] = useState(
    journal_findById?.summary || "Insert Title",
  );

  const [saveJournal, { data, loading, error }] = useMutation(
    saveJournalMutation,
    {
      variables: {
        newJournal: {
          organizer: session?.user.id,
          summary: titleInput,
          description: textAreaInput,
        },
      },
    },
  );
  return (
    <div className="flex flex-col space-y-4 items-center">
      <Input
        className="text-2xl font-semibold"
        onChange={(e) => setTitleInput(e.target.value)}
        value={titleInput}
      />
      <Textarea
        rows={20}
        className="resize-none text-2xl"
        onChange={(e) => setTextAreaInput(e.target.value)}
        defaultValue={textAreaInput}
      />
      <Button
        className="w-20"
        onClick={() =>
          saveJournal({
            optimisticResponse: {
              journal_createOne: {
                record: {
                  __typename: "Journal",
                  _id: new Types.ObjectId(),
                  summary: titleInput,
                  description: textAreaInput,
                },
              },
            },
            refetchQueries: [JournalSectionDocument],
          })
        }
      >
        <span>Save Note</span> <FaRegPaperPlane />;
      </Button>
    </div>
  );
}
