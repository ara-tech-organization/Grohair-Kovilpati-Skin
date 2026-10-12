import { useEffect, useRef, useState } from 'react'

/**
 * Adds `.is-in` once the element scrolls into view. One-shot — we unobserve
 * after the first intersection so nothing re-animates on scroll-back.
 */
export function useReveal(options) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-in')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options },
    )

    const targets = el.matches('.reveal') ? [el] : Array.from(el.querySelectorAll('.reveal'))
    targets.forEach((t) => observer.observe(t))

    return () => observer.disconnect()
  }, [options])

  return ref
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset = 20) {
  const [past, setPast] = useState(false)

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setPast(window.scrollY > offset))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [offset])

  return past
}

/**
 * Scroll-spy for the nav. Returns the id of the section currently in view.
 * Picks the last section whose top has passed a reading line rather than using
 * raw intersection ratios — tall and short sections then behave the same, and
 * the last section still activates at the bottom of the page.
 *
 * The line is a fraction of the viewport, not a fixed pixel count, and that is
 * the whole point. It used to sit at 120px, barely below the 84px header, which
 * left about 25px of slack — and a jump to a section has to be accurate to
 * within that 25px or the loop keeps the *previous* section. It routinely was
 * not: every section below the fold mounts lazily, so a long jump passes two or
 * three placeholders that swap to real content and change height while the
 * animation is still running. scrollToSection re-aims for exactly this reason,
 * but it settles within a couple of hundred pixels, not twenty-five. Clicking
 * Reviews landed just short of #reviews and the nav lit up Treatments.
 *
 * At 40% the line sits near the middle of the screen, so whichever section is
 * actually filling the view is the one that has passed it, and a jump that
 * lands a couple of hundred pixels off still resolves to what the visitor is
 * looking at. It is also the answer while free-scrolling: a section becomes
 * current once its top reaches the middle, which is about when it takes over
 * the screen.
 */
export function useActiveSection(ids, lineRatio = 0.4) {
  const [active, setActive] = useState('')

  useEffect(() => {
    let frame = 0

    const resolve = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2

      const line = window.innerHeight * lineRatio

      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }

      setActive(atBottom ? ids[ids.length - 1] : current)
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(resolve)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [ids, lineRatio])

  return active
}

/** Locks body scroll while a modal or drawer is open. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
