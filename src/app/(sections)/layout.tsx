import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

export default function SectionLayout({
  main,
  sidebar,
}: {
  main: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <SidebarProvider className="gap-10">
      <Sidebar
        side="right"
        collapsible="none"
        variant="inset"
        className="gap-4"
      >
        <SidebarInset>
          <SidebarContent>{sidebar}</SidebarContent>
        </SidebarInset>
      </Sidebar>
      <div className="w-full h-full">{main}</div>
    </SidebarProvider>
  );
}
