import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Counter {
  value: number;
}

const initialState: Counter = {
  value: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increment: (counter) => {
      counter.value++;
    },
  },
});

export const counter = counterSlice.reducer;
export const { increment } = counterSlice.actions;
