import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { counter } from "./slices/counterSlice";
import { TM_Offset } from "./slices/TM_OffsetSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      counter,
      TM_Offset,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
