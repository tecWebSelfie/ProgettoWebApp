"use client";

import { graphql } from "@/gql/gql";
import { Button } from "./ui/button";
import { FragmentType, useFragment } from "../gql";
import { Label } from "./ui/label";

const journalFragment = graphql(`
  fragment journalsListItem on Journal {
    summary
    Organizer {
      username
    }
  }
`);

export function JournalListItem(props: {
  journal: FragmentType<typeof journalFragment>;
}) {
  const { summary, Organizer } = useFragment(journalFragment, props.journal);
  return (
    <>
      {summary && (
        <Button className="w-full justify-between">
          <Label>{summary}</Label>{" "}
          {Organizer && (
            <Label className="text-gray-400">{Organizer.username}</Label>
          )}
        </Button>
      )}
    </>
  );
}
