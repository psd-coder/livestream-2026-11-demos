// The whole component. 05-demo.html runs this file: pnpm demo
//
// On top of steps 1–4:
//   tags         one ctx.on() call for both buttons, with a typed currentTarget
//   ctx.emit()   a bubbling event, so the page knows a post happened.
//                Prefixed with the tag name, so it can't clash with other events.
//   computed()   $left is derived from the prop and the text
//   effects      one per atom: $text drives the button, $left drives the counter

import { define } from "nanotags";
import { atom, computed } from "nanostores";

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
    const $text = atom("");
    const $left = computed([ctx.props.$max, $text], (max, text) => max - text.length);

    ctx.bind($text, ctx.refs.textarea);

    ctx.on(ctx.refs.tags, "click", (e) => {
      $text.set(`${$text.get()} ${e.currentTarget.textContent}`.trim());
    });

    ctx.on(ctx.refs.post, "click", () => {
      if ($left.get() < 0) return; // over the limit
      ctx.emit("x-composer:post", { text: $text.get().trim() });
      $text.set("");
    });

    // $text → the Post button
    ctx.effect($text, (text) => {
      ctx.refs.post.disabled = text.trim() === "";
    });

    // $left → the counter
    ctx.effect($left, (count) => {
      ctx.refs.left.value = String(count);
      ctx.refs.left.dataset.over = String(count < 0);
    });
  });
