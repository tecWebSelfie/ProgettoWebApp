import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { yearsToMonths } from "date-fns";

interface TM_Offset {
  value: number;
}

const initialState: TM_Offset = {
  value: 0,
};

const TM_OffsetSlice = createSlice({
  name: "TM_Offset",
  initialState: initialState,
  reducers: {
    setTM_Offset: (tm_offset, action) => {
      tm_offset.value = Date.now() - new Date(action.payload).getTime();
    },
  },
});

export const TM_Offset = TM_OffsetSlice.reducer;
export const { setTM_Offset } = TM_OffsetSlice.actions;
