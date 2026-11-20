// datavolve: bring old stored data up to today's shape.
//
// Run: node 03-datavolve/demo.ts

import { datavolve } from "datavolve";

const settings = datavolve()
  // v1, the first version, gets `unknown`: data from before versioning, or nothing.
  // Check it and keep what you can, or just return defaults, like here.
  .add(1, () => ({ theme: "light" }))
  // v2 added font scaling
  .add(2, (v1) => ({ ...v1, fontScale: 1 }))
  // v3 renamed the themes
  .add(3, ({ theme, ...rest }) => ({ ...rest, theme: theme === "dark" ? "night" : "day" }));

// Why the version is a separate argument: datavolve never looks inside your data,
// so the data can have any shape. You store the version next to the value when you save:
//
//   localStorage.setItem("settings", JSON.stringify({ version: settings.latestVersion, value }));
//
// and read both back before calling run(). Data saved before you had versions
// has no version at all: that's version 0.

const stored = { version: 1, value: { theme: "dark" } }; // what you read back

// run() never throws: check result.success. The result is typed from the chain.
console.log(settings.run(null, 0)); // nothing saved, or no version: v1 defaults, then v2, v3
console.log(settings.run(stored.value, stored.version)); // v1 data: v2, v3
console.log(settings.run({ theme: "auto" }, 7)); // saved by a newer build: { code: "ahead" }
