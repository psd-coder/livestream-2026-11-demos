// Step 5 · The worker answers
//
// createTypedRpcChannel adds handle() and request() on top of on() and emit().
// requests<Handled, Called>(): first what this side answers, then what it calls.

import { createTypedRpcChannel, requests } from "typed-channel";
import { createPostMessageTransport } from "typed-channel/transports/postMessage";
import type { NoMessages, NoRequests, WorkerMessages, WorkerRequests } from "./04-requests";

// Inbound: what the page sends. Outbound: what the worker sends.
const transport = createPostMessageTransport<NoMessages, WorkerMessages>(self);
const channel = createTypedRpcChannel(transport, requests<WorkerRequests, NoRequests>());

// Params and the return type come from the contract.
channel.handle("generatePalette", async ({ hue, steps }, { signal }) => {
  const colors: string[] = [];

  for (let i = 0; i < steps; i++) {
    signal.throwIfAborted(); // the page stopped waiting: stop working too
    colors.push(await heavyColorMath(hue, i));
    channel.emit("progress", { done: i + 1, total: steps });
  }

  return colors;
});

// Stands in for the real color math.
declare function heavyColorMath(hue: number, step: number): Promise<string>;
