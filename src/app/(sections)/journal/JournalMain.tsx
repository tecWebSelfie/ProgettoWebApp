import { FragmentType, graphql, useFragment } from "@/src/gql";
import { JournalTextArea } from "@/src/components/JournalTextArea";

const journalMainFragment = graphql(`
  fragment journalMain on Query {
    ...journalTextAreaFragment
  }
`);

export default function JournalMain(props: {
  parentDoc: FragmentType<typeof journalMainFragment>;
}) {
  const mainFragment = useFragment(journalMainFragment, props.parentDoc);
  return <JournalTextArea journal={mainFragment} />;
}
