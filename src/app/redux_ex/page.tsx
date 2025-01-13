"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { increment, decrement } from "../../store/slices/counterSlice";
import { setTM_Offset } from "../../store/slices/TM_OffsetSlice";

export default function Counter() {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const counter = useAppSelector((state) => state.counter.value);
  const tmOffset = useAppSelector((state) => state.TM_Offset.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>the count is currently {counter}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <input type="date" id="TM"></input>
      <button
        onClick={() => dispatch(setTM_Offset("July 20, 69 20:17:40 GMT+00:00"))}
      >
        SetDate
      </button>
      <p>banana split {tmOffset}</p>
    </div>
  );
}
