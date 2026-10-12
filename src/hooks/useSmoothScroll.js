import { useEffect } from 'react'
import Lenis from 'lenis'
import { HOME, sectionFromPath, sectionPath } from '../basePath'

/**
 * App-level smooth scrolling. A module-level handle lets non-React callers
 * (scrollToBooking, the sticky bar) route through Lenis instead of fighting it
 * with a second native smooth-scroll animation.
 */
let instance = null

export function getLenis() {
  return instance
}

/** Scrolls to an element or offset, falling back to native when Lenis is off. */
export function smoothScrollTo(target, options = {}) {
  if (instance) {
    instance.scrollTo(target, { duration: 1.15, ...options })
    return
  }
  /* Native path. `scroll-padding-top` on <html> supplies the header offset
     here, so the numeric `offset` option is Lenis-only by design. */
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* Matches `scroll-padding-top` — the fixed header must not cover the heading
   of whatever section was just jumped to. */
const ANCHOR_OFFSET = -90

/**
 * Scrolls to a section and keeps re-aiming until the page settles.
 *
 * Every section below the fold is lazy: while it is still a placeholder it
 * stands at a reserved height, and it swaps to real content the moment the
 * scroll brings it within a screen and a half. So a long jump — Treatments to
 * FAQ, say — passes two or three sections that each change height *while the
 * animation is already in flight*, and a single `scrollTo` computed at click
 * time lands well short of the heading it named.
 *
 * Re-issuing the scroll whenever the target actually moves is what makes a nav
 * link land on its own section. The corrections are deliberately short — this
 * is an adjustment, not a second journey — and stop after ~1.5s, by which time
 * everything in the path has mounted.
 */
export function scrollToSection(target, offset = ANCHOR_OFFSET) {
  if (!target) return

  smoothScrollTo(target, { offset })

  const topOf = () => target.getBoundingClientRect().top + window.scrollY
  let last = topOf()
  let ticks = 0

  const timer = window.setInterval(() => {
    const now = topOf()
    /* A few pixels of drift is sub-pixel layout noise, not a mounted section. */
    if (Math.abs(now - last) > 4) {
      last = now
      smoothScrollTo(target, { offset, duration: 0.45 })
    }
    if (++ticks >= 9) window.clearInterval(timer)
  }, 170)
}

export default function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.15,
      // Long, soft tail — the "luxury easing" feel, not a spring.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Native momentum on touch beats an emulated one.
      syncTouch: false,
      /* Anchor handling is ours, below — Lenis's own would write the fragment
         to the address bar, and this is a single page where "#treatments" in
         the URL is noise rather than a location worth linking to. */
      anchors: false,
    })

    instance = lenis
    // Lenis drives scroll itself; CSS smooth-behaviour would double-animate.
    document.documentElement.classList.add('lenis-on')

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      instance = null
      document.documentElement.classList.remove('lenis-on')
    }
  }, [enabled])
}

/** Rewrites the address bar without navigating or touching the scroll. */
export function setPath(path) {
  if (window.location.pathname === path) return
  window.history.pushState({}, '', path + window.location.search)
}

/*
 * Where "go to booking" actually lands, shared by everything that goes there.
 *
 * The form card rather than the section: stacked on mobile, #book opens with
 * the assurances copy and the form is still a screen below, so stopping at
 * #book arrives somewhere other than the thing the button names.
 *
 * Exported because two paths need to agree — the click (scrollToBooking) and
 * the load below, which is what a pasted /skin/consultation goes through. If
 * they resolved the target separately, the shared link would quietly land a
 * screen off from where the button puts you.
 */
export const BOOKING_OFFSET = -100

export function bookingTarget() {
  return document.getElementById('book-form') ?? document.getElementById('book')
}

/**
 * Turns in-page links into clean paths. This is one page — "#treatments" in the
 * address bar is noise — so a click scrolls and writes `/treatments` instead.
 *
 * Only a click does. Scrolling deliberately leaves the URL alone: rewriting it
 * as sections pass under the header made the address bar flicker through five
 * paths on the way down, and the visitor never asked to go to any of them.
 *
 * One delegated handler covers every link, present and future. Because the
 * default action never runs, the browser never writes the fragment. Kept
 * independent of `useSmoothScroll`, which is off under reduced motion — the
 * URLs should behave the same either way.
 */
export function useCleanAnchors() {
  useEffect(() => {
    const onClick = (event) => {
      /* Modified clicks and anything but the primary button belong to the
         browser: open-in-new-tab on a same-page link should still work. */
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const link = event.target.closest?.('a[href^="#"]')
      if (!link) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const target = document.querySelector(hash)
      if (!target) return

      event.preventDefault()

      /* The page's own top, not the top of the hero element — the hero begins
         under the fixed header, so offsetting it would leave a gap above. */
      if (hash === '#top') {
        smoothScrollTo(0)
        setPath(HOME)
      } else {
        scrollToSection(target)
        /* `#treatments` becomes `/skin/treatments`. A path rather than a
           fragment: it reads as a page on a site that only has one, and it is
           what analytics can report on as a section view. The folder is part of
           it — see src/basePath.js — because this URL is one a visitor can
           reload or share, and the server only serves what is under /skin/. */
        setPath(sectionPath(hash.slice(1)))
      }
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  
  useEffect(() => {
    const { hash, pathname } = window.location
    /* The folder is stripped before the id is used: `/skin/about` is the
       section `about`, and getElementById('hair/about') would find nothing. */
    const id = hash ? hash.slice(1) : sectionFromPath(pathname)
    if (!id) return

    /* Booking resolves to the form card, exactly as the Book buttons do — see
       bookingTarget. Everything else is its own section element. */
    const isBooking = id === 'book'
    const target = isBooking ? bookingTarget() : document.getElementById(id)
    if (!target) return

    if (hash) window.history.replaceState(null, '', sectionPath(id))
    /* After paint, so the observer-driven sections have had their first pass
       and the scroll lands on real content rather than a reserved height. */
    requestAnimationFrame(() =>
      scrollToSection(target, isBooking ? BOOKING_OFFSET : undefined),
    )
  }, [])
}
