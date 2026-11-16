---
title: A site with almost no JavaScript
description: What I dropped, and what CSS does now that I used to write scripts for.
coverAlt: Two cups of coffee and a phone on a long wooden cafe table
date: 2025-08-14
tags: [web, performance]
---

This site uses JavaScript for search, the copy buttons and the PDF reader. Everything else is HTML and CSS.

I did not set out to do this. I was fixing a slow page and kept deleting scripts to see what broke. Mostly nothing did.

## What CSS does now

The filter on the All work page uses radio buttons and the `:has()` selector. The thin bar at the top of an article is a scroll timeline. Moving between pages uses a view transition, which is one line.

## What I would not do in CSS

Search. It needs an index, a keyboard and some ranking, and JavaScript is good at all of that.

## A test

Turn JavaScript off and click around. You should be able to read, follow links and filter. Only search and the PDF reader should stop, and the reader leaves a download link behind.
