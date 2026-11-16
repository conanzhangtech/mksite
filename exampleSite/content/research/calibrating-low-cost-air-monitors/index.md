---
title: "Cheap Sensors, Honest Error Bars: Calibrating Low-Cost Air Monitors in the Field"
date: 2026-02-12
year: 2026
kind: article
venue: Journal of Environmental Sensing
authors: [Mira Okafor, Jonas Lindqvist, Priya Raman]
doi: 10.0000/jes.2026.0142
tags: [sensors, calibration, statistics]
abstract: "Low-cost air monitors drift with temperature and humidity. We ran 60 of them beside a reference station for six months and found that a simple correction halves the error, provided the uncertainty is reported with each reading."
code: https://example.org/air-calibration
related:
  - projects/tidemark
---

The correction in the paper uses two numbers per sensor and fits in a spreadsheet. We did that on purpose, because the groups who most need this are the ones without a statistician.

## What did not work

We tried a neural network first. It fitted the training months beautifully and then failed in the first cold snap. The plain correction was worse on paper and better in January.
