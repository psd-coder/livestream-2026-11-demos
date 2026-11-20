// Step 4 · State, bind, events and effects
//
// Not everything is a prop. The text is internal state: a plain atom in setup.
//
//   ctx.bind(store, control)   connects the atom and the textarea both ways
//   ctx.on(target, type, fn)   addEventListener that removes itself on disconnect
//   ctx.effect(store, fn)      runs now and on every change, unsubscribes on disconnect
//
// The rule: handlers change state, effects write the DOM.

import { define } from "nanotags";
import { atom } from "nanostores";

define("x-composer")
  .withProps((p) => ({
    max: p.number(280),
    draftKey: p.string("draft"),
  }))
  .withRefs((r) => ({
    textarea: r.one("textarea"),
    tags: r.many("button"),
    left: r.one("output"),
    post: r.one("button"),
  }))
  .setup((ctx) => {
    // State, bound to the textarea: typing updates $text, $text.set() updates the textarea.
    const $text = atom("");
    ctx.bind($text, ctx.refs.textarea);

    // A handler only changes state.
    ctx.on(ctx.refs.post, "click", () => {
      $text.set(""); // the textarea clears itself: it's bound to $text
    });

    // An effect writes the DOM: it runs now, then on every change of $text.
    ctx.effect($text, (text) => {
      ctx.refs.post.disabled = text.trim() === "";
    });
  });

// What happens:
//
//   typing       // Post turns on
//   click Post   // the textarea clears, Post turns off again
