import React, { useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "./ui/sidebar";

export const SectionLayout: React.FC<{
  main: React.ReactNode;
  sidebar: React.ReactNode;
}> = ({ main, sidebar }) => {
  return (
    <>
      <SidebarProvider className="gap-2 hidden md:flex">
        <Sidebar collapsible="none" className="md:basis-1/3">
          <SidebarContent>{sidebar}</SidebarContent>
        </Sidebar>
        <main className="w-full flex flex-col gap-3">{main}</main>
      </SidebarProvider>
      <div className="flex flex-col gap-3 md:hidden">
        {main} {sidebar}
      </div>
    </>
  );
};
