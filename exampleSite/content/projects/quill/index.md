---
title: Quill
description: Comments for a static site, stored as files in your own repository. A reader writes, you read it, you merge it.
coverAlt: A keyboard, a notepad and a stack of books seen from above
date: 2024-11-18
year: 2024
status: Finished
role: Author
stack: [Cloudflare Workers, Markdown]
tags: [static sites, comments, privacy]
featured: true
links:
  - label: Source
    url: https://example.org/quill
related:
  - articles/what-quill-does-not-do
---

I wanted comments on my own site without adding anyone's tracking script. Quill turns each comment into a pull request that holds one Markdown file. I read it, merge it, and the next build shows it on the page.

It is slow on purpose. Nothing appears until a person has read it, which has cut spam to nearly nothing. It has also meant that on a bad week I have forty comments waiting and a bad conscience.

A reader needs no account. They type a name, a comment and, if they like, an address I will never show. The Worker that receives it is 200 lines.

I stopped adding features in December 2024. It does what I wanted, and I would rather keep it small enough to read in one sitting.
