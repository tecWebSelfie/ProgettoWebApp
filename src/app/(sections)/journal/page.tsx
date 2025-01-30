"use client";

import { JournalsList } from "@/src/components/JournalsList";
import { JournalTextArea } from "@/src/components/JournalTextArea";
import { SectionLayout } from "@/src/components/SectionLayout";
import { graphql } from "@/src/gql";
import { useSuspenseQuery } from "@apollo/client";
import { Types } from "mongoose";
import JournalSidebar from "./JournalSidebar";
import JournalMain from "./JournalMain";

const journalSectionQuery = graphql(`
  query journalSection(
    $selectedJournalId: MongoID!
    $journalsPerPageInList: Int
    $nextJournalCursorInList: String
    $previousJournalCursorInList: String
    $inputSearchString: String
  ) {
    ...journalMain
    ...journalSidebar
  }
`);

export default function JournalSection() {
  const { data } = useSuspenseQuery(journalSectionQuery, {
    variables: { selectedJournalId: new Types.ObjectId().toString() },
  });
  return (
    <SectionLayout
      main={<JournalMain parentDoc={data} />}
      sidebar={<JournalSidebar parentDoc={data} />}
    />
  );
}
