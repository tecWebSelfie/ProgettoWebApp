"use client";

import { SectionLayout } from "@/src/components/SectionLayout";
import { graphql } from "@/src/gql";
import { useSuspenseQuery } from "@apollo/client";
import CalendarMain from "./CalendarMain";
import CalendarSidebar from "./CalendarSidebar";

//remember to perform section specific query
const calendarSectionQuery = graphql(`
  query calendarSection {
    ...calendarMain
    ...calendarSidebar
  }
`);

export default function CalendarSection() {
  const { data } = useSuspenseQuery(calendarSectionQuery);
  return (
    <SectionLayout
      main={<CalendarMain parentDoc={data} />}
      sidebar={<CalendarSidebar parentDoc={data} />}
    />
  );
}
