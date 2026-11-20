// Step 3 · Refs
//
// withRefs() finds elements by data-ref inside the component.
// The key is the data-ref value: textarea → [data-ref="textarea"].
//
//   r.one("textarea")  exactly one, checked to be a <textarea>, typed as HTMLTextAreaElement
//   r.many("button")   one or more, as an array
//
// Refs are a contract with the markup. A missing one throws on connect
// and names the component and the ref. Refs never reach inside a nested
// custom element, so components don't grab each other's parts.

import { define } from "nanotags";

define("x-composer")
  .withRefs((r) => ({
    textarea: r.one("textarea"),
    tags: r.many("button"),
    left: r.one("output"),
    post: r.one("button"),
  }))
  .setup((ctx) => {
    // Plain DOM elements, already typed: no querySelector, no null checks.
    console.log(ctx.refs.textarea.placeholder); // "What's happening?" (HTMLTextAreaElement)
    console.log(ctx.refs.tags.map((tag) => tag.textContent)); // ["#nanotags", "#webcomponents"]
    console.log(ctx.refs.left.value); // "280" (HTMLOutputElement)
  });

// What happens:
//
//   rename data-ref="left" in the markup   // connect throws:
//                                          // X-COMPOSER component. Missing elements for refs "left"
