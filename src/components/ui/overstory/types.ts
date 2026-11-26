import type * as React from "react"

export type OvsLink = { label: string; href?: string }

export type OvsMark = "watch" | "slash" | "scribe" | "knot" | "venn" | "leaf"

export type OvsLogo = { name: string; mark?: OvsMark; type?: "sans" | "serif" | "heavy" }

export type OvsStat = { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }

export type OvsServiceArt = "brand" | "product" | "site" | "code" | "system"

export type OvsService = { title: string; text: string; tags: string[]; time: string; art?: OvsServiceArt }

export type OvsMock = "dashboard" | "chat" | "doc" | "mobile"

export type OvsCase = {
  client: string
  mark?: OvsMark
  kind: string
  title: string
  metric: string
  metricLabel: string
  year: string
  mock?: OvsMock
  /** Two colours for the card's backdrop. */
  tint?: [string, string]
  href?: string
}

export type OvsStep = { name: string; when: string; title: string; text: string }

export type OvsQuote = { quote: string; name: string; role: string; mark?: OvsMark }

export type OvsPlan = {
  name: string
  /** Monthly price, or the fixed price when `unit` is not "/mo". `null` prints "Custom". */
  price: number | null
  /** Price per month when the quarterly switch is on. */
  quarterly?: number
  unit?: string
  text: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

export type OvsFaq = { q: string; a: string }

export type OvsSeason = "summer" | "autumn" | "blossom"

export interface OverstoryStudioLandingProps {
  brand?: string
  /** In-page links. "#work", "#services", "#process", "#pricing", "#faq" and "#contact" scroll within the page. */
  links?: OvsLink[]
  /** The small pill above the headline. `null` hides it. */
  status?: string | null
  hero?: {
    /** First line of the headline. */
    lead?: string
    /** The word that changes on the second line. The first one is what the page reads as. */
    words?: string[]
    /** What follows the changing word. */
    tail?: string
    trusted?: string
    cue?: string
  }
  logos?: OvsLogo[]
  manifesto?: { kicker?: string; text?: string } | null
  stats?: OvsStat[] | null
  services?: { kicker?: string; title?: string; text?: string; items?: OvsService[] } | null
  work?: { kicker?: string; title?: string; items?: OvsCase[]; next?: string } | null
  process?: { kicker?: string; title?: string; steps?: OvsStep[] } | null
  quotes?: OvsQuote[] | null
  pricing?: { kicker?: string; title?: string; text?: string; plans?: OvsPlan[]; quarterlyNote?: string } | null
  faq?: { kicker?: string; title?: string; text?: string; items?: OvsFaq[] } | null
  cta?: { title?: string; text?: string; button?: string } | null
  footer?: { columns?: { title: string; links: OvsLink[] }[]; city?: string; timeZone?: string; note?: string } | null
  email?: string
  currency?: string
  /** Which canopy grows over the page: green summer leaves, autumn amber, or spring blossom. */
  season?: OvsSeason
  /**
   * The canopy photo (any URL or data URI), shot looking straight up with sky in
   * the middle. It is graded for the season and for dusk in canvas. Defaults to
   * the embedded photo; `null` (or a photo that fails to load) grows the
   * generated canopy instead.
   */
  photo?: string | null
  /** Seed for the generated canopy. Change it for a different tree ring. */
  seed?: number
  /** "auto" follows the host's `.dark` class. Dark is the same forest at dusk. */
  theme?: "auto" | "light" | "dark"
  /** Show the daylight / dusk switch in the nav. */
  themeToggle?: boolean
  /** Called by every "book a call" button. Without it they scroll to the contact section. */
  onBook?: (from: string) => void
  /** Called with a valid email from the newsletter. Return (or resolve) `false`, or throw, to show an error. */
  onSubscribe?: (email: string) => unknown
  /** Height of the hero and finale stages. A definite length, so it survives any host layout. */
  height?: string
  className?: string
}


export type Rgb = number[]
export type OvsPalette = { shadow: Rgb; mid: Rgb; lit: Rgb; glow: Rgb; twig: Rgb; accent: string; soft: string; shape: number }
export type OvsLeaf = { x: number; y: number; s: number; a: number; l: number }
export type OvsTwig = { p: number[]; w: number }
