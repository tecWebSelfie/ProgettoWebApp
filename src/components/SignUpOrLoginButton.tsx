"use client";

import { usePathname } from "next/navigation";
import { NavigationBarButton } from "./NavigationBarButton";

export function SignUpOrLoginButton() {
  return (
    <>
      {usePathname() != "/login" && (
        <NavigationBarButton href="/login">Login</NavigationBarButton>
      )}
      {usePathname() != "/signup" && (
        <NavigationBarButton href="/signup">Sign Up</NavigationBarButton>
      )}
    </>
  );
}
