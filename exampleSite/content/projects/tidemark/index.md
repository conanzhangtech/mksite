---
title: Tidemark
description: River levels from six cheap sensors behind a primary school, with a range around every reading.
coverAlt: A stream running over rocks between green banks
date: 2026-03-10
year: 2026
status: In use
role: Lead engineer
stack: [Go, SQLite, Hugo]
tags: [sensors, open data, dashboards]
featured: true
links:
  - label: Source
    url: https://example.org/tidemark
  - label: Live demo
    url: https://example.org/tidemark-demo
related:
  - research/calibrating-low-cost-air-monitors
  - articles/error-bars-are-a-feature
  - articles/the-week-the-sensors-lied
---

A parents' group at a school in Leeds asked me one question in January: will the stream behind the playground flood this week? They had six ultrasonic sensors, a shared spreadsheet and a lot of worry.

The sensors cost about nine pounds each, and it showed. One of them read 40 cm too high every afternoon because the sun heated the bracket. Another dropped out whenever a heron stood in front of it.

## What it does

Every ten minutes the collector reads all six sensors and compares each one with the others. The page shows the stream level as a band, wide when the sensors disagree and narrow when they agree. If one sensor has been odd for more than an hour, the page says which and why.

## How it is built

A single Go program writes readings to SQLite. A second step turns the last week of data into static pages, so the dashboard stays up even when the collector is down. That has happened twice, once because of a flat battery and once because someone unplugged it to charge a phone.

## What went wrong

The first version showed one big number. People rang me to ask if it was right. I had no good answer, which is why the second version shows the band.

The red warning also fired far too often in its first week, and by Friday nobody was reading it. I changed it to fire only when the upper edge of the band crosses the school's own marker on the wall.
