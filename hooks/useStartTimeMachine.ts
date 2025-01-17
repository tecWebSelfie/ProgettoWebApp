import { useEffect, useRef } from "react";
import { timeMachine } from "@/src/reactiveVars";
import { time } from "console";

export const useStartTimeMachine = () => {
  const timerRef = useRef(false);
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = true;
      setInterval(() => {
        timeMachine(timeMachine().add(1, "second"));
      }, 1000);
    }
  }, []);
};
