// Applies a saved palette before the page paints, so there is no flash. Runs only if the visitor chose one.
try {
  var p = localStorage.getItem('mksite-palette')
  if (p && /^[a-z]{2,12}$/.test(p)) document.documentElement.dataset.palette = p
} catch (e) {}
