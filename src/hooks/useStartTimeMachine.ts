import { useEffect, useRef } from "react";
import { timeMachine } from "@/src/reactiveVars";
import { time } from "console";

export const useStartTimeMachine = () => {
  const timerRef = useRef(false);
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = true;
      setInterval(() => {
        timeMachine(new Date(timeMachine().getTime() + 1000));
      }, 1000);
    }
  }, []);
};
