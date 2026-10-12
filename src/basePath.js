/*
 * Every path the app writes into the address bar goes through here, so moving
 * the site between a subfolder and a domain root is a one-line change to
 * `base` in vite.config.js rather than a hunt through the components.
 *
 * It is served from the domain root today, which makes BASE '/' and the helpers
 * below identity-ish — but nothing hardcodes that, so an install under a folder
 * still works.
 */
const BASE = import.meta.env.BASE_URL || '/'

/** The app's own home: '/' at a domain root, '/skin/' under a folder. */
export const HOME = BASE

/** Home without the trailing slash — '' at a domain root, '/skin'. Joins cleanly. */
const ROOT = BASE.replace(/\/$/, '')

/*
 * The address bar and the DOM do not have to agree on a word.
 *
 * The booking section has been `#book` since it was written, and the scroll
 * helpers, `#book-form` and every Book button reach for that id. But `book` is
 * not what we want a visitor to see or paste into a message — `/consultation`
 * says what the page actually offers. So the id stays and the URL gets its own
 * word, mapped here rather than renamed everywhere.
 *
 * Anything not listed passes through unchanged, which is every other section:
 * `about` is `about` in both places and needs no entry.
 */
const ID_TO_SLUG = { book: 'consultation' }
const SLUG_TO_ID = Object.fromEntries(Object.entries(ID_TO_SLUG).map(([id, slug]) => [slug, id]))

/** A section id as it should appear in the address bar: 'book' -> '/skin/consultation'. */
export function sectionPath(id) {
  return `${ROOT}/${ID_TO_SLUG[id] ?? id}`
}

/**
 * The reverse: a pathname back to the section id the DOM knows.
 *
 * Returns an id, not a slug, because every caller feeds it straight to
 * getElementById — `/skin/consultation` has to come back as `book` or the
 * lookup finds nothing and the visitor lands at the top of the page.
 *
 * `/skin/book` still resolves too. It is not a URL the app writes any more, but
 * it is one that may already be sitting in somebody's message history, and the
 * identity fallback happens to answer it correctly.
 */
export function sectionFromPath(pathname) {
  const withoutBase = pathname.startsWith(ROOT) ? pathname.slice(ROOT.length) : pathname
  const slug = withoutBase.replace(/^\/|\/$/g, '')
  return SLUG_TO_ID[slug] ?? slug
}
