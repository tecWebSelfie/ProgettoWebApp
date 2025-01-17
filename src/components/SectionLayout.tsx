import React from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "./ui/sidebar";

export const SectionLayout: React.FC<{
  main: React.ReactNode;
  sidebar: React.ReactNode;
}> = ({ main, sidebar }) => {
  return (
    <SidebarProvider className="gap-2">
      <Sidebar collapsible="none">
        <SidebarContent className="px-14">{sidebar}</SidebarContent>
      </Sidebar>
      <main>{main}</main>
    </SidebarProvider>
  );
};
