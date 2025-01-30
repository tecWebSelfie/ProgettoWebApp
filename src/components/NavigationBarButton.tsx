import Link from "next/link";
import { Button, ButtonProps } from "@/components/ui/button";
import React from "react";
import { propagateServerField } from "next/dist/server/lib/render-server";

export function NavigationBarButton({
  href = "/",
  ...props
}: {
  href?: string;
} & ButtonProps) {
  return (
    <Button {...props} asChild>
      <Link href={href}>{props.children}</Link>
    </Button>
  );
}
