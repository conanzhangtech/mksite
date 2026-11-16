---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
year: {{ now.Year }}
venue: ""
authors: []
abstract: ""
draft: true
---

Put your `paper.pdf` in this folder and it opens in the reader on this page.
