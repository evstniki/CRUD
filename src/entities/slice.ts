import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { submitForm } from "./asyncThunks";

interface FormState {
  loading: string;
  error: string | null;
  success: boolean;
}

export enum ApiStatus {
  Idle = "idle",
  Pending = "pending",
  Rejected = "rejected",
  Fulfilled = "fulfilled",
}

const initialState: FormState = {
  loading: ApiStatus.Idle,
  error: "",
  success: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = ApiStatus.Idle;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.pending, (state) => {
      state.loading = ApiStatus.Pending;
      state.error = null;
      state.success = false;
    });
    builder.addCase(submitForm.fulfilled, (state) => {
      state.loading = ApiStatus.Fulfilled;
      state.success = true;
    });
    builder.addCase(
      submitForm.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.loading = ApiStatus.Rejected;
        state.error = action.payload || "An unknown error occurred";
        state.success = false;
      }
    );
  },
});

export const { resetState } = formSlice.actions;

export default formSlice.reducer;
