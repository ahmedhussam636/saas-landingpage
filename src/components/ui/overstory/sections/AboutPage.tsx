import * as React from "react"
import { ArrowLeft } from "lucide-react"
import type { OvsStat } from "../types"
import { formatNumber, manifestoParts } from "../canopy"
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
  "Codly started in Egypt with one rule: [team] never hand a Figma file over a wall and walk away. [chart] We pair senior product designers and full-stack engineers in one compact crew [leaf] so startups go from raw napkin sketch to shipped software in weeks."

const STUDIO_FACTS = [
  {
    title: "A small senior crew",
    detail:
      "You work directly with principal designers and full-stack engineers, in Egypt or remote. There are no account managers in between.",
  },
  {
    title: "Brand, interface and code together",
    detail:
      "Design systems, motion and production TypeScript are built in the same weekly sprint by the same people.",
  },
  {
    title: "Daily previews, Friday demos",
    detail:
      "A live staging link every day, a recorded demo every Friday, and the repository is yours from the first commit.",
  },
]

const ABOUT_PRINCIPLES = [
  {
    title: "No handoff tax",
    tag: "Design and code",
    text: "The designer who sets the typography and interaction states sits in the same daily loop as the engineer shipping React and APIs. Nothing gets lost in translation.",
    chips: ["Shared daily standups", "Figma to TypeScript", "Motion specs in code"],
  },
  {
    title: "Four startups a quarter",
    tag: "Senior only",
    text: "We cap our active roster so every founding team works directly with principal builders who have scaled products before. Work is never handed down to juniors.",
    chips: ["Direct founder access", "Principal pods", "No account managers"],
  },
  {
    title: "Weekly ships, daily links",
    tag: "Cadence",
    text: "Instead of disappearing for two months before one big reveal, you get a live preview link every day and a recorded product demo every Friday.",
    chips: ["Friday Loom and live demos", "Daily staging previews", "Fixed weekly cadence"],
  },
  {
    title: "Yours from the first commit",
    tag: "Full ownership",
    text: "Every repository, Figma library, token system and deployment pipeline lives inside your own GitHub and workspace from day one.",
    chips: ["Client-owned repos", "Documented components", "No lock-in"],
  },
]

const ABOUT_MILESTONES = [
  {
    year: "2019",
    stage: "Seed",
    title: "Founded in Egypt",
    text: "Two designers and two engineers left agency retainers to build a fast, transparent product pod for early-stage software founders.",
  },
  {
    year: "2021",
    stage: "Sapling",
    title: "The no-handoff subscription",
    text: "We introduced the Product Partner sprint, one weekly crew in place of a separate branding agency and freelance dev shop.",
  },
  {
    year: "2023",
    stage: "Branch",
    title: "30+ SaaS and AI launches shipped",
    text: "Clinical AI, fintech and devtool teams cut median time to v1 to six weeks, with design systems their own hires can maintain.",
  },
  {
    year: "2025",
    stage: "Canopy",
    title: "$410M+ raised by partner startups",
    text: "48+ startups that launched with Codly have gone on to raise seed through Series B rounds.",
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
      {/* ---------------------------------------------------------- intro */}
      <section
        className="ovs-sec ovs-manifesto"
        style={{
          paddingTop: "clamp(120px, 14vw, 168px)",
          paddingBottom: "clamp(56px, 7vw, 96px)",
        }}
        data-sec="about"
        aria-labelledby={uid + "-about-h"}
      >
        <div className="ovs-wrap">
          <div className="ovs-page-top">
            <a href="/" onClick={go("/")} className="ovs-back">
              <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
              <span>Home</span>
            </a>
          </div>

          <Kicker n={brand} text="Studio in Egypt and remote" />

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
            who ship beside founders
          </h1>

          <div
            className="mt-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
            data-rv
          >
            <p className="ovs-lede" style={{ maxWidth: "46ch", margin: 0 }}>
              One compact studio for brand identity, product design and
              production engineering, so early-stage software ships in weeks
              instead of quarters.
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

          <dl className="ovs-about-facts">
            {STUDIO_FACTS.map((f) => (
              <div key={f.title}>
                <dt>{f.title}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------------------------- 01 story */}
      <section className="ovs-sec" data-sec="about-story" aria-label="Our story">
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
            <dl className="ovs-stats">
              {stats.map((s) => (
                <div key={s.label} className="ovs-stat" data-rv>
                  <span className="ovs-stat-rule" />
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
                </div>
              ))}
            </dl>
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
                  text="Four principles behind every product we build"
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

          <div className="ovs-svc-list" data-plain="">
            {ABOUT_PRINCIPLES.map((item, i) => {
              const open = openPrinciple === i
              return (
                <div
                  key={item.title}
                  className="ovs-svc-row"
                  data-open={open ? "" : undefined}
                >
                  <h3 className="ovs-svc-h">
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={uid + "prp" + i}
                      onClick={() => setOpenPrinciple(open ? -1 : i)}
                    >
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
                </div>
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
              <Kicker n="03" text="How the studio grew" />
              <span id={uid + "abt"}>
                <Split
                  text="Seven years of building calm, fast software teams"
                  className="ovs-h2"
                />
              </span>
            </div>
            <div className="ovs-head-side" data-rv>
              <p className="ovs-lede">
                From our first desk in Egypt to partnering with startups in
                San Francisco, London and Stockholm.
              </p>
            </div>
          </div>

          <div className="ovs-proc-grid">
            <div className="ovs-tree-col">
              <div className="ovs-tree-stick">
                <figure className="ovs-about-card">
                  <figcaption className="ovs-about-card-by">
                    <span className="ovs-brandmark inline-flex">
                      <BrandMark />
                    </span>
                    <span>{brand}, Egypt</span>
                  </figcaption>
                  <blockquote>
                    &ldquo;Small senior crews out-ship large agencies, week
                    after week.&rdquo;
                  </blockquote>
                  <p>
                    Every project gets the same eight people who build our own
                    tools: design systems, motion and production TypeScript
                    under one roof.
                  </p>
                  <a
                    href="/#work"
                    onClick={go("#work")}
                    className="ovs-btn ovs-btn-dark"
                  >
                    See selected work <Arrow />
                  </a>
                </figure>
              </div>
            </div>

            <ol>
              {ABOUT_MILESTONES.map((m) => (
                <li key={m.year} className="ovs-mile">
                  <div className="ovs-mile-k">
                    <span>{m.year}</span>
                    <b>{m.stage}</b>
                  </div>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
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
