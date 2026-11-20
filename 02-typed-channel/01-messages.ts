// Step 1 · Describe the messages once
//
// Harmonizer: the UI talks to a worker, to itself through an event bus,
// and to a Figma plugin. Three transports, one way to describe the messages:
// message name → payload type.

export type PaletteMessages = {
  "palette:changed": { hue: number; colors: string[] };
  "palette:reset": never; // never = no payload
};
