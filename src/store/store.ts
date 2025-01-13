import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counter } from "./slices/counterSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
