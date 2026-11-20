// Step 2 · An event bus
//
// Transport: how messages move (EventTarget, postMessage, your own).
// Channel: the typed API on top: on() and emit().

import { createTypedChannel } from "typed-channel";
import { createEventTargetTransport } from "typed-channel/transports/eventTarget";
import type { PaletteMessages } from "./01-messages";

const transport = createEventTargetTransport<PaletteMessages>();
export const bus = createTypedChannel(transport);

// The payload type comes from the message name.
bus.on("palette:changed", ({ hue, colors }) => {
  console.log(`palette:changed → hue ${hue}, ${colors.length} colors`);
});
bus.on("palette:reset", () => {
  console.log("palette:reset");
});

bus.emit("palette:changed", { hue: 250, colors: ["oklch(90% 0.05 250)", "oklch(40% 0.15 250)"] });
bus.emit("palette:reset");
