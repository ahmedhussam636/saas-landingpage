import * as React from "react"
import { ArrowLeft, Check, Copy, FileText, Mail, ShieldCheck } from "lucide-react"
import { ScrollParallax, ScrollReveal } from "../motion"
import { Arrow, Kicker, Split } from "../marks"

interface LegalClause {
  id: string
  num: string
  title: string
  summary: string
  paragraphs: string[]
  bullets?: string[]
}

interface LegalPageProps {
  mode: "terms" | "privacy"
  uid: string
  brand: string
  email: string
  copied: boolean
  copyEmail: () => void
  go: (href?: string) => (e?: React.MouseEvent) => void
  book: (from: string) => (e: React.MouseEvent) => void
}

function getTermsClauses(brand: string, email: string): LegalClause[] {
  return [
    {
      id: "scope",
      num: "01",
      title: "Scope of studio engagements",
      summary: "How sprints, partner subscriptions, and embedded pods operate.",
      paragraphs: [
        `These Terms & Conditions govern your access to the ${brand} website and any design, product strategy, or software engineering engagement agreed between you ("Client") and ${brand} Studio ("${brand}", "we", "us").`,
        "Every engagement begins with a written Statement of Work or subscription confirmation specifying deliverables, weekly cadence, pricing, and start dates.",
      ],
      bullets: [
        "Launch Sprints run on a fixed three-week scope and fixed fee.",
        "Product Partner subscriptions operate month-to-month with active requests worked one at a time unless otherwise agreed.",
        "Embedded Team pods follow the dedicated headcount and response commitments stated in your order form.",
      ],
    },
    {
      id: "ip-ownership",
      num: "02",
      title: "Intellectual property & client ownership",
      summary: "You own 100% of custom work created for your product.",
      paragraphs: [
        `From day one, all custom Figma libraries, brand assets, source code, repositories, and technical documentation produced specifically for Client under a paid engagement belong exclusively to Client upon receipt of applicable payment.`,
        `${brand} retains ownership only of pre-existing general utilities, internal scaffolding, open-source packages, and non-confidential studio know-how. Unless you ask us in writing not to, ${brand} may showcase non-confidential launched visuals in our selected work portfolio.`,
      ],
    },
    {
      id: "billing-pause",
      num: "03",
      title: "Billing, pauses & cancellation",
      summary: "Transparent billing with no surprise retainers or lock-in.",
      paragraphs: [
        "Invoices are due according to the schedule in your engagement summary. For Partner plans, billing recurs monthly in advance unless paused or cancelled prior to the next billing cycle.",
        "If you pause a Product Partner subscription mid-cycle, unused billing days remain banked and roll over for up to sixty (60) days so you can resume without losing paid sprint time.",
      ],
      bullets: [
        "Pause or cancel any monthly Partner subscription before renewal with zero penalty fees.",
        "Fixed Launch Sprints are billed 50% at kickoff and 50% upon final Figma/code handover.",
      ],
    },
    {
      id: "confidentiality",
      num: "04",
      title: "Confidentiality & mutual NDA",
      summary: "Your roadmap, customer data, and pre-launch ideas stay private.",
      paragraphs: [
        `Both ${brand} and Client agree to protect non-public business plans, product roadmaps, source code, credentials, and user research shared during discovery or active sprints.`,
        "Access to your repositories, analytics, and design workspaces is limited strictly to the senior builders assigned to your pod.",
      ],
    },
    {
      id: "liability",
      num: "05",
      title: "Warranties, fair use & liability",
      summary: "Reasonable commercial care and standard liability boundaries.",
      paragraphs: [
        `${brand} warrants that all custom deliverables are original work created by our crew and free from undisclosed third-party restrictions. Third-party open-source dependencies remain governed by their respective licenses.`,
        `To the maximum extent permitted by applicable law, neither party shall be liable for indirect or consequential damages, and ${brand}'s aggregate liability under any engagement shall not exceed the fees paid by Client during the preceding three (3) months. Questions regarding these terms can always be sent to ${email}.`,
      ],
    },
  ]
}

function getPrivacyClauses(brand: string, email: string): LegalClause[] {
  return [
    {
      id: "collect",
      num: "01",
      title: "Information we collect",
      summary: "Only what is needed to reply to your inquiry and run our site.",
      paragraphs: [
        `At ${brand}, we keep data collection minimal and transparent. When you reach out to book an intro call or email us at ${email}, we collect the name, work email, company details, and project notes you choose to share.`,
        "We do not sell, rent, or trade founder contact details or client project information with third-party data brokers or ad networks.",
      ],
      bullets: [
        "Contact details submitted voluntarily via email or intro call inquiries.",
        "Basic technical metadata (browser type, viewport size, preferred light/dark mode) processed locally to render the interface smoothly.",
      ],
    },
    {
      id: "cookies",
      num: "02",
      title: "Local storage & cookies",
      summary: "Lightweight local preferences without invasive ad trackers.",
      paragraphs: [
        `${brand} uses browser localStorage solely to remember lightweight interface preferences—such as whether you joined the interactive community crowd walk and your preferred light/dark theme.`,
        "You can clear localStorage or reset the interactive crowd state at any time directly inside your browser settings or via the on-page Reset control.",
      ],
    },
    {
      id: "usage",
      num: "03",
      title: "How we use your information",
      summary: "Responding to founders, scoping sprints, and improving reliability.",
      paragraphs: [
        "Information you share with us is used strictly to evaluate project fit, prepare written sprint proposals, communicate during active engagements, and fulfill legal or invoicing obligations.",
      ],
      bullets: [
        "Scheduling intro calls and sending written project estimates within one business day.",
        "Delivering weekly demos, shared Slack/GitHub collaboration, and invoicing.",
        "Maintaining site security, uptime, and accessibility.",
      ],
    },
    {
      id: "subprocessors",
      num: "04",
      title: "Subprocessors & workspace security",
      summary: "Trusted infrastructure with strict least-privilege access.",
      paragraphs: [
        "During active client work, deliverables live primarily inside your own chosen workspace (such as your GitHub, Figma, Vercel, or cloud database accounts). For studio communication and billing, we rely on vetted enterprise providers with strong encryption in transit and at rest.",
      ],
    },
    {
      id: "rights",
      num: "05",
      title: "Your privacy rights & contact",
      summary: "Request access, correction, or deletion anytime.",
      paragraphs: [
        "Depending on your jurisdiction (including GDPR in the EU/EEA and UK, and CCPA/CPRA in California), you have the right to request access to, correction of, portability of, or deletion of personal data we hold about you.",
        `To exercise any privacy right or ask a question about how ${brand} handles data, email ${email} and a founder will respond directly.`,
      ],
    },
  ]
}

export function LegalPage({
  mode,
  uid,
  brand,
  email,
  copied,
  copyEmail,
  go,
  book,
}: LegalPageProps) {
  const isTerms = mode === "terms"
  const clauses = React.useMemo(
    () => (isTerms ? getTermsClauses(brand, email) : getPrivacyClauses(brand, email)),
    [isTerms, brand, email],
  )

  const scrollToClause = (id: string) => {
    const el = document.getElementById(uid + "-" + id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* ---------------------------------------------------------- legal header */}
      <section
        className="ovs-sec ovs-manifesto"
        style={{ paddingTop: "clamp(120px, 14vw, 170px)", paddingBottom: "clamp(56px, 7vw, 90px)" }}
        data-sec={mode}
        aria-labelledby={uid + "-legal-h"}
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

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={go("/terms")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "40px",
                  padding: "0 16px",
                  borderRadius: "999px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  backgroundColor: isTerms ? "var(--ovs-ink)" : "var(--ovs-card)",
                  color: isTerms ? "var(--ovs-paper)" : "var(--ovs-ink)",
                  border: "1px solid var(--ovs-line)",
                  cursor: "pointer",
                }}
              >
                <FileText className="size-3.5" />
                <span>Terms &amp; Conditions</span>
              </button>

              <button
                type="button"
                onClick={go("/privacy")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "40px",
                  padding: "0 16px",
                  borderRadius: "999px",
                  fontSize: "13.5px",
                  fontWeight: 600,
                  backgroundColor: !isTerms ? "var(--ovs-ink)" : "var(--ovs-card)",
                  color: !isTerms ? "var(--ovs-paper)" : "var(--ovs-ink)",
                  border: "1px solid var(--ovs-line)",
                  cursor: "pointer",
                }}
              >
                <ShieldCheck className="size-3.5" />
                <span>Privacy Policy</span>
              </button>
            </div>
          </div>

          <Kicker
            n="LEGAL"
            text={isTerms ? "Engagement & usage terms" : "Data protection & cookies"}
          />
          <span id={uid + "-legal-h"}>
            <Split
              text={
                isTerms
                  ? "Terms & Conditions written in plain English."
                  : "Privacy Policy built on respect and zero tracking bloat."
              }
              className="ovs-h2 ovs-h2-wide"
            />
          </span>

          <div
            className="mt-6 flex flex-wrap items-center gap-4 text-sm"
            style={{ color: "var(--ovs-ink2)" }}
            data-rv
          >
            <span>Effective date: November 27, 2026</span>
            <span aria-hidden="true">·</span>
            <span>{brand} Studio · Lisbon, Portugal</span>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- legal body */}
      <section
        className="ovs-sec"
        style={{ paddingTop: "clamp(48px, 6vw, 84px)" }}
        aria-label={isTerms ? "Terms clauses" : "Privacy clauses"}
      >
        <div className="ovs-wrap">
          <div className="ovs-proc-grid" style={{ marginTop: 0 }}>
            {/* Sticky table of contents */}
            <div className="ovs-tree-col">
              <div
                style={{
                  position: "sticky",
                  top: "110px",
                }}
              >
                <ScrollParallax offset={12}>
                  <div
                    className="rounded-3xl border p-6 sm:p-8"
                    style={{
                      borderColor: "var(--ovs-line)",
                      backgroundColor: "var(--ovs-card)",
                    }}
                  >
                    <div
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "var(--ovs-accent)" }}
                    >
                      On this page
                    </div>
                    <nav aria-label="Document sections" className="mt-4 flex flex-col gap-2">
                      {clauses.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => scrollToClause(c.id)}
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "10px",
                            width: "100%",
                            padding: "8px 10px",
                            borderRadius: "10px",
                            textAlign: "left",
                            fontSize: "14px",
                            fontWeight: 500,
                            color: "var(--ovs-ink)",
                            cursor: "pointer",
                            transition: "background-color 180ms ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "color-mix(in oklab, var(--ovs-ink) 6%, transparent)"
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent"
                          }}
                        >
                          <span
                            className="tabular-nums text-xs font-semibold"
                            style={{ color: "var(--ovs-accent)" }}
                          >
                            {c.num}
                          </span>
                          <span>{c.title}</span>
                        </button>
                      ))}
                    </nav>

                    <div
                      className="mt-6 border-t pt-5"
                      style={{ borderColor: "var(--ovs-line)" }}
                    >
                      <div
                        className="text-xs leading-relaxed"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        Need a signed custom MSA or DPA for your procurement team?
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={copyEmail}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            height: "38px",
                            padding: "0 14px",
                            borderRadius: "999px",
                            border: "1px solid var(--ovs-line)",
                            backgroundColor: "var(--ovs-paper)",
                            color: "var(--ovs-ink)",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                        >
                          {copied ? (
                            <Check
                              className="size-3.5"
                              style={{ color: "var(--ovs-accent)" }}
                            />
                          ) : (
                            <Copy className="size-3.5" />
                          )}
                          <span>{copied ? "Copied email" : email}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollParallax>
              </div>
            </div>

            {/* Clauses */}
            <div className="flex flex-col">
              {clauses.map((c, idx) => (
                <ScrollReveal
                  key={c.id}
                  delay={idx * 0.05}
                  y={24}
                  className="border-t py-8 first:border-t-0 first:pt-0"
                >
                  <article
                    id={uid + "-" + c.id}
                    style={{ scrollMarginTop: "110px" }}
                  >
                    <div
                      className="ovs-step-k"
                      style={{ marginBottom: "10px" }}
                    >
                      <span>{c.num}</span>
                      <b>{c.summary}</b>
                    </div>
                    <h2
                      style={{
                        fontSize: "clamp(24px, 2.6vw, 36px)",
                        letterSpacing: "-0.035em",
                        fontWeight: 500,
                        lineHeight: 1.15,
                        color: "var(--ovs-ink)",
                      }}
                    >
                      {c.title}
                    </h2>
                    <div className="mt-4 flex flex-col gap-3.5">
                      {c.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          style={{
                            fontSize: "16px",
                            lineHeight: 1.65,
                            color: "var(--ovs-ink2)",
                            maxWidth: "56ch",
                          }}
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                    {c.bullets && c.bullets.length ? (
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {c.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-[15px] leading-relaxed"
                            style={{ color: "var(--ovs-ink)" }}
                          >
                            <span
                              style={{
                                marginTop: "8px",
                                width: "6px",
                                height: "6px",
                                borderRadius: "999px",
                                backgroundColor: "var(--ovs-accent)",
                                flexShrink: 0,
                              }}
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </ScrollReveal>
              ))}

              {/* Bottom CTA card */}
              <ScrollReveal y={24} className="mt-4">
                <div
                  className="flex flex-col items-start justify-between gap-5 rounded-3xl border p-7 sm:flex-row sm:items-center"
                  style={{
                    borderColor: "var(--ovs-line)",
                    backgroundColor: "var(--ovs-card)",
                  }}
                >
                  <div>
                    <div
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "var(--ovs-accent)" }}
                    >
                      <Mail className="size-3.5" />
                      Direct founder contact
                    </div>
                    <div
                      className="mt-1.5 text-lg font-semibold tracking-tight"
                      style={{ color: "var(--ovs-ink)" }}
                    >
                      Have a specific legal or security question?
                    </div>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--ovs-ink2)" }}
                    >
                      Write directly to {email} or schedule an intro call.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={book("legal-" + mode)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      height: "44px",
                      padding: "0 20px",
                      borderRadius: "999px",
                      backgroundColor: "var(--ovs-soft, #c4dc52)",
                      color: "#10150d",
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <span>Book an intro call</span>
                    <Arrow />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
