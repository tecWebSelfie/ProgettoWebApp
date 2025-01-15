import { FragmentType, graphql, useFragment } from "@/src/gql";

const nIdFragment = graphql(`
  fragment nIdFragment on Notification {
    _id
  }
`);

export default function Pippier({
  nId,
}: {
  nId: FragmentType<typeof nIdFragment>;
}) {
  const data = useFragment(nIdFragment, nId);
  return (
    <>
      <h1>{data._id}</h1>
    </>
  );
}
