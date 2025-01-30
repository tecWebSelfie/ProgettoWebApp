import { graphql } from "@/src/gql";
import { FragmentType } from "@/src/gql";

const pomodoroSidebarFragment = graphql(`
  fragment pomodoroSidebar on Query {
    user_count #this is a placeholder
  }
`);

export default function PomodoroSidebar(props: {
  parentDoc: FragmentType<typeof pomodoroSidebarFragment>;
}) {
  return <div>Pomodoro Sidebar</div>;
}
