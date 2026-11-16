---
title: Why I stopped using spinners
description: A spinner says wait. A sentence says what for.
coverAlt: An open book lying flat on a wooden table
date: 2026-01-22
tags: [design, offline]
related:
  - projects/fieldnote
---

For years I put a spinner on anything that took more than a moment. Then I watched someone use Fieldnote on a hillside with one bar of signal, and I saw what a spinner actually says: something is happening, and I won't tell you what.

She held the phone up above her head, as people do, and waited. The spinner went round for ninety seconds. She had no idea whether to keep holding it up or give up.

## What went in its place

A sentence at the top of the screen. "Saved on this phone". Then "Waiting for a connection". Then "Sent". There are only those three, and they are always in words.

People plan around a sentence. If it says waiting for a connection, they walk to the gatepost.

```js
// The three states, as the app sees them
const states = ['saved on this phone', 'waiting for a connection', 'sent']
```

## When a spinner is fine

When the wait is under a second and nothing can go wrong. That is a smaller set of cases than I used to think.
