import * as React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Compass, Layers, Sparkles } from "lucide-react"
import type { OvsStat } from "../types"
import { formatNumber, manifestoParts } from "../canopy"
import { OVS_EASE, OVS_VIEWPORT, ScrollParallax, ScrollReveal } from "../motion"
import { Arrow, BrandMark, Kicker, Magnet, Split, WordMorph } from "../marks"

const TeamSection = React.lazy(() =>
  import("./TeamSection").then((m) => ({ default: m.TeamSection })),
)

interface AboutPageProps {
  uid: string
  brand: string
  still: boolean
  stats: OvsStat[] | null
  go: (href?: string) => (e?: React.MouseEvent) => void
  book: (from: string) => (e: React.MouseEvent) => void
}

const ABOUT_STORY =
  "Codly started in Lisbon with one rule: [team] never hand a Figma file over a wall and walk away. [chart] We pair senior product designers and full-stack engineers in one compact crew [leaf] so startups go from raw napkin sketch to shipped software in weeks."

const STUDIO_HIGHLIGHTS = [
  {
    icon: Compass,
    eyebrow: "Lisbon & Remote",
    title: "Small senior crew by design",
    detail: "Every partner works directly with principal designers and full-stack engineers—no account layers.",
  },
  {
    icon: Layers,
    eyebrow: "One Unified Loop",
    title: "Brand, UI, and code together",
    detail: "Design systems, motion craft, and production TypeScript built in the same weekly sprint.",
  },
  {
    icon: Sparkles,
    eyebrow: "8-Week Cadence",
    title: "Daily links, Friday demos",
    detail: "Live staging previews every day and full repository ownership from your very first commit.",
  },
]

const ABOUT_PRINCIPLES = [
  {
    title: "Zero handoff tax",
    tag: "Design + Code",
    text: "The designer who crafts the typography and interaction states sits in the same daily loop as the engineer shipping React and APIs. Nothing gets diluted in translation.",
    chips: ["Shared daily standups", "Figma to TypeScript", "Motion specs in code"],
  },
  {
    title: "Four startups a quarter",
    tag: "Senior only",
    text: "We cap our active roster intentionally so every founding team works directly with principal builders who have scaled products before—never handed down to juniors.",
    chips: ["Direct founder access", "Principal pods", "No account managers"],
  },
  {
    title: "Weekly ships, daily links",
    tag: "Momentum",
    text: "Instead of disappearing for two months before one big reveal, you get a live preview link every day and a recorded product demo every Friday.",
    chips: ["Friday Loom & live demos", "Daily staging previews", "Fixed weekly cadence"],
  },
  {
    title: "Yours from commit one",
    tag: "100% Ownership",
    text: "Every repository, Figma library, token system, and deployment pipeline lives inside your own GitHub and workspace from day one.",
    chips: ["Client-owned repos", "Documented components", "Zero lock-in"],
  },
]

const ABOUT_MILESTONES = [
  {
    year: "2019",
    badge: "Seed",
    title: "Founded under the trees in Lisbon",
    text: "Two designers and two engineers left bloated agency retainers to build a fast, transparent product pod for early-stage software founders.",
  },
  {
    year: "2021",
    badge: "Sapling",
    title: "The no-handoff subscription model",
    text: "Introduced our combined Product Partner sprint—replacing fragmented branding agencies and freelance dev shops with one unified weekly crew.",
  },
  {
    year: "2023",
    badge: "Branch",
    title: "30+ SaaS & AI launches shipped",
    text: "Helped clinical AI, fintech, and devtool teams cut median time-to-v1 down to six weeks while keeping design systems maintainable for internal hires.",
  },
  {
    year: "2025+",
    badge: "Canopy",
    title: "$410M+ raised by partner startups",
    text: "Today, 48+ startups launched with Codly have gone on to raise seed through Series B rounds backed by crisp product execution.",
  },
]

export function AboutPage({
  uid,
  brand,
  still,
  stats,
  go,
  book,
}: AboutPageProps) {
  const [openPrinciple, setOpenPrinciple] = React.useState(0)

  return (
    <>
      {/* ---------------------------------------------------------- editorial intro (no full-bleed canopy hero) */}
      <section
        className="ovs-sec ovs-manifesto"
        style={{
          paddingTop: "clamp(120px, 14vw, 170px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
        }}
        data-sec="about"
        aria-labelledby={uid + "-about-h"}
      >
        <div className="ovs-wrap">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <a
              href="/"
              onClick={go("/")}
              className="ovs-btn ovs-btn-line"
            >
              <ArrowLeft className="size-4" />
              <span>Back to home</span>
            </a>

            <div
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium"
              style={{
                borderColor: "var(--ovs-line)",
                backgroundColor: "var(--ovs-card)",
                color: "var(--ovs-ink2)",
              }}
            >
              <span
                className="inline-block size-2 rounded-full"
                style={{ backgroundColor: "var(--ovs-accent)" }}
              />
              <span>About {brand} · Lisbon &amp; Remote</span>
            </div>
          </div>

          <Kicker n="ABOUT" text="Studio &amp; craft" />

          <h1
            id={uid + "-about-h"}
            className="ovs-h2 ovs-h2-wide"
            style={{ maxWidth: "16ch" }}
          >
            Built by senior{" "}
            <span className="ovs-sr">Crafters </span>
            <span aria-hidden="true">
              <WordMorph
                words={["Crafters", "Engineers", "Designers", "Partners"]}
                still={still}
              />
            </span>{" "}
            who ship beside founders.
          </h1>

          <div
            className="mt-7 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
            data-rv
          >
            <p
              className="ovs-lede"
              style={{ maxWidth: "46ch", margin: 0 }}
            >
              One compact studio uniting brand identity, product design, and
              production engineering—so early-stage software ships in weeks
              without agency bloat.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnet
                className="ovs-btn ovs-btn-dark"
                href="#contact"
                onClick={book("about-intro")}
              >
                <span>Work with us</span>
                <Arrow />
              </Magnet>
              <a
                className="ovs-btn ovs-btn-line"
                href="#about-story"
                onClick={go("#about-story")}
              >
                Read our story
              </a>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STUDIO_HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon
              return (
                <ScrollReveal
                  key={item.title}
                  delay={idx * 0.06}
                  y={20}
                  className="rounded-3xl border p-6"
                  style={{
                    borderColor: "var(--ovs-line)",
                    backgroundColor: "var(--ovs-card)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "var(--ovs-accent)" }}
                    >
                      {item.eyebrow}
                    </span>
                    <Icon
                      className="size-4"
                      style={{ color: "var(--ovs-ink2)" }}
                    />
                  </div>
                  <div
                    className="mt-4 text-lg font-semibold tracking-tight"
                    style={{ color: "var(--ovs-ink)" }}
                  >
                    {item.title}
                  </div>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--ovs-ink2)" }}
                  >
                    {item.detail}
                  </p>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 01 story */}
      <section
        className="ovs-sec"
        data-sec="about-story"
        aria-label="Our story"
      >
        <div className="ovs-wrap">
          <Kicker n="01" text="Why we exist" />
          <p className="ovs-man" data-manifesto>
            {manifestoParts(ABOUT_STORY).map((p, i) =>
              p.pic ? (
                <span
                  key={i}
                  className={"ovs-pic ovs-pic-" + p.pic}
                  aria-hidden="true"
                >
                  {p.pic === "team" ? (
                    <>
                      <i>
                        <b>AL</b>
                      </i>
                      <i>
                        <b>RM</b>
                      </i>
                      <i>
                        <b>KA</b>
                      </i>
                    </>
                  ) : p.pic === "chart" ? (
                    <svg className="ovs-svg" viewBox="0 0 80 40">
                      <path
                        d="M4 34 L20 26 L32 30 L48 16 L60 20 L76 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
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
            <ScrollParallax offset={18}>
              <dl className="ovs-stats">
                {stats.map((s) => (
                  <div key={s.label} className="ovs-stat" data-rv>
                    <span className="ovs-stat-rule" />
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.35, ease: OVS_EASE }}
                    >
                      <dd
                        data-count={s.value}
                        data-dec={s.decimals || 0}
                        data-pre={s.prefix || ""}
                        data-suf={s.suffix || ""}
                      >
                        {(s.prefix || "") +
                          formatNumber(s.value, s.decimals || 0) +
                          (s.suffix || "")}
                      </dd>
                      <dt>{s.label}</dt>
                    </motion.div>
                  </div>
                ))}
              </dl>
            </ScrollParallax>
          ) : null}
        </div>
      </section>

      {/* ---------------------------------------------------------- 02 principles */}
      <section
        className="ovs-sec"
        data-sec="about-principles"
        aria-labelledby={uid + "abp"}
      >
        <div className="ovs-wrap">
          <div className="ovs-head">
            <div>
              <Kicker n="02" text="How we think" />
              <span id={uid + "abp"}>
                <Split
                  text="Four principles that shape every product we touch."
                  className="ovs-h2"
                />
              </span>
            </div>
            <div className="ovs-head-side" data-rv>
              <p className="ovs-lede">
                Software ages fast when design and engineering drift apart. We
                stay small on purpose so quality never gets delegated.
              </p>
            </div>
          </div>

          <div className="ovs-svc-list">
            {ABOUT_PRINCIPLES.map((item, i) => {
              const open = openPrinciple === i
              return (
                <motion.div
                  key={item.title}
                  className="ovs-svc-row"
                  data-open={open ? "" : undefined}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={OVS_VIEWPORT}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.06,
                    ease: OVS_EASE,
                  }}
                >
                  <h3 className="ovs-svc-h">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={uid + "prp" + i}
                      onClick={() => setOpenPrinciple(open ? -1 : i)}
                    >
                      <span className="ovs-svc-n">0{i + 1}</span>
                      <span className="ovs-svc-t">{item.title}</span>
                      <span className="ovs-svc-time">{item.tag}</span>
                      <span className="ovs-plus" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    id={uid + "prp" + i}
                    className="ovs-fold"
                    role="region"
                    aria-label={item.title}
                  >
                    <div>
                      <div className="ovs-svc-body">
                        <p>{item.text}</p>
                        <ul>
                          {item.chips.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 03 timeline */}
      <section
        className="ovs-sec ovs-process"
        data-sec="about-timeline"
        aria-labelledby={uid + "abt"}
      >
        <div className="ovs-wrap">
          <div className="ovs-head">
            <div>
              <Kicker n="03" text="Studio timeline" />
              <span id={uid + "abt"}>
                <Split
                  text="Seven years of building calm, fast software teams."
                  className="ovs-h2"
                />
              </span>
            </div>
            <div className="ovs-head-side" data-rv>
              <p className="ovs-lede">
                From our first desk in Lisbon to partnering with startups across
                San Francisco, London, and Stockholm.
              </p>
            </div>
          </div>

          <div className="ovs-proc-grid">
            <div className="ovs-tree-col">
              <div className="ovs-tree-stick">
                <ScrollParallax offset={24} className="w-full">
                  <div
                    className="rounded-3xl border p-8 sm:p-10"
                    style={{
                      borderColor: "var(--ovs-line)",
                      backgroundColor: "var(--ovs-card)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="ovs-brandmark inline-flex">
                        <BrandMark />
                      </span>
                      <span
                        className="text-sm font-semibold tracking-tight"
                        style={{ color: "var(--ovs-ink)" }}
                      >
                        {brand} Studio · Lisbon
                      </span>
                    </div>
                    <p
                      className="mt-5 text-2xl font-medium tracking-tight"
                      style={{
                        color: "var(--ovs-ink)",
                        lineHeight: 1.25,
                      }}
                    >
                      &ldquo;Small senior crews out-ship large agencies every
                      single week.&rdquo;
                    </p>
                    <p
                      className="mt-4 text-sm leading-relaxed"
                      style={{ color: "var(--ovs-ink2)" }}
                    >
                      Every project gets the same eight people who work on our
                      own tools—design systems, motion craft, and production
                      TypeScript under one roof.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <a
                        href="/#work"
                        onClick={go("#work")}
                        className="ovs-btn ovs-btn-dark"
                      >
                        See selected work <Arrow />
                      </a>
                    </div>
                  </div>
                </ScrollParallax>
              </div>
            </div>

            <div className="flex flex-col">
              {ABOUT_MILESTONES.map((m, i) => (
                <ScrollReveal
                  key={m.year}
                  delay={i * 0.08}
                  y={28}
                  className="border-t py-8"
                >
                  <div
                    className="ovs-step-k"
                    style={{ marginBottom: "10px" }}
                  >
                    <span>{m.year}</span>
                    <b>{m.badge}</b>
                    <em>0{i + 1}</em>
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(26px, 3vw, 40px)",
                      letterSpacing: "-0.04em",
                      fontWeight: 500,
                      lineHeight: 1.1,
                      color: "var(--ovs-ink)",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    style={{
                      marginTop: "12px",
                      fontSize: "clamp(15px, 1.2vw, 18px)",
                      color: "var(--ovs-ink2)",
                      maxWidth: "30em",
                      lineHeight: 1.55,
                    }}
                  >
                    {m.text}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- 04 crew */}
      <React.Suspense fallback={<div className="min-h-[420px] w-full" />}>
        <TeamSection
          uid={uid + "ab"}
          brand={brand}
          still={still}
          book={book}
          kickerNumber="04"
        />
      </React.Suspense>
    </>
  )
}
