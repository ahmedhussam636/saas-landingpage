"use client"

import * as React from "react"
import { MotionConfig } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
import { isEmail } from "./overstory/canopy"
import { readScheme } from "./overstory/marks"
import { OVS_CSS } from "./overstory/styles"
import { OVS_PHOTO } from "./overstory/photo"
import { ScrollProgressBar } from "./overstory/motion"
import { useOverstoryScroll } from "./overstory/useOverstoryScroll"
import { NavSection } from "./overstory/sections/NavSection"
import { HeroSection } from "./overstory/sections/HeroSection"
import { ManifestoSection } from "./overstory/sections/ManifestoSection"
import { ServicesSection } from "./overstory/sections/ServicesSection"
import { WorkSection } from "./overstory/sections/WorkSection"
import { ProcessSection } from "./overstory/sections/ProcessSection"
import { QuotesSection } from "./overstory/sections/QuotesSection"
import { FaqSection } from "./overstory/sections/FaqSection"
import { BentoSection } from "./overstory/sections/BentoSection"
import { FinaleSection } from "./overstory/sections/FinaleSection"
import Skiper39 from "@/components/ui/skiper39"
import Footer27 from "@/components/watermelon-ui/footer-27"

const PrismaHero = React.lazy(() => import("@/components/ui/prisma-hero").then((m) => ({ default: m.PrismaHero })))
const TeamSection = React.lazy(() => import("./overstory/sections/TeamSection").then((m) => ({ default: m.TeamSection })))

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
  brand = "Codly",
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
  email = "hello@codly.studio",
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

  const book = React.useCallback((from: string) => (e: React.MouseEvent) => {
    if (onBook) {
      e.preventDefault()
      onBook(from)
    } else go("#contact")(e)
  }, [onBook, go])

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

  useOverstoryScroll({
    root,
    still,
    usePhoto,
    heroIn,
    heroReady,
    gust,
    setCaseIdx,
    quoteCount: quotes?.length || 0,
    quote,
    quotePaused,
    setQuote,
  })

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
    <MotionConfig reducedMotion="user">
      <div ref={root} className={"ovs-root " + className} data-scheme={scheme} data-season={season} data-photo={usePhoto ? "" : undefined} data-menu={menu ? "" : undefined} style={style}>
        <style>{OVS_CSS}</style>
        <ScrollProgressBar />
        <a className="ovs-skip" href={"#" + uid + "main"}>
          Skip to content
        </a>

      <NavSection
        uid={uid}
        root={root}
        still={still}
        brand={brand}
        links={links}
        active={active}
        themeToggle={themeToggle}
        scheme={scheme}
        setOverride={setOverride}
        menu={menu}
        setMenu={setMenu}
        menuBtn={menuBtn}
        sheet={sheet}
        go={go}
        book={book}
      />

      <main id={uid + "main"}>
        <HeroSection
          uid={uid}
          status={status}
          H={H}
          words={words}
          logos={logos}
          still={still}
          usePhoto={usePhoto}
          photo={photo}
          season={season}
          scheme={scheme}
          seed={seed}
          pal={pal}
          heroReady={heroReady}
          heroIn={heroIn}
          gust={gust}
          setPhotoFail={setPhotoFail}
          go={go}
        />
        <ManifestoSection uid={uid} logos={logos} manifesto={manifesto} stats={stats} />
        <ServicesSection
          uid={uid}
          svc={svc}
          svcItems={svcItems}
          svcOpen={svcOpen}
          setSvcOpen={setSvcOpen}
          svcHover={svcHover}
          setSvcHover={setSvcHover}
        />
        <WorkSection uid={uid} wk={wk} caseIdx={caseIdx} go={go} book={book} />
        <ProcessSection uid={uid} pr={pr} seed={seed} />
        <QuotesSection
          uid={uid}
          qs={qs}
          curQuote={curQuote}
          quote={quote}
          setQuote={setQuote}
          quotePaused={quotePaused}
          setQuotePaused={setQuotePaused}
          still={still}
          usePhoto={usePhoto}
          photo={photo}
          season={season}
          seed={seed}
          pal={pal}
          setPhotoFail={setPhotoFail}
        />
        {pc ? (
          <div data-sec="pricing">
            <React.Suspense fallback={<div className="h-screen w-full" />}>
              <PrismaHero />
            </React.Suspense>
          </div>
        ) : null}
        <FaqSection
          uid={uid}
          fq={fq}
          faqOpen={faqOpen}
          setFaqOpen={setFaqOpen}
          copied={copied}
          email={email}
          copyEmail={copyEmail}
        />
        <BentoSection
          uid={uid}
          brand={brand}
          scheme={scheme}
          onSchemeChange={(next) => setOverride(next)}
          cases={wk?.items}
          stats={stats ?? undefined}
          steps={pr?.steps}
          book={book}
        />
        <React.Suspense fallback={<div className="min-h-[420px] w-full" />}>
          <TeamSection uid={uid} brand={brand} still={still} book={book} />
        </React.Suspense>
        <FinaleSection
          uid={uid}
          cta={cta}
          usePhoto={usePhoto}
          photo={photo}
          season={season}
          scheme={scheme}
          seed={seed}
          pal={pal}
          email={email}
          copied={copied}
          copyEmail={copyEmail}
          book={book}
          onBook={onBook}
        />
        <Skiper39 uid={uid} />
      </main>
      </div>
      {ft ? (
        <Footer27
          brand={brand}
          email={email}
          onNavigate={(href, e) => go(href)(e)}
          onBook={onBook ? book : undefined}
        />
      ) : null}
    </MotionConfig>
  )
}
