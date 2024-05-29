"use client";

import { useRef } from "react";
import { AppStore } from "./store";
import { makeStore } from "./store";
import { Provider } from "react-redux";

export default function StateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = useRef<AppStore>();
  if (!store.current) {
    store.current = makeStore();
  }

  return <Provider store={store.current}>{children}</Provider>;
}
