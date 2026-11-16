// mksite: search, copy buttons and the optional palette switcher. No libraries.
;(function () {
  'use strict'

  // Copy buttons: <button data-copy="#id"> copies that element's text.
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]')
    if (!b) return
    var src = document.querySelector(b.getAttribute('data-copy'))
    if (!src || !navigator.clipboard) return
    navigator.clipboard.writeText(src.textContent.trim()).then(function () {
      var was = b.textContent
      b.textContent = 'Copied'
      setTimeout(function () { b.textContent = was }, 1600)
    })
  })

  // Palette switcher
  var sw = document.querySelectorAll('[data-palette-set]')
  function mark() {
    var cur = document.documentElement.dataset.palette || ''
    sw.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-palette-set') === cur)) })
  }
  sw.forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-palette-set')
      document.documentElement.dataset.palette = v
      try { localStorage.setItem('mksite-palette', v) } catch (e) {}
      mark()
    })
  })
  mark()

  // Search over /index.json. Opens with the button or the / key.
  var dlg = document.getElementById('search')
  if (!dlg || typeof dlg.showModal !== 'function') return
  var input = dlg.querySelector('input')
  var list = dlg.querySelector('ul')
  var index = null
  var sel = -1

  function load() {
    if (index) return Promise.resolve(index)
    return fetch(dlg.getAttribute('data-index'), { credentials: 'omit' })
      .then(function (r) { return r.json() })
      .then(function (j) { index = j; return j })
      .catch(function () { index = []; return index })
  }
  function score(item, words) {
    var hay = (item.title + ' ' + (item.tags || []).join(' ') + ' ' + (item.summary || '') + ' ' + (item.type || '')).toLowerCase()
    var s = 0
    for (var i = 0; i < words.length; i++) {
      if (hay.indexOf(words[i]) < 0) return 0
      s += item.title.toLowerCase().indexOf(words[i]) >= 0 ? 3 : 1
    }
    return s
  }
  function render(q) {
    list.replaceChildren()
    sel = -1
    var words = q.toLowerCase().split(/\s+/).filter(Boolean)
    var out = (index || [])
      .map(function (it) { return [score(it, words), it] })
      .filter(function (x) { return words.length ? x[0] > 0 : true })
      .sort(function (a, b) { return b[0] - a[0] })
      .slice(0, 8)
    if (!out.length) {
      var li = document.createElement('li')
      li.className = 'none'
      li.textContent = 'Nothing found for that.'
      list.append(li)
      return
    }
    out.forEach(function (x) {
      var it = x[1]
      var li = document.createElement('li')
      var a = document.createElement('a')
      a.href = it.url
      a.textContent = it.title
      var small = document.createElement('small')
      small.textContent = it.type + (it.summary ? ' · ' + it.summary.slice(0, 90) : '')
      a.append(small)
      li.append(a)
      list.append(li)
    })
  }
  function open() {
    load().then(function () { render(input.value) })
    dlg.showModal()
    input.focus()
    input.select()
  }
  document.querySelectorAll('[data-open-search]').forEach(function (b) { b.addEventListener('click', open) })
  document.addEventListener('keydown', function (e) {
    var t = e.target
    var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !dlg.open) { e.preventDefault(); open() }
  })
  input.addEventListener('input', function () { render(input.value) })
  input.addEventListener('keydown', function (e) {
    var links = list.querySelectorAll('a')
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!links.length) return
      sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length
      links.forEach(function (l, i) { l.setAttribute('aria-selected', String(i === sel)) })
      links[sel].scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      var target = links[sel >= 0 ? sel : 0]
      if (target) { e.preventDefault(); location.href = target.href }
    }
  })
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close() })
})()

// Print button on the résumé page
document.addEventListener('click', function (e) {
  if (e.target.closest('[data-print]')) window.print()
})
