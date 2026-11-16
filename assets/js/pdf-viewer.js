// mksite PDF reader. Loads pdf.js from this site, never from a CDN, and only on pages that have a PDF.
// Pages draw as you scroll to them. Text can be selected. The PDF itself stays one click away to download.
let base = '/vendor/pdfjs/'

async function boot(root) {
  base = root.dataset.base || base
  const src = root.dataset.src
  const pages = root.querySelector('.pdf-pages')
  const status = root.querySelector('.pdf-status')
  const pageInput = root.querySelector('[data-page]')
  const total = root.querySelector('[data-total]')
  let lib
  try {
    lib = await import(base + 'pdf.min.mjs')
    lib.GlobalWorkerOptions.workerSrc = base + 'pdf.worker.min.mjs'
  } catch {
    status.textContent = 'The reader could not load. Please use the download button.'
    return
  }
  let doc
  try {
    doc = await lib.getDocument({ url: src, isEvalSupported: false, enableXfa: false }).promise
  } catch {
    status.textContent = 'This PDF could not be opened. Please use the download button.'
    return
  }
  status.remove()
  total.textContent = String(doc.numPages)
  pageInput.max = String(doc.numPages)

  const first = await doc.getPage(1)
  const natural = first.getViewport({ scale: 1 })
  let zoom = 1
  let current = 1
  const boxes = []
  const rendered = new Map()

  const fitScale = () => Math.min(Math.max((pages.clientWidth - 34) / natural.width, 0.4), 1.6)

  function layout() {
    const scale = fitScale() * zoom
    const vp = first.getViewport({ scale })
    pages.replaceChildren()
    boxes.length = 0
    rendered.clear()
    for (let n = 1; n <= doc.numPages; n++) {
      const box = document.createElement('div')
      box.className = 'pdf-page'
      box.dataset.n = String(n)
      box.style.width = Math.floor(vp.width) + 'px'
      box.style.height = Math.floor(vp.height) + 'px'
      pages.append(box)
      boxes.push(box)
      io.observe(box)
    }
  }

  async function draw(box) {
    const n = Number(box.dataset.n)
    if (rendered.has(n)) return
    rendered.set(n, true)
    const page = await doc.getPage(n)
    const scale = fitScale() * zoom
    const vp = page.getViewport({ scale })
    const ratio = window.devicePixelRatio || 1
    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(vp.width * ratio)
    canvas.height = Math.floor(vp.height * ratio)
    canvas.style.width = Math.floor(vp.width) + 'px'
    canvas.style.height = Math.floor(vp.height) + 'px'
    box.style.width = canvas.style.width
    box.style.height = canvas.style.height
    box.replaceChildren(canvas)
    await page.render({ canvasContext: canvas.getContext('2d'), viewport: vp, transform: ratio !== 1 ? [ratio, 0, 0, ratio, 0, 0] : null }).promise
    try {
      const tl = document.createElement('div')
      tl.className = 'tl'
      tl.style.setProperty('--scale-factor', String(vp.scale))
      tl.style.setProperty('--total-scale-factor', String(vp.scale))
      box.append(tl)
      await new lib.TextLayer({ textContentSource: page.streamTextContent(), container: tl, viewport: vp }).render()
    } catch {}
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) draw(e.target)
      const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (best) {
        current = Number(best.target.dataset.n)
        pageInput.value = String(current)
      }
    },
    { root: pages, rootMargin: '300px 0px', threshold: [0, 0.5] },
  )

  function go(n) {
    n = Math.min(Math.max(1, n), doc.numPages)
    boxes[n - 1]?.scrollIntoView({ block: 'start' })
    pages.scrollTop = boxes[n - 1].offsetTop - pages.offsetTop - 8
    pageInput.value = String(n)
  }
  function setZoom(z) {
    zoom = Math.min(Math.max(z, 0.5), 3)
    const keep = current
    layout()
    go(keep)
  }

  root.querySelector('[data-prev]').addEventListener('click', () => go(current - 1))
  root.querySelector('[data-next]').addEventListener('click', () => go(current + 1))
  root.querySelector('[data-in]').addEventListener('click', () => setZoom(zoom * 1.2))
  root.querySelector('[data-out]').addEventListener('click', () => setZoom(zoom / 1.2))
  root.querySelector('[data-fit]').addEventListener('click', () => setZoom(1))
  pageInput.addEventListener('change', () => go(Number(pageInput.value) || 1))
  pages.tabIndex = 0
  pages.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1) } }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1) }
  })
  let t
  window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => setZoom(zoom), 200) })
  layout()
}

document.querySelectorAll('.pdf[data-src]').forEach((r) => boot(r))
