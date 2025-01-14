import { delay, http, HttpResponse } from "msw";
import { createFormData } from "../stubs";

export const create = [
  // create
  http.post(`cc/api/submit`, async ({ request }) => {
    const token = request.headers.get("MSWtoken");
    console.log(token);
    await delay(2000); // Wait for 500ms before responding.
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
