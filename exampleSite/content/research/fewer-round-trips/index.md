---
title: "Fewer Round Trips: Tail Latency in Small Replicated Stores"
date: 2025-05-20
year: 2025
kind: conference
venue: Proceedings of the Sample Systems Workshop
authors: [Mira Okafor, Tomas Reyes]
doi: 10.0000/ssw.2025.0031
tags: [databases, latency, replication]
abstract: "Small replicated stores often wait for their slowest replica. We describe a read path that asks two replicas first and asks the rest only if a timer runs out. It cut the slowest one percent of reads by a third."
---

Most reads do not need every replica. Ask two and wait a few milliseconds, and you usually have your answer. If the timer fires, ask the others.

The hard part was choosing the timer. Too short and every read becomes a full read. We ended up setting it from the last hundred reads, which sounds fussy and took one afternoon to write.
