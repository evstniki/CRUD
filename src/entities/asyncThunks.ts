import { createAsyncThunk } from "@reduxjs/toolkit";
import { create } from "./api";

interface FormValues {
  fname: string;
  lname: string;
  address: string;
  email: string;
}

export const submitForm = createAsyncThunk<
  void, // Return type of the fulfilled action
  FormValues, // Argument type passed to the thunk
  { rejectValue: string } // Custom type for the rejected payload
>("form/submitForm", async (formData, { rejectWithValue }) => {
  try {
    const response = await create("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to submit form");
    }

    return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong");
  }
});
