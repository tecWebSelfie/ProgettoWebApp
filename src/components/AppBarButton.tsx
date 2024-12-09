"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AppBarButton() {
  const pathname = usePathname();

  return (
    <Button variant="outline" asChild>
      {pathname == "/signup" ? (
        <Link href="/login">Login</Link>
      ) : (
        <Link href="/signup">Signup</Link>
      )}
    </Button>
  );
}
