import { makeVar } from "@apollo/client";
import dayjs from "dayjs";

export const timeMachine = makeVar(dayjs());
