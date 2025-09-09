import { useEffect, useRef } from "react";

export const useStartTimeMachine = () => {
  const timerRef = useRef(false);
  useEffect(() => {
    if (!timerRef.current) {
      timerRef.current = true;
      // with import() we can start ticking exactly when timeMachine is used
      import("@/src/reactiveVars/timeMachine").then(({ timeMachine }) => {
        setInterval(() => {
          timeMachine(timeMachine().add(1, "second"));
        }, 1000);
      });
    }
  }, []);
};
