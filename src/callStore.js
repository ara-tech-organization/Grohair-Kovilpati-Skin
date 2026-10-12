import { createContext, useContext } from 'react'
import { BOOKING_OFFSET, bookingTarget, scrollToSection, setPath } from './hooks/useSmoothScroll'
import { sectionPath } from './basePath'

export const CallContext = createContext(null)

export function useCall() {
  const ctx = useContext(CallContext)
  if (!ctx) throw new Error('useCall must be used inside <CallProvider>')
  return ctx
}

/**
 * Smooth-scrolls to the booking form, writes the URL, and focuses the first
 * field. Routed through Lenis when it is running — a native scrollIntoView
 * would animate against Lenis's own loop and fight it.
 *
 * The URL is written here rather than in the header, because the header's CTA
 * is a <button> and not an <a href="#book">: the delegated handler in
 * useCleanAnchors only ever sees anchors, so it never knew this click happened.
 * Putting it here also means every Book button on the page behaves the same —
 * header, hero, About, Results, Reviews and the sticky bar all arrive at the
 * same place and now all say so in the address bar.
 */
export function scrollToBooking() {
  const target = bookingTarget()
  if (!target) return

  /* `/consultation`, not `/book` — see the slug map in basePath.js. Written
     before the scroll so the URL is already right if the visitor copies it
     mid-animation, and pushed rather than replaced so Back returns them to
     wherever they were reading. */
  setPath(sectionPath('book'))

  /* Re-aiming matters most here: every Book button on the page is below the
     booking section, so the journey up passes lazy sections that may still be
     placeholders. */
  scrollToSection(target, BOOKING_OFFSET)

  window.setTimeout(() => {
    document.getElementById('lead-name')?.focus({ preventScroll: true })
  }, 900)
}
