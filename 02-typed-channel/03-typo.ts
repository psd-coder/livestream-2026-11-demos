// Step 3 · The typo that won't compile
//
// Uncomment one line at a time (Cmd+/) and watch the editor.

import { bus } from "./02-event-bus";

// A typo in the message name
// bus.emit("palette:chagned", { hue: 250, colors: [] });

// The wrong payload type
// bus.emit("palette:changed", { hue: "250", colors: [] });

// A forgotten payload
// bus.emit("palette:changed");

// A payload where none is expected
// bus.emit("palette:reset", { hue: 0 });

// A field that doesn't exist
// bus.on("palette:changed", ({ colours }) => console.log(colours));

export {};
