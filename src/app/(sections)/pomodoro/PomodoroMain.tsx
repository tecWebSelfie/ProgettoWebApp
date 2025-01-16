import { graphql } from "@/src/gql";
import { FragmentType } from "@/src/gql";

const pomodoroMainFragment = graphql(`
  fragment pomodoroMain on Query {
    user_count #this is a placeholder
  }
`);

// export default function PomodoroMain(props :{
//     parentDoc : FragmentType<typeof pomodoroMainFragment>
// }){
//     return <div>Pomodoro Main</div>
// }
