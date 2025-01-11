import { useEffect } from "react";
import { timeMachine } from "@/src/reactiveVars";

export const useStartTimeMachine = () => {
  useEffect(() => {
    console.log("Starting time machine");
    setInterval(() => {
      timeMachine(new Date(timeMachine().getTime() + 1000));
    }, 1000);
  }, []);
};
