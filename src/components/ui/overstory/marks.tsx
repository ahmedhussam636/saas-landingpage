import * as React from "react"
import { gsap } from "gsap"
import type { OvsLogo, OvsMark } from "./types"
import { formatNumber } from "./canopy"

export const useIso = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

export function Mark({ kind, uid }: { kind?: OvsMark; uid: string }) {
  const common = { className: "ovs-svg", viewBox: "0 0 24 24", "aria-hidden": true as const }
  switch (kind) {
    case "watch":
      return (
        <svg {...common} viewBox="0 0 30 24">
          <path fill="currentColor" d="M1 4.5h5.4l3.2 9.6 3.1-9.6h4.6l3.1 9.6 3.2-9.6H29L22.6 20h-4.4L15 10.6 11.8 20H7.4z" />
        </svg>
      )
    case "slash":
      return (
        <svg {...common}>
          <defs>
            <mask id={uid + "sl"}>
              <rect width="24" height="24" fill="#fff" />
              <path d="M16.2 7.6c-.9-1-2.3-1.6-4-1.6-2.2 0-3.8 1.1-3.8 2.8 0 1.8 1.6 2.4 3.8 2.9 2.3.5 3.9 1.2 3.9 3.1 0 1.8-1.7 3.1-4 3.1-1.8 0-3.3-.7-4.3-1.9" fill="none" stroke="#000" strokeWidth="2.6" strokeLinecap="round" />
            </mask>
          </defs>
          <rect x="1.5" y="1.5" width="21" height="21" rx="5.5" fill="currentColor" mask={"url(#" + uid + "sl)"} />
        </svg>
      )
    case "scribe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <path d="M16.6 9.2A5.2 5.2 0 1 0 17 14.6M12 12h5.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )
    case "knot":
      return (
        <svg {...common}>
          <path fill="currentColor" d="M12 1.5c2.7 2.8 2.7 5.8 0 8.6-2.7-2.8-2.7-5.8 0-8.6zm0 12.4c2.7 2.8 2.7 5.8 0 8.6-2.7-2.8-2.7-5.8 0-8.6zM1.5 12c2.8-2.7 5.8-2.7 8.6 0-2.8 2.7-5.8 2.7-8.6 0zm12.4 0c2.8-2.7 5.8-2.7 8.6 0-2.8 2.7-5.8 2.7-8.6 0z" />
        </svg>
      )
    case "venn":
      return (
        <svg {...common} viewBox="0 0 34 24">
          <path d="M10 3.5 18.5 12 10 20.5 1.5 12zM24 3.5 32.5 12 24 20.5 15.5 12z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        </svg>
      )
    default:
      return (
        <svg {...common}>
          <path fill="currentColor" d="M20 3.5C11 3.6 4.5 8.4 4.5 15c0 1.8.5 3.4 1.4 4.6L3.6 22l1.1 1 2.3-2.3c1.3.9 2.9 1.4 4.6 1.4 6.6 0 9.6-7.6 8.4-18.6zM9 17.6c2.4-3.6 5-6.1 8.3-8.2-2.6 2.6-4.9 5.3-7.2 9z" />
        </svg>
      )
  }
}

/** The studio's mark: leaves in a ring around a patch of sky. */
export function BrandMark() {
  return (
    <svg className="ovs-svg ovs-brandmark" viewBox="0 0 32 32" aria-hidden="true">
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} transform={"rotate(" + i * 45 + " 16 16)"} d="M16 1.6c2.6 1.9 3.6 4.4 2.6 7.2-.6 1.6-1.6 2.4-2.6 2.8-1-.4-2-1.2-2.6-2.8-1-2.8 0-5.3 2.6-7.2z" fill="currentColor" opacity={i % 2 ? 0.55 : 1} />
      ))}
      <circle cx="16" cy="16" r="2.4" fill="currentColor" />
    </svg>
  )
}

export function Logo({ logo, uid }: { logo: OvsLogo; uid: string }) {
  return (
    <span className={"ovs-logo ovs-logo-" + (logo.type || "sans")}>
      <Mark kind={logo.mark} uid={uid} />
      <span>{logo.name}</span>
    </span>
  )
}

/* -------------------------------------------------------------- word morph */

// a plain space inside an inline-block letter collapses to nothing
const NBSP = String.fromCharCode(160)
// the serif word is set condensed, like a compressed Didone; keep in step with .ovs-morph-word
const CONDENSE = 0.8

export function WordMorph({ words, still }: { words: string[]; still: boolean }) {
  const [i, setI] = React.useState(0)
  const box = React.useRef(null as HTMLSpanElement | null)
  const word = React.useRef(null as HTMLSpanElement | null)
  const paused = React.useRef(false)
  const first = React.useRef(true)

  useIso(() => {
    const b = box.current
    const w = word.current
    if (!b || !w) return
    const width = w.offsetWidth * CONDENSE
    if (first.current || still) {
      first.current = false
      b.style.width = width + "px"
      return
    }
    const ctx = gsap.context(() => {
      gsap.to(b, { width, duration: 0.7, ease: "expo.inOut" })
      gsap.fromTo(w.children, { yPercent: 105, rotateX: -80, opacity: 0, filter: "blur(6px)" }, { yPercent: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.045, ease: "expo.out", delay: 0.12, clearProps: "filter" })
    })
    return () => ctx.revert()
  }, [i, still])

  React.useEffect(() => {
    if (still || words.length < 2) return
    const t = window.setInterval(() => {
      const w = word.current
      if (paused.current || !w || document.hidden) return
      gsap.to(w.children, {
        yPercent: -105,
        rotateX: 80,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.45,
        stagger: 0.03,
        ease: "power3.in",
        onComplete: () => setI((v) => (v + 1) % words.length),
      })
    }, 3200)
    return () => window.clearInterval(t)
  }, [still, words.length])

  // resize with the font (it scales with the viewport)
  React.useEffect(() => {
    const ro = new ResizeObserver(() => {
      if (box.current && word.current) box.current.style.width = word.current.offsetWidth * CONDENSE + "px"
    })
    if (word.current) ro.observe(word.current)
    return () => ro.disconnect()
  }, [i])

  return (
    <span className="ovs-morph" ref={box} onPointerEnter={() => (paused.current = true)} onPointerLeave={() => (paused.current = false)}>
      <span className="ovs-morph-word" ref={word} key={i}>
        {Array.from(words[i] || "").map((ch, k) => (
          <span key={k} className="ovs-ch">
            {ch === " " ? NBSP : ch}
          </span>
        ))}
      </span>
    </span>
  )
}

/* ---------------------------------------------------------- little pieces */

export function Split({ text, className, as = "h2" }: { text: string; className?: string; as?: "h2" | "h3" | "p" }) {
  const Tag = as
  const words = text.split(" ")
  return (
    <Tag className={className} data-split>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="ovs-w">
            <span data-w>{w}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  )
}

export function Kicker({ n, text }: { n: string; text: string }) {
  return (
    <p className="ovs-kicker" data-rv>
      <span className="ovs-kicker-n">( {n} )</span>
      <span>{text}</span>
    </p>
  )
}

export function Arrow() {
  return (
    <svg className="ovs-svg ovs-arrow" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** A button that leans toward the pointer. */
export function Magnet({ children, className, onClick, href, label }: { children: React.ReactNode; className: string; onClick?: (e: React.MouseEvent) => void; href?: string; label?: string }) {
  const ref = React.useRef(null as HTMLAnchorElement | null)
  const move = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el || e.pointerType !== "mouse") return
    const r = el.getBoundingClientRect()
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.22, y: (e.clientY - r.top - r.height / 2) * 0.32, duration: 0.4, ease: "power3.out" })
  }
  const leave = () => {
    if (ref.current) gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,0.45)" })
  }
  return (
    <a ref={ref} href={href || "#contact"} className={className} onClick={onClick} onPointerMove={move} onPointerLeave={leave} aria-label={label}>
      {children}
    </a>
  )
}

/* ------------------------------------------------------- service previews */


export function Price({ value, currency, still }: { value: number; currency: string; still: boolean }) {
  const ref = React.useRef(null as HTMLSpanElement | null)
  const last = React.useRef(value)
  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const from = last.current
    last.current = value
    if (still || from === value) {
      el.textContent = currency + formatNumber(value)
      return
    }
    const o = { v: from }
    const t = gsap.to(o, { v: value, duration: 0.7, ease: "expo.out", onUpdate: () => (el.textContent = currency + formatNumber(Math.round(o.v))) })
    return () => {
      t.kill()
    }
  }, [value, currency, still])
  return <span ref={ref}>{currency + formatNumber(value)}</span>
}

export function Clock({ timeZone }: { timeZone: string }) {
  const [t, setT] = React.useState("")
  React.useEffect(() => {
    let f: Intl.DateTimeFormat
    try {
      f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone })
    } catch {
      f = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit" })
    }
    const tick = () => setT(f.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15000)
    return () => window.clearInterval(id)
  }, [timeZone])
  return <time>{t || "--:--"}</time>
}

export function readScheme(theme: "auto" | "light" | "dark") {
  if (theme !== "auto") return theme
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") || document.body.classList.contains("dark") ? "dark" : "light"
}
