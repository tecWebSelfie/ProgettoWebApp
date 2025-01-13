"use client";

import { useStartTimeMachine } from "@/hooks/useStartTimeMachine";
import { useRef } from "react";

export const StartTimeMachine = () => {
  console.log("Rendering time machine");
  useStartTimeMachine();
  return <></>;
};
