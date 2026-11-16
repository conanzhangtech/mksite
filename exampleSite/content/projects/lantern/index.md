---
title: Lantern
description: Reads a web page in the order a screen reader would and lists the places where a listener would get lost.
coverAlt: A person holding an old twin-lens camera in front of their chest
date: 2024-04-05
year: 2024
status: Maintained
role: Co-author
stack: [Rust, WebAssembly]
tags: [accessibility, tools]
links:
  - label: Source
    url: https://example.org/lantern
related:
  - research/reading-order-matters
  - articles/i-used-a-screen-reader-for-a-week
---

Lantern grew out of the study with Priya Raman and Ayo Bello described in [Reading Order Matters](/research/reading-order-matters/). Most of the people we watched did the same thing on a long page: they jumped through the headings, listening for the one that sounded right.

So Lantern lists a page's headings the way they would be heard, one after another with nothing around them. Headings like "Overview", "More" and "Details" show up as a problem straight away, because that is how they sound.

It runs in the browser as WebAssembly, so a page under test never leaves the machine. It is not a full accessibility checker and does not try to be one. It checks one thing well.
