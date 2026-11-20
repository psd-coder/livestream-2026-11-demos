# Livestream demos: nanotags, typed-channel, datavolve

Code from the Evil Martians livestream about small libraries. Each demo is a folder of
numbered files: open them in order, and each step adds one idea. Every file is complete
and commented, so you can read any step on its own.

## Setup

Requires Node.js 22.18+ (it runs TypeScript files directly) and pnpm.

```sh
pnpm install
pnpm typecheck
```

## 01-nanotags

[nanotags](https://nanotags.psdcoder.dev/) is a thin wrapper around Custom Elements with
Nano Stores reactivity, under 2.5 KB. No Shadow DOM: it adds behavior to HTML the server has
already rendered.

The demo builds one component, `<x-composer>`: a post box with a character counter and tag
buttons.

| File | Shows |
| ---- | ----- |
| `01-markup.html` | The server-rendered HTML: attributes as inputs, `data-ref` marking the parts |
| `02-props.ts` | `define()` and `withProps()`: attributes parsed into Nano Stores atoms |
| `03-refs.ts` | `withRefs()`: typed elements, checked against the markup |
| `04-bind-events-effects.ts` | Internal state with `ctx.bind()`, `ctx.on()` and `ctx.effect()` |
| `05-demo.ts` | The complete component: tag buttons, `ctx.emit()`, `computed()` |

Run the complete component in the browser:

```sh
pnpm demo
```

Then try `composer.max = 20` in the console: the counter follows the new limit.

## 02-typed-channel

[typed-channel](https://typed-channel.psdcoder.dev/) gives you type-safe messages and
requests between contexts: the main thread and a worker, iframes, tabs, or an in-page event
bus. 271 B for messages, 994 B with requests (brotli).

These files are meant to be read in the editor. The worker is schematic: `heavyColorMath()`
stands in for real work.

| File | Shows |
| ---- | ----- |
| `01-messages.ts` | The contract: message name → payload type |
| `02-event-bus.ts` | A transport and a channel: `on()` and `emit()` |
| `03-typo.ts` | Five mistakes the compiler catches: uncomment one line at a time |
| `04-requests.ts` | Request types: params in, result out |
| `05-worker.ts` | Answering requests with `handle()`, stopping on abort |
| `06-page.ts` | Sending a typed request, then giving up with `AbortSignal.timeout()` |
