---
title: Use mksite
description: Four steps from nothing to a working site.
url: /use/
---

You need [Hugo](https://gohugo.io/installation/) 0.146 or newer and Git. Check with `hugo version`.

## 1. Add the theme

{{< steps >}}
1. Make a site: `hugo new site my-site && cd my-site`
2. Add the theme: `git clone https://github.com/conanzhangtech/mksite themes/mksite`
3. Copy the starter: `cp -r themes/mksite/starter/* . && cp -r themes/mksite/archetypes .`
4. Run `hugo server` and open the address it prints
{{< /steps >}}

You now have a small portfolio on screen. Change your name in `hugo.toml` and `content/_index.md`.

## 2. Add your work

Each of these makes a folder with the right fields already in it:

```bash
hugo new projects/my-app
hugo new research/my-paper
hugo new articles/what-i-learned
```

Open the new `index.md` and write. Remove `draft: true` when it is ready.

- Put a `cover.jpg` in a project or article folder for a picture.
- Put a `.pdf` in a research folder. It opens in a reader on the page, with a citation box.

## 3. Make it yours

In `hugo.toml`, choose a colour with `palette = "clay"` (jade, clay, sea or ink), and list your profiles under `[[params.social]]`. They show as icon buttons. Add `content/resume/_index.md` and your résumé prints to PDF from the page.

## 4. Put it online {#online}

```bash
hugo --minify
npx wrangler deploy
```

That uploads the site to Cloudflare Workers, free for a small site. The [full guide](https://docs.open.czt.sh/mksite/go-live/) covers the one-time setup and your own domain. Every field is explained in the [docs](https://docs.open.czt.sh/mksite/).
