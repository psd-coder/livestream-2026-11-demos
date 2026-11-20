// Step 2 · Props
//
// define() registers <x-composer>. The browser upgrades every <x-composer>
// already on the page: no mount call, no root, no hydrate().
//
// withProps() lists the attributes the component reads. For each prop:
//   1. the attribute string is parsed: max="280" → 280
//   2. the value lands in a Nano Stores atom: ctx.props.$max
//   3. when the attribute changes, the atom follows
//
// Keys are camelCase, attributes are kebab-case: draftKey ↔ draft-key.
// The fallback is used only when the attribute is missing.

import { define } from "nanotags";

define("x-composer")
  .withProps((p) => ({
    max: p.number(280),
    draftKey: p.string("draft"),
  }))
  .setup((ctx) => {
    // Each prop is an atom. .get() reads the current value.
    console.log(ctx.props.$max.get(), ctx.props.$draftKey.get()); // 280 "livestream-draft"
  });

// What happens:
//
//   composer.max                           // 280: the property reads the atom
//   composer.max = 500                     // the property writes the attribute, the atom follows
//   composer.setAttribute("max", "25000")  // same path
//   composer.removeAttribute("max")        // back to the fallback: 280
//
// The attribute is the way in from outside. Inside, $max.set() changes
// the atom only and leaves the attribute alone.
// Reacting to these changes is what effects are for: step 5.
