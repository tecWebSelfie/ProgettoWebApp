import React, { useEffect } from "react";
import { SidebarProvider, Sidebar, SidebarContent } from "./ui/sidebar";
import { Card, CardContent } from "./ui/card";

export const SectionLayout: React.FC<{
  main: React.ReactNode;
  sidebar: React.ReactNode;
}> = ({ main, sidebar }) => {
  return (
    <div className="w-full h-full flex gap-4 flex-col md:flex-row">
      <Card>
        <CardContent>{sidebar}</CardContent>
      </Card>
      <main className="w-full">{main}</main>
    </div>
  );
};
