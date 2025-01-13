import { setupWorker } from "msw/browser";

import { create } from "./handlers";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...create);
/**
 * Exporting worker as the default export */
export default worker;
