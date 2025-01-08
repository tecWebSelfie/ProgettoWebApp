"use server";

import { signIn } from "@/auth";

export async function logIn() {
  await signIn();
}
