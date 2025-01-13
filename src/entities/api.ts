import axios, { AxiosRequestConfig } from "axios";
import { FormValues } from "../component/Form"; // Assuming FormValues is in a separate `types` file

export async function create(
  details: FormValues,
  options: { signal?: AbortSignal; token?: string } = {}
) {
  const { signal, token = "valid" } = options;

  const config: AxiosRequestConfig = {
    headers: { MSWtoken: token },
    signal,
  };

  try {
    const response = await axios.post("/api/submit", details, config);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.error("Request canceled:", error.message);
      throw new Error("Request was canceled");
    }
    console.error("Error creating owner:", error);
    throw error;
  }
}
