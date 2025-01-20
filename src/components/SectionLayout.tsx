import React from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "./ui/sidebar";

export const SectionLayout: React.FC<{
  main: React.ReactNode;
  sidebar: React.ReactNode;
}> = ({ main, sidebar }) => {
  return (
    <SidebarProvider className="gap-2">
      <Sidebar collapsible="none">
        <SidebarContent>{sidebar}</SidebarContent>
      </Sidebar>
      <main className="w-full flex flex-col gap-3">{main}</main>
    </SidebarProvider>
  );
};
