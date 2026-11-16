---
title: Paddock
description: A rota for moving sheep between fields, with a soil-moisture reading for each one.
coverAlt: A wooden fence post and barbed wire in dry grass
date: 2023-06-20
year: 2023
status: Finished
role: Developer
stack: [Python, SQLite, LoRa radios]
tags: [agriculture, sensors]
related:
  - research/cheaper-than-a-spreadsheet
---

A hill farm in mid-Wales asked whether a few sensors could tell them when a field was ready to graze again. The answer turned out to be yes, roughly, if you also let the farmer say no.

Each field has one probe and a radio that reports every few hours. Paddock shows the fields in the order the sheep should visit them, with a reading beside each. The farmer can drag any field up or down the list, and Paddock remembers why. After a season it had learned that Top Meadow always looks wetter than it is.

The write-up is in [Cheaper Than a Spreadsheet](/research/cheaper-than-a-spreadsheet/).
