import React from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "./ui/sidebar";

export const SectionLayout: React.FC<{
  main: React.ReactNode;
  sidebar: React.ReactNode;
}> = ({ main, sidebar }) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none">
        <SidebarContent>{sidebar}</SidebarContent>
      </Sidebar>
      {main}
    </SidebarProvider>
  );
};
