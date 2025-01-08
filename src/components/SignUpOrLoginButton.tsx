"use client";

import { usePathname } from "next/navigation";
import { NavigationBarButton } from "./NavigationBarButton";
import { Button } from "./ui/button";
import { logIn } from "@/src/serverActions/logIn";

export function SignUpOrLoginButton() {
  return (
    <>
      {usePathname() != "/login" && (
        <Button onClick={async () => logIn()}>Login</Button>
        // <NavigationBarButton href="/login">Login</NavigationBarButton>
      )}
      {usePathname() != "/signup" && (
        <NavigationBarButton href="/signup">Sign Up</NavigationBarButton>
      )}
    </>
  );
}
