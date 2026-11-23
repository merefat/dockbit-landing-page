import { useEffect, useRef, useState } from 'react'

/* One-shot in-view flag: flips true when the element first crosses the
   threshold. Reduced motion skips the observer entirely. SSR-safe. */
export function useInView<T extends HTMLElement>(threshold = 0.35) {
  const [inView, setInView] = useState(false)
  const ref = useRef<T>(null)

  useEffect(() => {
    if (inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, inView])

  return { ref, inView }
}
