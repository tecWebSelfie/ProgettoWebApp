"use client";

import { SectionLayout } from "@/src/components/SectionLayout";
import { graphql } from "@/src/gql";
import PomodoroMain from "./PomodoroSidebar";
import { useSuspenseQuery } from "@apollo/client";
import PomodoroSidebar from "./PomodoroSidebar";

//remember to perform section specific query
const pomodoroSectionQuery = graphql(`
  query pomodoroSection {
    ...pomodoroMain
    ...pomodoroSidebar
  }
`);

export default function PomodoroSection() {
  const { data } = useSuspenseQuery(pomodoroSectionQuery);
  return (
    <SectionLayout
      main={<PomodoroMain parentDoc={data} />}
      sidebar={<PomodoroSidebar parentDoc={data} />}
    />
  );
}
