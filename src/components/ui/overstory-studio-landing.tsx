"use client"

import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PrismaHero } from "@/components/ui/prisma-hero"
import type {
  OverstoryStudioLandingProps,
  OvsCase,
  OvsFaq,
  OvsLink,
  OvsLogo,
  OvsMark,
  OvsMock,
  OvsPlan,
  OvsQuote,
  OvsSeason,
  OvsService,
  OvsServiceArt,
  OvsStat,
  OvsStep,
} from "./overstory/types"
import {
  DEFAULT_CASES,
  DEFAULT_CTA,
  DEFAULT_FAQ,
  DEFAULT_FOOTER,
  DEFAULT_HERO,
  DEFAULT_LINKS,
  DEFAULT_LOGOS,
  DEFAULT_MANIFESTO,
  DEFAULT_PLANS,
  DEFAULT_QUOTES,
  DEFAULT_SERVICES,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  SEASONS,
} from "./overstory/defaults"
import {
  Canopy,
  PhotoCanopy,
  clamp,
  formatNumber,
  isEmail,
  manifestoParts,
  stepAt,
} from "./overstory/canopy"
import {
  Arrow,
  BrandMark,
  Clock,
  Kicker,
  Logo,
  Magnet,
  Mark,
  Split,
  WordMorph,
  readScheme,
  useIso,
} from "./overstory/marks"
import { CaseMock, GrowingTree, ServiceArt } from "./overstory/illustrations"
import { OVS_CSS } from "./overstory/styles"
import { OVS_PHOTO } from "./overstory/photo"

export type {
  OverstoryStudioLandingProps,
  OvsCase,
  OvsFaq,
  OvsLink,
  OvsLogo,
  OvsMark,
  OvsMock,
  OvsPlan,
  OvsQuote,
  OvsSeason,
  OvsService,
  OvsServiceArt,
  OvsStat,
  OvsStep,
}

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger)

export default function OverstoryStudioLanding({
  brand = "Overstory",
  links = DEFAULT_LINKS,
  status = null,
  hero,
  logos = DEFAULT_LOGOS as OvsLogo[],
  manifesto = DEFAULT_MANIFESTO,
  stats = DEFAULT_STATS,
  services,
  work,
  process,
  quotes = DEFAULT_QUOTES as OvsQuote[],
  pricing,
  faq,
  cta = DEFAULT_CTA,
  footer = DEFAULT_FOOTER,
  email = "hello@overstory.studio",
  currency = "$",
  season = "summer",
  photo = OVS_PHOTO,
  seed = 7,
  theme = "auto",
  themeToggle = true,
  onBook,
  onSubscribe,
  height = "100svh",
  className = "",
}: OverstoryStudioLandingProps) {
  const uid = "ovs" + React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const root = React.useRef(null as HTMLDivElement | null)
  const H = { ...DEFAULT_HERO, ...hero }
  const words = H.words && H.words.length ? H.words : DEFAULT_HERO.words
  const svc = services === null ? null : {
    kicker: services?.kicker || "What we grow",
    title: services?.title || "One team for the brand, the product and the code behind it.",
    text: services?.text || "Pick a single sprint or keep the whole crew. Either way you get senior people who have shipped this before.",
    items: services?.items || (DEFAULT_SERVICES as OvsService[]),
  }
  const wk = work === null ? null : {
    kicker: work?.kicker || "Selected work",
    title: work?.title || "Products we helped grow.",
    next: work?.next || "Your product, next",
    items: work?.items || (DEFAULT_CASES as OvsCase[]),
  }
  const pr = process === null ? null : { kicker: process?.kicker || "How we work", title: process?.title || "From seed to canopy in eight weeks.", steps: process?.steps || DEFAULT_STEPS }
  const pc = pricing === null ? null : {
    kicker: pricing?.kicker || "Engagements",
    title: pricing?.title || "Simple pricing. No surprises at the end of the month.",
    text: pricing?.text || "Every engagement starts with a free 30-minute call and a written plan.",
    plans: pricing?.plans || (DEFAULT_PLANS as OvsPlan[]),
    quarterlyNote: pricing?.quarterlyNote || "Save 10%",
  }
  const fq = faq === null ? null : { kicker: faq?.kicker || "Questions", title: faq?.title || "Things founders ask us first.", text: faq?.text || "Anything else, write to us. A founder answers every email.", items: faq?.items || DEFAULT_FAQ }
  const ft = footer === null ? null : {
    columns: footer?.columns || DEFAULT_FOOTER.columns,
    city: footer?.city || DEFAULT_FOOTER.city,
    timeZone: footer?.timeZone || DEFAULT_FOOTER.timeZone,
    note: footer?.note || DEFAULT_FOOTER.note,
  }
  const pal = SEASONS[season] || SEASONS.summer

  const [scheme, setScheme] = React.useState("light" as "light" | "dark")
  const [override, setOverride] = React.useState(null as null | "light" | "dark")
  const [still, setStill] = React.useState(false)
  const [menu, setMenu] = React.useState(false)
  const [photoFail, setPhotoFail] = React.useState(false)
  const usePhoto = !!photo && !photoFail
  const [active, setActive] = React.useState("")
  const [svcOpen, setSvcOpen] = React.useState(-1)
  const [svcHover, setSvcHover] = React.useState(0)
  const [quarterly, setQuarterly] = React.useState(false)
  const [faqOpen, setFaqOpen] = React.useState(0)
  const [quote, setQuote] = React.useState(0)
  const [quotePaused, setQuotePaused] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [mail, setMail] = React.useState("")
  const [mailState, setMailState] = React.useState("idle" as "idle" | "sending" | "done" | "error" | "invalid")
  const [caseIdx, setCaseIdx] = React.useState(0)
  const heroIn = React.useRef(null as null | (() => void))
  const heroReady = React.useRef(false)
  const gust = React.useRef(null as null | ((x: number) => void))

  // scheme: an explicit theme, else the nav switch, else the host's .dark class
  React.useEffect(() => {
    const apply = () => setScheme(override || readScheme(theme))
    apply()
    if (theme !== "auto" || override) return
    const mo = new MutationObserver(apply)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => mo.disconnect()
  }, [theme, override])

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const on = () => setStill(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])

  const go = React.useCallback((href?: string) => (e?: React.MouseEvent) => {
    if (!href || !href.startsWith("#") || href.length < 2) return
    const el = root.current?.querySelector('[data-sec="' + href.slice(1) + '"]')
    if (!el) return
    e?.preventDefault()
    setMenu(false)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" })
  }, [])

  const book = (from: string) => (e: React.MouseEvent) => {
    if (onBook) {
      e.preventDefault()
      onBook(from)
    } else go("#contact")(e)
  }

  // nav: solid once you leave the top, hides while you scroll down, active link follows the section in view
  React.useEffect(() => {
    const r = root.current
    if (!r) return
    let last = window.scrollY
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        const top = r.getBoundingClientRect().top + y
        r.toggleAttribute("data-solid", y > top + 40)
        r.toggleAttribute("data-navhide", y > last + 4 && y > top + 400)
        if (y < last - 4) r.removeAttribute("data-navhide")
        last = y
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.sec || "")
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    r.querySelectorAll("[data-sec]").forEach((s) => io.observe(s))
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [])

  // phone menu: Escape closes, focus moves in and comes back
  const menuBtn = React.useRef(null as HTMLButtonElement | null)
  const sheet = React.useRef(null as HTMLDivElement | null)
  React.useEffect(() => {
    if (!menu) return
    const first = sheet.current?.querySelector("a,button") as HTMLElement | null
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false)
        menuBtn.current?.focus()
      }
      if (e.key === "Tab" && sheet.current) {
        const f = Array.from(sheet.current.querySelectorAll("a,button")) as HTMLElement[]
        if (!f.length) return
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault()
          f[f.length - 1].focus()
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault()
          f[0].focus()
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menu])

  /* ------------------------------------------------ the scroll storyboard */
  useIso(() => {
    const r = root.current
    if (!r) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", wide: "(min-width: 820px)", fine: "(hover: hover) and (pointer: fine)" }, (c) => {
        const { motion, wide, fine } = c.conditions as { motion: boolean; wide: boolean; fine: boolean }
        const q = gsap.utils.selector(r)
        const heroEl = q("[data-hero]")[0] as HTMLElement
        const heroLayers = q("[data-hero] [data-layer]") as HTMLElement[]
        const heroZoom = q("[data-hero] [data-zoom]") as HTMLElement[]
        const photoMode = !!heroEl.querySelector("[data-photo]")
        const undo = [] as (() => void)[]

        if (!motion) {
          r.setAttribute("data-still", "")
          heroIn.current = null
          return () => r.removeAttribute("data-still")
        }

        /* 1. arrival: words rise, then the trees close in around the sky */
        const intro = gsap.timeline({ defaults: { ease: "expo.out" } })
        intro
          .fromTo(q(".ovs-nav-in"), { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 0.2)
          .fromTo(q("[data-hero] .ovs-status"), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.25)
          .fromTo(q("[data-hero] .ovs-line > span"), { yPercent: 115, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12 }, 0.3)
          .fromTo(q("[data-hero] .ovs-trusted"), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.9)
          .fromTo(q("[data-hero] .ovs-logos .ovs-logo"), { y: 22, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.07, clearProps: "filter" }, 1.0)
          .fromTo(q("[data-hero] .ovs-cue"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.6)
        gsap.set(heroLayers, { autoAlpha: 0 })
        if (!photoMode) gsap.set(q("[data-hero] [data-sky]"), { scale: 1.08 })
        let entered = false
        heroIn.current = () => {
          if (entered) return
          entered = true
          if (photoMode) {
            // the eye adjusting: the canopy comes into focus as it settles
            gsap.set(heroLayers[1], { autoAlpha: 1 })
            gsap.fromTo(heroLayers[0], { autoAlpha: 0, scale: 1.24, rotate: -4, filter: "blur(18px) brightness(1.25)" }, { autoAlpha: 1, scale: 1, rotate: 0, filter: "blur(0px) brightness(1)", duration: 2.9, ease: "expo.out", clearProps: "filter" })
            return
          }
          gsap.to(q("[data-hero] [data-sky]"), { scale: 1, duration: 2.6, ease: "expo.out" })
          gsap.fromTo(heroLayers, { autoAlpha: 0, scale: (i: number) => 1.45 + i * 0.28, rotate: (i: number) => (i % 2 ? -6 : 6) }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 2.6, stagger: 0.14, ease: "expo.out" })
        }
        if (heroReady.current) heroIn.current()

        /* 2. rise: scroll lifts you through the layers and out into open sky */
        const rise = gsap.timeline({ scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom bottom", scrub: 0.9 } })
        const zs = [1.55, 1.95, 2.6, 3.6]
        const rs = [2, -3, 5, -9]
        if (photoMode) {
          // into the gap in the trees, with the near leaves rushing past out of focus
          rise
            .to(heroZoom[0], { scale: 2.5, rotate: 6, ease: "power2.in", duration: 1 }, 0)
            .fromTo(heroZoom[1], { scale: 1.04, opacity: 0 }, { scale: 3.6, opacity: 1, ease: "power2.in", duration: 0.7 }, 0.04)
            .to(heroZoom[1], { opacity: 0, ease: "none", duration: 0.25 }, 0.74)
        } else {
          heroZoom.forEach((z, i) => rise.to(z, { scale: zs[i], rotate: rs[i], ease: "power2.in", duration: 1 }, 0))
          rise.to(q("[data-hero] [data-sky] canvas"), { scale: 1.22, ease: "none", duration: 1 }, 0)
        }
        rise
          .to(q("[data-hero] .ovs-copy"), { y: () => -window.innerHeight * 0.16, scale: 0.92, autoAlpha: 0, filter: "blur(10px)", ease: "power1.in", duration: 0.5 }, 0.05)
          .to(q("[data-hero] .ovs-cue"), { autoAlpha: 0, duration: 0.1 }, 0)
          .fromTo(q("[data-hero] .ovs-veil"), { yPercent: 50 }, { yPercent: -50, ease: "power1.inOut", duration: 0.55 }, 0.45)
          .fromTo(q("[data-hero] .ovs-above"), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.62)

        /* pointer parallax and a gust on click */
        if (fine) {
          const depth = photoMode ? [16, 48] : [8, 14, 24, 40]
          const xs = heroLayers.map((l) => gsap.quickTo(l, "x", { duration: 1.4, ease: "power3.out" }))
          const ys = heroLayers.map((l) => gsap.quickTo(l, "y", { duration: 1.4, ease: "power3.out" }))
          const cx = gsap.quickTo(q("[data-hero] .ovs-copy"), "x", { duration: 1.6, ease: "power3.out" })
          const onMove = (e: PointerEvent) => {
            const b = heroEl.getBoundingClientRect()
            const nx = (e.clientX - b.left) / b.width - 0.5
            const ny = (e.clientY - b.top) / window.innerHeight - 0.5
            heroLayers.forEach((_, i) => {
              xs[i](-nx * depth[i])
              ys[i](-ny * depth[i] * 0.7)
            })
            cx(nx * 6)
          }
          heroEl.addEventListener("pointermove", onMove)
          undo.push(() => heroEl.removeEventListener("pointermove", onMove))
        }
        gust.current = (x: number) => {
          const dir = x < 0.5 ? 1 : -1
          heroLayers.forEach((l, i) => {
            gsap.timeline()
              .to(l, { rotate: dir * (0.6 + i * 0.5), duration: 0.35 + i * 0.05, ease: "power2.out" })
              .to(l, { rotate: 0, duration: 1.6, ease: "elastic.out(1,0.35)" })
          })
          const burst = q("[data-hero] [data-fall='burst']") as HTMLElement[]
          burst.forEach((leaf, i) => {
            const b = heroEl.getBoundingClientRect()
            gsap.killTweensOf(leaf)
            gsap.fromTo(
              leaf,
              { x: b.width * (0.15 + Math.random() * 0.7), y: -40, rotate: Math.random() * 360, autoAlpha: 1 },
              { x: "+=" + (dir * (80 + Math.random() * 220)), y: window.innerHeight * (0.7 + Math.random() * 0.5), rotate: "+=" + (220 + Math.random() * 300), duration: 3.2 + Math.random() * 2, delay: i * 0.06, ease: "power1.in", onComplete: () => { gsap.set(leaf, { autoAlpha: 0 }) } },
            )
          })
        }
        undo.push(() => (gust.current = null))

        /* falling leaves, always a few in the air */
        const falling = q("[data-hero] [data-fall='idle']") as HTMLElement[]
        const fall = (leaf: HTMLElement, delay: number) => {
          const b = heroEl.getBoundingClientRect()
          gsap.fromTo(
            leaf,
            { x: b.width * Math.random(), y: -60, rotate: Math.random() * 360, autoAlpha: 0.9 },
            { y: window.innerHeight + 60, x: "+=" + (Math.random() * 240 - 120), rotate: "+=" + (Math.random() * 540 - 270), duration: 11 + Math.random() * 8, delay, ease: "none", onComplete: () => fall(leaf, Math.random() * 3) },
          )
        }
        falling.forEach((l, i) => fall(l, 1.6 + i * 2.4))
        q("[data-fall] > *").forEach((inner: Element, i: number) => gsap.to(inner, { rotateX: 70, rotateY: 30, x: i % 2 ? 16 : -16, duration: 1.4 + (i % 3) * 0.5, yoyo: true, repeat: -1, ease: "sine.inOut" }))

        /* 3. headings and blocks reveal as they arrive */
        q("[data-split]").forEach((h: Element) => {
          gsap.fromTo(h.querySelectorAll("[data-w]"), { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.045, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } })
        })
        const rv = q("[data-rv]") as HTMLElement[]
        gsap.set(rv, { autoAlpha: 0, y: 34 })
        ScrollTrigger.batch(rv, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true }) })

        /* 4. manifesto reads itself in */
        const man = q("[data-manifesto]")[0]
        if (man) {
          gsap.fromTo(man.querySelectorAll("[data-mw]"), { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: man, start: "top 78%", end: "bottom 45%", scrub: true } })
          gsap.fromTo(man.querySelectorAll(".ovs-pic"), { scale: 0, rotate: -12 }, { scale: 1, rotate: 0, ease: "back.out(2)", duration: 0.9, stagger: 0.2, scrollTrigger: { trigger: man, start: "top 60%", once: true } })
        }
        q("[data-count]").forEach((el: Element) => {
          const e = el as HTMLElement
          const to = Number(e.dataset.count)
          const dec = Number(e.dataset.dec || 0)
          const o = { v: 0 }
          e.textContent = (e.dataset.pre || "") + formatNumber(0, dec) + (e.dataset.suf || "")
          gsap.to(o, { v: to, duration: 2.2, ease: "expo.out", scrollTrigger: { trigger: e, start: "top 88%", once: true }, onUpdate: () => (e.textContent = (e.dataset.pre || "") + formatNumber(o.v, dec) + (e.dataset.suf || "")) })
        })
        q(".ovs-stat-rule").forEach((el: Element) => gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 90%", once: true } }))

        /* 5. services: rows draw their rules, the preview follows the cursor */
        gsap.fromTo(q(".ovs-svc-row"), { "--ovs-rule": 0 }, { "--ovs-rule": 1, duration: 1.4, stagger: 0.08, ease: "expo.inOut", scrollTrigger: { trigger: q(".ovs-svc-list")[0], start: "top 85%", once: true } })
        const list = q(".ovs-svc-list")[0] as HTMLElement | undefined
        const prev = q(".ovs-svc-prev")[0] as HTMLElement | undefined
        if (fine && list && prev) {
          const px = gsap.quickTo(prev, "x", { duration: 0.6, ease: "power3.out" })
          const py = gsap.quickTo(prev, "y", { duration: 0.6, ease: "power3.out" })
          const pr = gsap.quickTo(prev, "rotate", { duration: 0.8, ease: "power3.out" })
          let lx = 0
          const mv = (e: PointerEvent) => {
            const b = list.getBoundingClientRect()
            const x = e.clientX - b.left
            px(x + 28)
            py(e.clientY - b.top - 90)
            pr(clamp((x - lx) * 0.6, -10, 10))
            lx = x
          }
          const en = () => gsap.to(prev, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "expo.out" })
          const lv = () => gsap.to(prev, { autoAlpha: 0, scale: 0.6, duration: 0.4, ease: "power3.in" })
          gsap.set(prev, { autoAlpha: 0, scale: 0.6 })
          list.addEventListener("pointermove", mv)
          list.addEventListener("pointerenter", en)
          list.addEventListener("pointerleave", lv)
          undo.push(() => {
            list.removeEventListener("pointermove", mv)
            list.removeEventListener("pointerenter", en)
            list.removeEventListener("pointerleave", lv)
          })
        }

        /* 6. work: a horizontal track on wide screens, cards that lean with the speed */
        const workEl = q("[data-work]")[0] as HTMLElement | undefined
        const track = q("[data-track]")[0] as HTMLElement | undefined
        const stage = q("[data-workstage]")[0] as HTMLElement | undefined
        if (wide && workEl && track && stage) {
          workEl.setAttribute("data-h", "")
          const dist = () => Math.max(0, track.scrollWidth - stage.clientWidth)
          const fit = () => {
            workEl.style.height = stage.offsetHeight + dist() + "px"
          }
          fit()
          ScrollTrigger.addEventListener("refreshInit", fit)
          const cards = q("[data-card]") as HTMLElement[]
          const skew = gsap.quickTo(cards, "skewX", { duration: 0.5, ease: "power3.out" })
          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: "none",
            scrollTrigger: {
              trigger: workEl,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true,
              onUpdate: (s) => {
                skew(clamp(s.getVelocity() / -260, -6, 6))
                setCaseIdx(stepAt(s.progress, cards.length))
                const bar = q("[data-bar]")[0] as HTMLElement | undefined
                if (bar) bar.style.transform = "scaleX(" + s.progress + ")"
              },
              onLeave: () => skew(0),
              onLeaveBack: () => skew(0),
            },
          })
          cards.forEach((card) => {
            const m = card.querySelector("[data-mock]")
            if (m) gsap.fromTo(m, { xPercent: 12, rotate: 2 }, { xPercent: -12, rotate: -2, ease: "none", scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true } })
          })
          undo.push(() => {
            ScrollTrigger.removeEventListener("refreshInit", fit)
            workEl.removeAttribute("data-h")
            workEl.style.height = ""
          })
        }

        /* 7. process: the tree grows with the steps */
        const proc = q("[data-process]")[0] as HTMLElement | undefined
        if (proc) {
          const grow = gsap.timeline({ scrollTrigger: { trigger: proc.querySelector(".ovs-steps"), start: "top 65%", end: "bottom 70%", scrub: 0.8 } })
          gsap.set(proc.querySelectorAll("[data-grow]"), { strokeDasharray: 1, strokeDashoffset: 1 })
          gsap.set(proc.querySelectorAll("[data-leaves] > *"), { scale: 0, transformOrigin: "50% 50%" })
          for (let s = 0; s < 4; s++) {
            const stems = proc.querySelectorAll('[data-grow="' + s + '"]')
            if (stems.length) grow.to(stems, { strokeDashoffset: 0, duration: 1, ease: "none" }, s)
            grow.to(proc.querySelectorAll('[data-leaves="' + s + '"] > *'), { scale: 1, duration: 0.7, stagger: s === 3 ? 0.01 : 0.12, ease: "back.out(2.2)" }, s + 0.45)
          }
          grow.fromTo(proc.querySelector("[data-sun]"), { attr: { cy: 210 } }, { attr: { cy: 70 }, duration: 4, ease: "none" }, 0)
          proc.querySelectorAll(".ovs-step").forEach((st) => ScrollTrigger.create({ trigger: st, start: "top 62%", end: "bottom 62%", toggleClass: { targets: st, className: "ovs-on" } }))
        }

        /* 8. finale: you drop back down into the trees */
        const fin = q("[data-fin]")[0] as HTMLElement | undefined
        if (fin) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: fin, start: "top 75%", end: "bottom bottom", scrub: 0.9 } })
          tl.fromTo(fin.querySelector(".ovs-window"), { "--ovs-wi": "9%", "--ovs-wr": "40px" }, { "--ovs-wi": "0%", "--ovs-wr": "0px", ease: "power2.inOut", duration: 0.6 }, 0)
          const fz = fin.querySelectorAll("[data-zoom]")
          if (fin.querySelector("[data-photo]")) {
            // the rise in reverse: down out of the sky, through the near leaves, into the ring
            tl.fromTo(fz[0], { scale: 2.4, rotate: -6 }, { scale: 1, rotate: 0, ease: "power3.out", duration: 0.9 }, 0)
            tl.fromTo(fz[1], { scale: 3.4, opacity: 1 }, { scale: 1.05, opacity: 0, ease: "power3.out", duration: 0.7 }, 0)
          } else {
            const from = [1.5, 1.9, 2.5, 3.4]
            fz.forEach((z, i) => tl.fromTo(z, { scale: from[i], rotate: i % 2 ? 6 : -6 }, { scale: 1, rotate: 0, ease: "power3.out", duration: 0.9 }, 0))
          }
          tl.fromTo(fin.querySelector(".ovs-fin-copy"), { autoAlpha: 0, y: 60, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }, 0.45)
        }

        /* 9. footer: the wordmark rises letter by letter */
        const wm = q("[data-wordmark]")[0]
        if (wm) gsap.fromTo(wm.querySelectorAll("span"), { yPercent: 105 }, { yPercent: 0, duration: 1.4, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: wm, start: "top 98%", once: true } })

        return () => {
          heroIn.current = null
          undo.forEach((f) => f())
        }
      })
    }, r)
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      ctx.revert()
    }
    // the storyboard is built once (and again only if the photo gives way to
    // the generated canopy); content props only change text inside it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usePhoto])

  const onHeroReady = React.useCallback(() => {
    heroReady.current = true
    heroIn.current?.()
  }, [])

  // quotes: words rise on every change
  useIso(() => {
    if (still || !root.current) return
    const ws = root.current.querySelectorAll("[data-quote] [data-qw]")
    const t = gsap.fromTo(ws, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.02, ease: "expo.out" })
    return () => {
      t.kill()
    }
  }, [quote, still])

  const copyEmail = () => {
    const done = () => {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    }
    if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, done)
    else done()
  }

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEmail(mail)) {
      setMailState("invalid")
      return
    }
    setMailState("sending")
    let ok = true
    try {
      const res = onSubscribe ? await onSubscribe(mail.trim()) : await new Promise((r) => window.setTimeout(() => r(true), 700))
      if (res === false) ok = false
    } catch {
      ok = false
    }
    setMailState(ok ? "done" : "error")
    if (ok) setMail("")
  }

  const qs = quotes || []
  const curQuote = qs[quote % Math.max(1, qs.length)]
  const svcItems = svc?.items || []
  const style = {
    "--ovs-h": height,
    "--ovs-accent": pal.accent,
    "--ovs-soft": pal.soft,
  } as React.CSSProperties

  return (
    <div ref={root} className={"ovs-root " + className} data-scheme={scheme} data-season={season} data-photo={usePhoto ? "" : undefined} data-menu={menu ? "" : undefined} style={style}>
      <style>{OVS_CSS}</style>
      <a className="ovs-skip" href={"#" + uid + "main"}>
        Skip to content
      </a>

      {/* ---------------------------------------------------------- nav */}
      <header className="ovs-nav">
        <div className="ovs-nav-in">
          <a className="ovs-brand" href="#top" onClick={(e) => { e.preventDefault(); root.current?.scrollIntoView({ behavior: still ? "auto" : "smooth" }) }}>
            <BrandMark />
            <span>{brand}</span>
          </a>
          <nav className="ovs-links" aria-label="Main">
            {links.map((l) => (
              <a key={l.label} href={l.href || "#"} onClick={go(l.href)} data-on={l.href && active === l.href.slice(1) ? "" : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ovs-nav-end">
            {themeToggle ? (
              <button type="button" className="ovs-icon-btn" onClick={() => setOverride(scheme === "dark" ? "light" : "dark")} aria-label={scheme === "dark" ? "Switch to daylight" : "Switch to dusk"}>
                <svg className="ovs-svg" viewBox="0 0 24 24" aria-hidden="true">
                  {scheme === "dark" ? (
                    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                      <circle cx="12" cy="12" r="4.2" />
                      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                    </g>
                  ) : (
                    <path d="M20 14.6A8.4 8.4 0 0 1 9.4 4a8.4 8.4 0 1 0 10.6 10.6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  )}
                </svg>
              </button>
            ) : null}
            <Magnet className="ovs-btn ovs-btn-dark ovs-nav-cta" href="#contact" onClick={book("nav")}>
              <span>Book a call</span>
              <Arrow />
            </Magnet>
            <button ref={menuBtn} type="button" className="ovs-icon-btn ovs-burger" aria-expanded={menu} aria-controls={uid + "menu"} aria-label="Menu" onClick={() => setMenu((m) => !m)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div id={uid + "menu"} ref={sheet} className="ovs-sheet" role="dialog" aria-modal="true" aria-label="Menu" data-open={menu ? "" : undefined} hidden={!menu}>
        {links.map((l, i) => (
          <a key={l.label} href={l.href || "#"} onClick={go(l.href)} style={{ "--i": i } as React.CSSProperties}>
            <span>0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="ovs-btn ovs-btn-dark" onClick={book("menu")} style={{ "--i": links.length } as React.CSSProperties}>
          Book a call <Arrow />
        </a>
      </div>

      <main id={uid + "main"}>
        {/* ---------------------------------------------------------- hero */}
        <section className="ovs-hero" data-hero data-sec="top" aria-label="Introduction">
          <div
            className="ovs-stage"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a,button")) return
              const b = e.currentTarget.getBoundingClientRect()
              gust.current?.((e.clientX - b.left) / b.width)
            }}
          >
            {usePhoto ? (
              <PhotoCanopy src={photo as string} season={season} scheme={scheme} onReady={onHeroReady} onFail={() => setPhotoFail(true)} />
            ) : (
              <Canopy seed={seed} scheme={scheme} palette={pal} onReady={onHeroReady} />
            )}
            <div className="ovs-falls" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className="ovs-fall" data-fall={i < 5 ? "idle" : "burst"}>
                  <svg className="ovs-svg" viewBox="0 0 24 24" style={{ color: i % 3 ? "var(--ovs-accent)" : "var(--ovs-soft)" }}>
                    <path fill="currentColor" d="M2 12C6 5 14 3.5 22 12c-8 8.5-16 7-20 0z" />
                    <path d="M3 12h17" stroke="rgba(0,0,0,.25)" strokeWidth="0.8" />
                  </svg>
                </span>
              ))}
            </div>
            <div className="ovs-copy">
              {status ? (
                <p className="ovs-status">
                  <i />
                  {status}
                </p>
              ) : null}
              <h1 className="ovs-h1">
                <span className="ovs-line">
                  <span>{H.lead}</span>
                </span>
                <span className="ovs-line">
                  <span>
                    <span className="ovs-sr">{words[0]} </span>
                    <span aria-hidden="true">
                      <WordMorph words={words} still={still} />
                    </span>{" "}
                    {H.tail}
                  </span>
                </span>
              </h1>
              {logos && logos.length ? (
                <>
                  <p className="ovs-trusted">{H.trusted}</p>
                  <div className="ovs-logos" role="list" aria-label={H.trusted}>
                    {[logos.slice(0, 2), logos.slice(2)].map((row, r) =>
                      row.length ? (
                        <div key={r} className="ovs-logo-row">
                          {row.map((l, i) => (
                            <span role="listitem" key={l.name + i}>
                              <Logo logo={l} uid={uid + "h" + r + i} />
                            </span>
                          ))}
                        </div>
                      ) : null,
                    )}
                  </div>
                </>
              ) : null}
            </div>
            <a className="ovs-cue" href="#about" onClick={go("#about")}>
              <span className="ovs-cue-line" />
              {H.cue}
            </a>
            <div className="ovs-veil" aria-hidden="true">
              <p className="ovs-above">Above the canopy</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ manifesto */}
        {manifesto ? (
          <section className="ovs-sec ovs-manifesto" data-sec="about" aria-label="About">
            <div className="ovs-wrap">
              <Kicker n="01" text={manifesto.kicker || DEFAULT_MANIFESTO.kicker} />
              <p className="ovs-man" data-manifesto>
                {manifestoParts(manifesto.text || DEFAULT_MANIFESTO.text).map((p, i) =>
                  p.pic ? (
                    <span key={i} className={"ovs-pic ovs-pic-" + p.pic} aria-hidden="true">
                      {p.pic === "team" ? (
                        <>
                          <i>
                            <b>MO</b>
                          </i>
                          <i>
                            <b>DR</b>
                          </i>
                          <i>
                            <b>PN</b>
                          </i>
                        </>
                      ) : p.pic === "chart" ? (
                        <svg className="ovs-svg" viewBox="0 0 80 40">
                          <path d="M4 34 L20 26 L32 30 L48 16 L60 20 L76 6" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="76" cy="6" r="4" fill="currentColor" />
                        </svg>
                      ) : (
                        <BrandMark />
                      )}
                    </span>
                  ) : (
                    <React.Fragment key={i}>
                      <span data-mw>{p.word}</span>{" "}
                    </React.Fragment>
                  ),
                )}
              </p>
              {stats && stats.length ? (
                <dl className="ovs-stats">
                  {stats.map((s) => (
                    <div key={s.label} className="ovs-stat" data-rv>
                      <span className="ovs-stat-rule" />
                      <dd data-count={s.value} data-dec={s.decimals || 0} data-pre={s.prefix || ""} data-suf={s.suffix || ""}>
                        {(s.prefix || "") + formatNumber(s.value, s.decimals || 0) + (s.suffix || "")}
                      </dd>
                      <dt>{s.label}</dt>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* ------------------------------------------------------- services */}
        {svc ? (
          <section className="ovs-sec ovs-services" data-sec="services" aria-labelledby={uid + "svc"}>
            <div className="ovs-wrap">
              <div className="ovs-head">
                <div>
                  <Kicker n="02" text={svc.kicker} />
                  <span id={uid + "svc"}>
                    <Split text={svc.title} className="ovs-h2" />
                  </span>
                </div>
                <p className="ovs-lede" data-rv>
                  {svc.text}
                </p>
              </div>
              <div className="ovs-svc-list" onPointerLeave={() => setSvcHover(svcOpen >= 0 ? svcOpen : 0)}>
                <div className="ovs-svc-prev" aria-hidden="true">
                  {svcItems.map((s, i) => (
                    <div key={i} className="ovs-svc-art" data-on={i === svcHover ? "" : undefined}>
                      <ServiceArt art={s.art} />
                    </div>
                  ))}
                </div>
                {svcItems.map((s, i) => {
                  const open = svcOpen === i
                  return (
                    <div key={s.title} className="ovs-svc-row" data-open={open ? "" : undefined} onPointerEnter={() => setSvcHover(i)}>
                      <h3 className="ovs-svc-h">
                        <button type="button" aria-expanded={open} aria-controls={uid + "svc" + i} onClick={() => setSvcOpen(open ? -1 : i)} onFocus={() => setSvcHover(i)}>
                          <span className="ovs-svc-n">0{i + 1}</span>
                          <span className="ovs-svc-t">{s.title}</span>
                          <span className="ovs-svc-time">{s.time}</span>
                          <span className="ovs-plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div id={uid + "svc" + i} className="ovs-fold" role="region" aria-label={s.title}>
                        <div>
                          <div className="ovs-svc-body">
                            <p>{s.text}</p>
                            <ul>
                              {s.tags.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* ----------------------------------------------------------- work */}
        {wk ? (
          <section className="ovs-work" data-work data-sec="work" aria-labelledby={uid + "wk"}>
            <div className="ovs-work-stage" data-workstage>
              <div className="ovs-wrap ovs-work-head">
                <div>
                  <Kicker n="03" text={wk.kicker} />
                  <span id={uid + "wk"}>
                    <Split text={wk.title} className="ovs-h2" />
                  </span>
                </div>
                <div className="ovs-work-meter" aria-hidden="true">
                  <span className="ovs-work-count">
                    {String(caseIdx + 1).padStart(2, "0")} / {String(wk.items.length + 1).padStart(2, "0")}
                  </span>
                  <span className="ovs-work-track">
                    <i data-bar />
                  </span>
                </div>
              </div>
              <div className="ovs-track" data-track>
                {wk.items.map((c, i) => (
                  <article key={c.client + i} className="ovs-card" data-card style={{ "--t1": (c.tint || ["#dfe8d6", "#9fbf7a"])[0], "--t2": (c.tint || ["#dfe8d6", "#9fbf7a"])[1] } as React.CSSProperties}>
                    <a href={c.href || "#contact"} onClick={c.href ? undefined : go("#contact")} className="ovs-card-link" aria-label={c.client + ": " + c.title}>
                      <div className="ovs-card-art">
                        <span className="ovs-card-sun" />
                        <CaseMock mock={c.mock} name={c.client} />
                      </div>
                      <div className="ovs-card-meta">
                        <p className="ovs-card-client">
                          <Mark kind={c.mark} uid={uid + "c" + i} />
                          {c.client}
                          <span>
                            {c.kind} · {c.year}
                          </span>
                        </p>
                        <h3 className="ovs-card-title">{c.title}</h3>
                        <p className="ovs-card-metric">
                          <b>{c.metric}</b>
                          <span>{c.metricLabel}</span>
                        </p>
                      </div>
                    </a>
                  </article>
                ))}
                <article className="ovs-card ovs-card-next" data-card>
                  <a href="#contact" onClick={book("work")} className="ovs-card-link">
                    <BrandMark />
                    <span className="ovs-card-next-t">{wk.next}</span>
                    <span className="ovs-btn ovs-btn-dark">
                      Start a project <Arrow />
                    </span>
                  </a>
                </article>
              </div>
            </div>
          </section>
        ) : null}

        {/* -------------------------------------------------------- process */}
        {pr ? (
          <section className="ovs-sec ovs-process" data-process data-sec="process" aria-labelledby={uid + "pr"}>
            <div className="ovs-wrap">
              <Kicker n="04" text={pr.kicker} />
              <span id={uid + "pr"}>
                <Split text={pr.title} className="ovs-h2 ovs-h2-wide" />
              </span>
              <div className="ovs-proc-grid">
                <div className="ovs-tree-col">
                  <div className="ovs-tree-stick">
                    <GrowingTree seed={seed} />
                  </div>
                </div>
                <ol className="ovs-steps">
                  {pr.steps.map((s, i) => (
                    <li key={s.name} className="ovs-step">
                      <p className="ovs-step-k">
                        <span>0{i + 1}</span>
                        <b>{s.name}</b>
                        <em>{s.when}</em>
                      </p>
                      <h3>{s.title}</h3>
                      <p>{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------------------------------------------------- quotes */}
        {curQuote ? (
          <section className="ovs-shade" data-sec="quotes" aria-label="What founders say" onPointerEnter={() => setQuotePaused(true)} onPointerLeave={() => setQuotePaused(false)} onFocus={() => setQuotePaused(true)} onBlur={() => setQuotePaused(false)}>
            {usePhoto ? <div className="ovs-shade-photo" aria-hidden="true" style={{ backgroundImage: "url(" + photo + ")" }} /> : null}
            <div className="ovs-dapple" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="ovs-wrap ovs-quote-wrap">
              <p className="ovs-kicker ovs-kicker-light" data-rv>
                <span className="ovs-kicker-n">( ✦ )</span>
                <span>In the shade, with founders</span>
              </p>
              <figure className="ovs-quote" data-quote aria-live="polite">
                <blockquote>
                  <p>
                    {curQuote.quote.split(" ").map((w, i) => (
                      <React.Fragment key={quote + "-" + i}>
                        <span className="ovs-w">
                          <span data-qw>{w}</span>
                        </span>{" "}
                      </React.Fragment>
                    ))}
                  </p>
                </blockquote>
                <figcaption>
                  <span className="ovs-avatar">{curQuote.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
                  <span>
                    <b>{curQuote.name}</b>
                    <span>{curQuote.role}</span>
                  </span>
                  <span className="ovs-quote-mark">
                    <Mark kind={curQuote.mark} uid={uid + "q"} />
                  </span>
                </figcaption>
              </figure>
              {qs.length > 1 ? (
                <div className="ovs-quote-nav">
                  <button type="button" className="ovs-round" aria-label="Previous quote" onClick={() => setQuote((v) => (v - 1 + qs.length) % qs.length)}>
                    <svg className="ovs-svg" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M13 8H3m4-4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="ovs-dots">
                    {qs.map((qq, i) => (
                      <button key={qq.name} type="button" aria-label={"Quote " + (i + 1) + " of " + qs.length} aria-current={i === quote ? "true" : undefined} onClick={() => setQuote(i)}>
                        {i === quote ? <i key={quote} data-paused={quotePaused ? "" : undefined} onAnimationEnd={() => setQuote((v) => (v + 1) % qs.length)} /> : null}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="ovs-round" aria-label="Next quote" onClick={() => setQuote((v) => (v + 1) % qs.length)}>
                    <Arrow />
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* -------------------------------------------------------- pricing */}
        {pc ? (
          <div data-sec="pricing">
            <PrismaHero />
          </div>
        ) : null}

        {/* ------------------------------------------------------------ faq */}
        {fq ? (
          <section className="ovs-sec ovs-faq" data-sec="faq" aria-labelledby={uid + "fq"}>
            <div className="ovs-wrap ovs-faq-grid">
              <div>
                <Kicker n="06" text={fq.kicker} />
                <span id={uid + "fq"}>
                  <Split text={fq.title} className="ovs-h2" />
                </span>
                <div className="ovs-faq-card" data-rv>
                  <p>{fq.text}</p>
                  <button type="button" className="ovs-btn ovs-btn-line" onClick={copyEmail}>
                    <span aria-live="polite">{copied ? "Copied to clipboard" : email}</span>
                  </button>
                </div>
              </div>
              <div className="ovs-acc">
                {fq.items.map((f, i) => {
                  const open = faqOpen === i
                  return (
                    <div key={f.q} className="ovs-acc-item" data-open={open ? "" : undefined} data-rv>
                      <h3>
                        <button type="button" aria-expanded={open} aria-controls={uid + "fa" + i} onClick={() => setFaqOpen(open ? -1 : i)}>
                          {f.q}
                          <span className="ovs-plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div id={uid + "fa" + i} className="ovs-fold" role="region" aria-label={f.q}>
                        <div>
                          <p>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* --------------------------------------------------------- finale */}
        {cta ? (
          <section className="ovs-fin" data-fin data-sec="contact" aria-labelledby={uid + "cta"}>
            <div className="ovs-fin-stage">
              <div className="ovs-window">
                {usePhoto ? <PhotoCanopy src={photo as string} season={season} scheme={scheme} turn /> : <Canopy seed={seed + 31} scheme={scheme} palette={pal} lazy />}
                <div className="ovs-fin-copy">
                  <h2 id={uid + "cta"} className="ovs-fin-h">
                    {cta.title || DEFAULT_CTA.title}
                  </h2>
                  <p>{cta.text || DEFAULT_CTA.text}</p>
                  <div className="ovs-fin-actions">
                    <Magnet className="ovs-btn ovs-btn-dark ovs-btn-xl" href={"mailto:" + email} onClick={onBook ? book("finale") : undefined}>
                      <span>{cta.button || DEFAULT_CTA.button}</span>
                      <Arrow />
                    </Magnet>
                    <button type="button" className="ovs-btn ovs-btn-glass ovs-btn-xl" onClick={copyEmail}>
                      <span aria-live="polite">{copied ? "Copied" : email}</span>
                      <svg className="ovs-svg ovs-arrow" viewBox="0 0 16 16" aria-hidden="true">
                        {copied ? <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M5.5 5.5V3.5h7v7h-2M3.5 5.5h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      {/* ---------------------------------------------------------- footer */}
      {ft ? (
        <footer className="ovs-foot">
          <div className="ovs-wrap">
            <div className="ovs-foot-top">
              <form className="ovs-news" onSubmit={subscribe} noValidate>
                <label htmlFor={uid + "mail"}>Field notes, once a month. What we learn shipping for startups.</label>
                <div className="ovs-news-row">
                  <input
                    id={uid + "mail"}
                    type="email"
                    autoComplete="email"
                    placeholder="you@startup.com"
                    value={mail}
                    onChange={(e) => {
                      setMail(e.target.value)
                      if (mailState !== "sending") setMailState("idle")
                    }}
                    aria-invalid={mailState === "invalid" || mailState === "error"}
                    aria-describedby={uid + "mailmsg"}
                  />
                  <button type="submit" className="ovs-btn ovs-btn-lime" disabled={mailState === "sending"}>
                    {mailState === "sending" ? "Sending" : "Subscribe"}
                  </button>
                </div>
                <p id={uid + "mailmsg"} className="ovs-news-msg" aria-live="polite" data-state={mailState}>
                  {mailState === "invalid" ? "That email does not look right." : mailState === "error" ? "Something went wrong. Try again?" : mailState === "done" ? "You are in. First notes land next month." : ""}
                </p>
              </form>
              <div className="ovs-foot-cols">
                {ft.columns.map((col) => (
                  <div key={col.title}>
                    <p>{col.title}</p>
                    <ul>
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a href={l.href || "#"} onClick={go(l.href)}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div>
                  <p>{ft.city}</p>
                  <ul>
                    <li className="ovs-clock">
                      <i />
                      <Clock timeZone={ft.timeZone} />
                    </li>
                    <li>
                      <a href={"mailto:" + email}>{email}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="ovs-wordmark" data-wordmark aria-hidden="true">
            {Array.from(brand).map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
          </div>
          <div className="ovs-wrap ovs-foot-bottom">
            <span>
              © {new Date().getFullYear()} {brand} Studio
            </span>
            <span>{ft.note}</span>
            <button type="button" className="ovs-top" onClick={() => root.current?.scrollIntoView({ behavior: still ? "auto" : "smooth" })}>
              Back to the canopy
              <svg className="ovs-svg ovs-arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </footer>
      ) : null}
    </div>
  )
}
