"use server";

import { signIn } from "@/auth";
import { dbConfig } from "@/db/dbconfig";
import mongoose from "mongoose";
import { redirect } from "next/navigation";

mongoose.connect(dbConfig.uri);

export async function logIn(
  provider: string,
  credentials: {
    email: string;
    password: string;
  },
) {
  await signIn(provider, credentials);
  redirect("/");
}
