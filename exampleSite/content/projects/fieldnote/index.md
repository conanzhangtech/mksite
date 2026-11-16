---
title: Fieldnote
description: A notebook that works without a signal and sends your notes later. Built for survey teams on hillsides.
coverAlt: An open laptop, a paper notebook and a pencil on a wooden desk
date: 2025-09-02
year: 2025
status: Maintained
role: Designer and developer
stack: [TypeScript, IndexedDB, Service workers]
tags: [offline, notes, field work]
featured: true
links:
  - label: Source
    url: https://example.org/fieldnote
related:
  - articles/why-i-stopped-using-spinners
---

Fieldnote began on a bird count in the Pennines, where the one bar of signal was on a gatepost and only if you stood on the left side of it. The team were writing counts on paper and typing them up in the pub.

## How it behaves

Notes save on the phone first, always. When a connection turns up, they are sent in the background. A small line at the top says one of three things: saved on this phone, waiting for a connection, or sent.

## The hard part

Two people editing the same note while both are offline. Merging text automatically gets it wrong more often than you would think, so Fieldnote keeps both versions of any paragraph changed on both sides and asks which to keep. People grumbled about this at first. After a month nobody wanted it removed.

## Who uses it

Two survey teams, a bird-counting group, a class of geology students and one very patient surveyor who has sent me eleven bug reports, nine of them correct.
