import { FragmentType, graphql, useFragment } from "@/src/gql";
import Pippier from "./Pippier";

const notificationQuery = graphql(`
  fragment notificationQuery on Query {
    notification_findOne {
      _id
      body
      ...nIdFragment
    }
  }
`);

export default function Sumier({
  notification,
}: {
  notification: FragmentType<typeof notificationQuery>;
}) {
  const data = useFragment(notificationQuery, notification);

  return (
    <>
      <h1>pippo</h1>
      <h1>{data.notification_findOne?.body}</h1>
      {data.notification_findOne && <Pippier nId={data.notification_findOne} />}
    </>
  );
}
