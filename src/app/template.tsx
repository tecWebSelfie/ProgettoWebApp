"use client";

import StateProvider from "../store/StoreProvider";
import Apollo from "./Apollo";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Apollo>
      <StateProvider>{children}</StateProvider>
    </Apollo>
  );
}
