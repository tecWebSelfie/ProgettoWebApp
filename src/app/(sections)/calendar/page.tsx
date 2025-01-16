import { JournalsList } from "@/src/components/JournalsList";
import { JournalTextArea } from "@/src/components/JournalTextArea";
import { SectionLayout } from "@/src/components/SectionLayout";
import { graphql } from "@/src/gql";
import { useSuspenseQuery } from "@apollo/client";
import { Types } from "mongoose";

const journalSectionQuery = graphql(`
  query journalSection($journalId: MongoID!) {
    ...journalTextAreaFragment
    ...journalsListFragment
  }
`);

export default function JournalSection() {
  const { data } = useSuspenseQuery(journalSectionQuery, {
    variables: { journalId: new Types.ObjectId() },
  });
  return (
    <SectionLayout
      main={<JournalTextArea journal={data} />}
      sidebar={<JournalsList journalsList={data} />}
    />
  );
}
