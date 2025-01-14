import axios from "axios";
import { FormValues } from "../component/Form";
// export async function create(
//   details: FormValues,
//   options: { signal?: AbortSignal; token?: string } = {}
// ) {
//   const { signal, token = "valid" } = options;

//   const config: AxiosRequestConfig = {
//     headers: { MSWtoken: token },
//     signal,
//   };

//   try {
//     const response = await axios.post("/api/submit", details, config);
//     return response.data;
//   } catch (error) {
//     if (axios.isCancel(error)) {
//       console.error("Request canceled:", error.message);
//       throw new Error("Request was canceled");
//     }
//     console.error("Error creating owner:", error);
//     throw error;
//   }
// }

// export const create = async (token: string, formData: FormValues) => {
//   // Example using fetch
//   const response = await fetch("api/submit", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(formData),
//   });
//   return response.json();
// };

export interface IFetchApiConfig {
  signal: AbortSignal;
  token?: string;
}

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("Base URL:", baseURL); // Debugging

const api = axios.create({
  baseURL: baseURL,
});
export function create(
  { signal, token = "valid" }: IFetchApiConfig,
  details: FormValues
) {
  return api.post("/api/submit", details, {
    headers: { MSWtoken: token },
    signal,
  });
}
