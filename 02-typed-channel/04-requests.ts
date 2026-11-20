// Step 4 · Requests: a message you wait for
//
// A message is fire-and-forget. A request gets exactly one answer, or a failure.
// Same idea for the types: request name → function from params to result.

export type WorkerRequests = {
  generatePalette: (params: { hue: number; steps: number }) => string[];
};

// Plain messages still travel next to requests: the worker reports progress.
export type WorkerMessages = {
  progress: { done: number; total: number };
};

// The page answers no requests and sends no plain messages.
export type NoRequests = Record<never, never>;
export type NoMessages = Record<never, never>;
