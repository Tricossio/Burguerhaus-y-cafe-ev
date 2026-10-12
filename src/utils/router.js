export function resolveRoute(pathname, categories) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
  const appPath =
    basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))
      ? pathname.slice(basePath.length) || '/'
      : pathname
  const normalizedPath = appPath.replace(/\/+$/, '') || '/'

  if (
    normalizedPath === '/' ||
    normalizedPath === '/index.html' ||
    normalizedPath === '/menu'
  ) {
    return { name: 'menu', categoryId: 'combos' }
  }

  const categoryMatch = normalizedPath.match(/^\/menu\/([^/]+)$/)
  if (categoryMatch && categories.some(({ id }) => id === categoryMatch[1])) {
    return { name: 'menu', categoryId: categoryMatch[1] }
  }

  return { name: 'not-found' }
}

export function handleInternalLink(event, onNavigate) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  const link = event.currentTarget
  if (
    link.hasAttribute('download') ||
    (link.target && link.target.toLowerCase() !== '_self')
  ) {
    return
  }

  const destination = new URL(link.href, window.location.href)
  if (destination.origin !== window.location.origin) return

  event.preventDefault()
  onNavigate(destination.pathname)
}
