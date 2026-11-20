// Step 6 · The page: create the channel, send a request, stop waiting
//
// The mirror image of the worker: inbound and outbound swap,
// and so do the two request maps.

import { createTypedRpcChannel, requests } from "typed-channel";
import { createPostMessageTransport } from "typed-channel/transports/postMessage";
import type { NoMessages, NoRequests, WorkerMessages, WorkerRequests } from "./04-requests";

const worker = new Worker(new URL("./05-worker.ts", import.meta.url), { type: "module" });
const transport = createPostMessageTransport<WorkerMessages, NoMessages>(worker);
const channel = createTypedRpcChannel(transport, requests<NoRequests, WorkerRequests>());

// Messages from the worker: the same on() as the event bus.
channel.on("progress", ({ done, total }) => console.log(`${done}/${total}`));

// A request: typed name, typed params, typed result. colors is string[]
const colors = await channel.request("generatePalette", { hue: 250, steps: 12 });
console.log(colors);

// Stop waiting after 1 s. request() rejects with a TimeoutError,
// and the worker's signal fires too, so the work stops.
try {
  await channel.request(
    "generatePalette",
    { hue: 250, steps: 1000 },
    { signal: AbortSignal.timeout(1000) },
  );
} catch (error) {
  console.log("gave up:", (error as Error).name); // "TimeoutError"
}
