import { graphql } from "@/src/gql";
import { FragmentType } from "@/src/gql";
import { Pomodoro } from "@/src/components/pomodoro/Pomodoro";

const pomodoroMainFragment = graphql(`
  fragment pomodoroMain on Query {
    user_count #this is a placeholder
  }
`);

export default function PomodoroMain(props: {
  parentDoc: FragmentType<typeof pomodoroMainFragment>;
}) {
  return <Pomodoro />;
}
