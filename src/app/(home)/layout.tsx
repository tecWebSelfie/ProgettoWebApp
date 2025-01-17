import React from "react";
import { SectionWidget } from "@/src/components/SectionWidget";

export default function HomeLayout({
  journal,
  calendar,
  pomodoro,
}: {
  journal: React.ReactNode;
  calendar: React.ReactNode;
  pomodoro: React.ReactNode;
}) {
  return (
    <div className="p-4 md:p-10 flex flex-col md:grid md:grid-flow-row md:grid-cols-2 gap-10 items-center">
      <SectionWidget title="Calendar" description="Your calendar">
        {calendar}
      </SectionWidget>
      <SectionWidget title="Journal" description="Your journal">
        {journal}
      </SectionWidget>
      <SectionWidget title="Pomodoro" description="Your Pomodoro">
        {pomodoro}
      </SectionWidget>
    </div>
  );
}
