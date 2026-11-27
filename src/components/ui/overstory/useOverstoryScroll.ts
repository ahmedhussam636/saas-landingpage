import * as React from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { clamp, formatNumber, stepAt } from "./canopy"
import { useIso } from "./marks"

interface UseOverstoryScrollArgs {
  root: React.RefObject<HTMLDivElement | null>
  still: boolean
  usePhoto: boolean
  heroIn: React.MutableRefObject<null | (() => void)>
  heroReady: React.MutableRefObject<boolean>
  gust: React.MutableRefObject<null | ((x: number) => void)>
  setCaseIdx: React.Dispatch<React.SetStateAction<number>>
  quoteCount: number
  quote: number
  quotePaused: boolean
  setQuote: React.Dispatch<React.SetStateAction<number>>
}

export function useOverstoryScroll({
  root,
  still,
  usePhoto,
  heroIn,
  heroReady,
  gust,
  setCaseIdx,
  quoteCount,
  quote,
  quotePaused,
  setQuote,
}: UseOverstoryScrollArgs) {
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

        if (!heroEl) return

        /* 1. arrival: words rise, then the trees close in around the sky */
        const navIn = q(".ovs-nav-in")
        const statusEl = q("[data-hero] .ovs-status")
        const heroLines = q("[data-hero] .ovs-line > span")
        const trustedEl = q("[data-hero] .ovs-trusted")
        const logoEls = q("[data-hero] .ovs-logos .ovs-logo")
        const cueEl = q("[data-hero] .ovs-cue")

        const intro = gsap.timeline({ defaults: { ease: "expo.out" } })
        if (navIn.length) intro.fromTo(navIn, { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.2 }, 0.2)
        if (statusEl.length) intro.fromTo(statusEl, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.25)
        if (heroLines.length) intro.fromTo(heroLines, { yPercent: 115, rotate: 2.5 }, { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12 }, 0.3)
        if (trustedEl.length) intro.fromTo(trustedEl, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.9)
        if (logoEls.length) intro.fromTo(logoEls, { y: 22, autoAlpha: 0, filter: "blur(8px)" }, { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.07, clearProps: "filter" }, 1.0)
        if (cueEl.length) intro.fromTo(cueEl, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, 1.6)
        if (heroLayers.length) gsap.set(heroLayers, { autoAlpha: 0 })
        const skyEl = q("[data-hero] [data-sky]")
        if (!photoMode && skyEl.length) gsap.set(skyEl, { scale: 1.08 })
        let entered = false
        heroIn.current = () => {
          if (entered) return
          entered = true
          if (photoMode) {
            // the eye adjusting: the canopy comes into focus as it settles
            if (heroLayers[1]) gsap.set(heroLayers[1], { autoAlpha: 1 })
            if (heroLayers[0]) gsap.fromTo(heroLayers[0], { autoAlpha: 0, scale: 1.24, rotate: -4, filter: "blur(18px) brightness(1.25)" }, { autoAlpha: 1, scale: 1, rotate: 0, filter: "blur(0px) brightness(1)", duration: 2.9, ease: "expo.out", clearProps: "filter" })
            return
          }
          if (skyEl.length) gsap.to(skyEl, { scale: 1, duration: 2.6, ease: "expo.out" })
          if (heroLayers.length) gsap.fromTo(heroLayers, { autoAlpha: 0, scale: (i: number) => 1.45 + i * 0.28, rotate: (i: number) => (i % 2 ? -6 : 6) }, { autoAlpha: 1, scale: 1, rotate: 0, duration: 2.6, stagger: 0.14, ease: "expo.out" })
        }
        if (heroReady.current) heroIn.current()

        /* 2. rise: scroll lifts you through the layers and out into open sky */
        const rise = gsap.timeline({ scrollTrigger: { trigger: heroEl, start: "top top", end: "bottom bottom", scrub: 0.9 } })
        const zs = [1.55, 1.95, 2.6, 3.6]
        const rs = [2, -3, 5, -9]
        if (photoMode) {
          // into the gap in the trees, with the near leaves rushing past out of focus
          if (heroZoom[0]) rise.to(heroZoom[0], { scale: 2.5, rotate: 6, ease: "power2.in", duration: 1 }, 0)
          if (heroZoom[1]) {
            rise
              .fromTo(heroZoom[1], { scale: 1.04, opacity: 0 }, { scale: 3.6, opacity: 1, ease: "power2.in", duration: 0.7 }, 0.04)
              .to(heroZoom[1], { opacity: 0, ease: "none", duration: 0.25 }, 0.74)
          }
        } else {
          heroZoom.forEach((z, i) => rise.to(z, { scale: zs[i], rotate: rs[i], ease: "power2.in", duration: 1 }, 0))
          const skyCanvas = q("[data-hero] [data-sky] canvas")
          if (skyCanvas.length) rise.to(skyCanvas, { scale: 1.22, ease: "none", duration: 1 }, 0)
        }
        const copyEl = q("[data-hero] .ovs-copy")
        const veilEl = q("[data-hero] .ovs-veil")
        const aboveEl = q("[data-hero] .ovs-above")
        if (copyEl.length) rise.to(copyEl, { y: () => -window.innerHeight * 0.16, scale: 0.92, autoAlpha: 0, filter: "blur(10px)", ease: "power1.in", duration: 0.5 }, 0.05)
        if (cueEl.length) rise.to(cueEl, { autoAlpha: 0, duration: 0.1 }, 0)
        if (veilEl.length) rise.fromTo(veilEl, { yPercent: 50 }, { yPercent: -50, ease: "power1.inOut", duration: 0.55 }, 0.45)
        if (aboveEl.length) rise.fromTo(aboveEl, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.62)

        /* pointer parallax and a gust on click */
        if (fine && heroLayers.length) {
          const depth = photoMode ? [16, 48] : [8, 14, 24, 40]
          const xs = heroLayers.map((l) => gsap.quickTo(l, "x", { duration: 1.4, ease: "power3.out" }))
          const ys = heroLayers.map((l) => gsap.quickTo(l, "y", { duration: 1.4, ease: "power3.out" }))
          const copyTarget = copyEl[0]
          const cx = copyTarget ? gsap.quickTo(copyTarget, "x", { duration: 1.6, ease: "power3.out" }) : null
          const onMove = (e: PointerEvent) => {
            const b = heroEl.getBoundingClientRect()
            const nx = (e.clientX - b.left) / b.width - 0.5
            const ny = (e.clientY - b.top) / window.innerHeight - 0.5
            heroLayers.forEach((_, i) => {
              xs[i](-nx * depth[i])
              ys[i](-ny * depth[i] * 0.7)
            })
            cx?.(nx * 6)
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
          const ws = h.querySelectorAll("[data-w]")
          if (ws.length) gsap.fromTo(ws, { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.045, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%", once: true } })
        })
        const rv = q("[data-rv]") as HTMLElement[]
        if (rv.length) {
          gsap.set(rv, { autoAlpha: 0, y: 34 })
          ScrollTrigger.batch(rv, { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.08, ease: "expo.out", overwrite: true }) })
        }

        /* 4. manifesto reads itself in */
        const man = q("[data-manifesto]")[0]
        if (man) {
          const mws = man.querySelectorAll("[data-mw]")
          const pics = man.querySelectorAll(".ovs-pic")
          if (mws.length) gsap.fromTo(mws, { opacity: 0.12 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: man, start: "top 78%", end: "bottom 45%", scrub: true } })
          if (pics.length) gsap.fromTo(pics, { scale: 0, rotate: -12 }, { scale: 1, rotate: 0, ease: "back.out(2)", duration: 0.9, stagger: 0.2, scrollTrigger: { trigger: man, start: "top 60%", once: true } })
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
        const svcRows = q(".ovs-svc-row")
        const list = q(".ovs-svc-list")[0] as HTMLElement | undefined
        if (svcRows.length && list) {
          gsap.fromTo(svcRows, { "--ovs-rule": 0 }, { "--ovs-rule": 1, duration: 1.4, stagger: 0.08, ease: "expo.inOut", scrollTrigger: { trigger: list, start: "top 85%", once: true } })
        }
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
          const skew = cards.length ? gsap.quickTo(cards, "skewX", { duration: 0.5, ease: "power3.out" }) : null
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
                skew?.(clamp(s.getVelocity() / -260, -6, 6))
                setCaseIdx(stepAt(s.progress, cards.length))
                const bar = q("[data-bar]")[0] as HTMLElement | undefined
                if (bar) bar.style.transform = "scaleX(" + s.progress + ")"
              },
              onLeave: () => skew?.(0),
              onLeaveBack: () => skew?.(0),
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
          const stepsEl = proc.querySelector(".ovs-steps")
          const grow = stepsEl ? gsap.timeline({ scrollTrigger: { trigger: stepsEl, start: "top 65%", end: "bottom 70%", scrub: 0.8 } }) : null
          const grows = proc.querySelectorAll("[data-grow]")
          const leavesAll = proc.querySelectorAll("[data-leaves] > *")
          if (grows.length) gsap.set(grows, { strokeDasharray: 1, strokeDashoffset: 1 })
          if (leavesAll.length) gsap.set(leavesAll, { scale: 0, transformOrigin: "50% 50%" })
          if (grow) {
            for (let s = 0; s < 4; s++) {
              const stems = proc.querySelectorAll('[data-grow="' + s + '"]')
              const leaves = proc.querySelectorAll('[data-leaves="' + s + '"] > *')
              if (stems.length) grow.to(stems, { strokeDashoffset: 0, duration: 1, ease: "none" }, s)
              if (leaves.length) grow.to(leaves, { scale: 1, duration: 0.7, stagger: s === 3 ? 0.01 : 0.12, ease: "back.out(2.2)" }, s + 0.45)
            }
            const sunEl = proc.querySelector("[data-sun]")
            if (sunEl) grow.fromTo(sunEl, { attr: { cy: 210 } }, { attr: { cy: 70 }, duration: 4, ease: "none" }, 0)
          }
          proc.querySelectorAll(".ovs-step").forEach((st) => ScrollTrigger.create({ trigger: st, start: "top 62%", end: "bottom 62%", toggleClass: { targets: st, className: "ovs-on" } }))
        }

        /* 8. finale: you drop back down into the trees */
        const fin = q("[data-fin]")[0] as HTMLElement | undefined
        if (fin) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: fin, start: "top 75%", end: "bottom bottom", scrub: 0.9 } })
          const winEl = fin.querySelector(".ovs-window")
          if (winEl) tl.fromTo(winEl, { "--ovs-wi": "9%", "--ovs-wr": "40px" }, { "--ovs-wi": "0%", "--ovs-wr": "0px", ease: "power2.inOut", duration: 0.6 }, 0)
          const fz = fin.querySelectorAll("[data-zoom]")
          if (fin.querySelector("[data-photo]")) {
            // the rise in reverse: down out of the sky, through the near leaves, into the ring
            if (fz[0]) tl.fromTo(fz[0], { scale: 2.4, rotate: -6 }, { scale: 1, rotate: 0, ease: "power3.out", duration: 0.9 }, 0)
            if (fz[1]) tl.fromTo(fz[1], { scale: 3.4, opacity: 1 }, { scale: 1.05, opacity: 0, ease: "power3.out", duration: 0.7 }, 0)
          } else {
            const from = [1.5, 1.9, 2.5, 3.4]
            fz.forEach((z, i) => tl.fromTo(z, { scale: from[i], rotate: i % 2 ? 6 : -6 }, { scale: 1, rotate: 0, ease: "power3.out", duration: 0.9 }, 0))
          }
          const finCopy = fin.querySelector(".ovs-fin-copy")
          if (finCopy) tl.fromTo(finCopy, { autoAlpha: 0, y: 60, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }, 0.45)
        }

        /* 9. footer: the wordmark rises letter by letter */
        const wm = q("[data-wordmark]")[0] as HTMLElement | undefined
        if (wm) {
          const wmSpans = wm.querySelectorAll("span")
          if (wmSpans.length) {
            gsap.fromTo(
              wmSpans,
              { yPercent: 120 },
              {
                yPercent: 0,
                duration: 1.4,
                stagger: 0.05,
                ease: "expo.out",
                clearProps: "transform",
                scrollTrigger: { trigger: wm.closest("footer") || wm, start: "top 92%", once: true },
              },
            )
          }
        }

        return () => {
          heroIn.current = null
          undo.forEach((f) => f())
        }
      })
    }, r)
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    let refreshRaf = 0
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => {
      cancelAnimationFrame(refreshRaf)
      refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh())
    }) : null
    ro?.observe(r)
    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(refreshRaf)
      ro?.disconnect()
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
    if (!ws.length) return
    const t = gsap.fromTo(ws, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.02, ease: "expo.out" })
    return () => {
      t.kill()
    }
  }, [quote, still])
}
