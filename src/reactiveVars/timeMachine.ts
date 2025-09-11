import { makeVar } from "@apollo/client";
import dayjs from "dayjs";

export const timeMachine = makeVar(dayjs());

setInterval(() => {
  console.log("Tick");
  timeMachine(timeMachine().add(1, "second"));
}, 1000);
