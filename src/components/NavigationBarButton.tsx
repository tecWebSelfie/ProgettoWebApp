import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";

export function NavigationBarButton({
  children = "Navigate",
  href = "/",
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <Button className={className} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
