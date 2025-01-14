import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { create } from "./api";

interface FormValues {
  fname: string;
  lname: string;
  address: string;
  email: string;
}

// export const submitForm = createAsyncThunk<
//   void, // Return type of the fulfilled action
//   formData:FormValues, // Argument type passed to the thunk
//   { rejectValue: string } // Custom type for the rejected payload
// >("/api/submit", async (formData, { rejectWithValue }) => {
//   try {
//     const response = await create("/api/submit", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       return rejectWithValue(errorData.message || "Failed to submit form");
//     }

//     return await response.json();
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return rejectWithValue(error.message || "Something went wrong");
//   }
// });

export const submitForm = createAsyncThunk<
  void,
  { formData: FormValues; token: string }
>("/api/submit", async ({ formData, token }, { rejectWithValue }) => {
  try {
    const response = await create(token as never, formData);
    if (response?.status >= 400 || !response) {
      return rejectWithValue(response.data);
    }

    toast.success("ok");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unknown error occurred");
    }
  }
});
