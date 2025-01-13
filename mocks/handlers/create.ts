import { delay, http, HttpResponse } from "msw";
import { createFormData } from "../stubs";

export const create = [
  // create
  http.post(`/api/submit`, async ({ request }) => {
    const token = request.headers.get("MSWtoken");
    await delay(500); // Wait for 500ms before responding.
    if (token === "valid") {
      return HttpResponse.json(createFormData, { status: 201 });
    } else {
      return HttpResponse.json(
        { message: "GENERAL_ERROR_MESSAGE" },
        { status: 500 }
      );
    }
  }),
];
