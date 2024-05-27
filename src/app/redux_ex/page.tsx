"use client";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { increment } from "../../store/slices/counterSlice";

export default function Counter() {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>the count is currently {counter}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}
