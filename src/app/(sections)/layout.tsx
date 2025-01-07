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
  children,
  main,
  sidebar,
}: {
  children: React.ReactNode;
  main: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <SidebarProvider>
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
      <div className="w-full">{children ? children : main}</div>
    </SidebarProvider>
  );
}
