import * as React from "react"
import { ArrowLeft, Check, Copy } from "lucide-react"
import { Kicker, Split } from "../marks"

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
      summary: "Every engagement starts with a written scope, price and start date",
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
      summary: "Once paid, everything we make for your product belongs to you",
      paragraphs: [
        `From day one, all custom Figma libraries, brand assets, source code, repositories, and technical documentation produced specifically for Client under a paid engagement belong exclusively to Client upon receipt of applicable payment.`,
        `${brand} retains ownership only of pre-existing general utilities, internal scaffolding, open-source packages, and non-confidential studio know-how. Unless you ask us in writing not to, ${brand} may showcase non-confidential launched visuals in our selected work portfolio.`,
      ],
    },
    {
      id: "billing-pause",
      num: "03",
      title: "Billing, pauses & cancellation",
      summary: "Monthly plans can be paused or cancelled before renewal without a fee",
      paragraphs: [
        "Invoices are due according to the schedule in your engagement summary. For Partner plans, billing recurs monthly in advance unless paused or cancelled prior to the next billing cycle.",
        "If you pause a Product Partner subscription mid-cycle, unused billing days remain banked and roll over for up to sixty (60) days so you can resume without losing paid sprint time.",
      ],
      bullets: [
        "Pause or cancel any monthly Partner subscription before renewal without a penalty fee.",
        "Fixed Launch Sprints are billed 50% at kickoff and 50% upon final Figma/code handover.",
      ],
    },
    {
      id: "confidentiality",
      num: "04",
      title: "Confidentiality & mutual NDA",
      summary: "Your roadmap, code and research stay private, on both sides",
      paragraphs: [
        `Both ${brand} and Client agree to protect non-public business plans, product roadmaps, source code, credentials, and user research shared during discovery or active sprints.`,
        "Access to your repositories, analytics, and design workspaces is limited strictly to the senior builders assigned to your pod.",
      ],
    },
    {
      id: "liability",
      num: "05",
      title: "Warranties, fair use & liability",
      summary: "Our liability is capped at the fees you paid in the last three months",
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
      summary: "Only what you send us when you get in touch",
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
      summary: "Your theme and crowd-walk choice stay in your browser. No ad trackers",
      paragraphs: [
        `${brand} uses browser localStorage solely to remember lightweight interface preferences—such as whether you joined the interactive community crowd walk and your preferred light/dark theme.`,
        "You can clear localStorage or reset the interactive crowd state at any time directly inside your browser settings or via the on-page Reset control.",
      ],
    },
    {
      id: "usage",
      num: "03",
      title: "How we use your information",
      summary: "To reply, scope and deliver your project, and to send invoices",
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
      summary: "Your work lives in your own accounts. Our tools encrypt the rest",
      paragraphs: [
        "During active client work, deliverables live primarily inside your own chosen workspace (such as your GitHub, Figma, Vercel, or cloud database accounts). For studio communication and billing, we rely on vetted enterprise providers with strong encryption in transit and at rest.",
      ],
    },
    {
      id: "rights",
      num: "05",
      title: "Your privacy rights & contact",
      summary: "Email us to see, correct or delete your data at any time",
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
  const [active, setActive] = React.useState(clauses[0]?.id ?? "")

  // Mark the clause currently in the reading zone as the active entry in the contents list.
  React.useEffect(() => {
    setActive(clauses[0]?.id ?? "")
    if (typeof IntersectionObserver === "undefined") return
    const els = clauses
      .map((c) => document.getElementById(uid + "-" + c.id))
      .filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id.slice(uid.length + 1))
      },
      { rootMargin: "-120px 0px -55% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [clauses, uid])

  const jumpTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(uid + "-" + id)
    if (!el) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
    setActive(id)
  }

  return (
    <>
      {/* ---------------------------------------------------------- header */}
      <section
        className="ovs-sec ovs-manifesto"
        style={{
          paddingTop: "clamp(120px, 14vw, 168px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
        data-sec={mode}
        aria-labelledby={uid + "-legal-h"}
      >
        <div className="ovs-wrap">
          <div className="ovs-page-top">
            <a href="/" onClick={go("/")} className="ovs-back">
              <ArrowLeft aria-hidden="true" strokeWidth={1.5} />
              <span>Home</span>
            </a>

            <nav className="ovs-legal-switch" aria-label="Legal documents">
              <a
                href="/terms"
                onClick={go("/terms")}
                aria-current={isTerms ? "page" : undefined}
              >
                Terms
              </a>
              <a
                href="/privacy"
                onClick={go("/privacy")}
                aria-current={!isTerms ? "page" : undefined}
              >
                Privacy
              </a>
            </nav>
          </div>

          <Kicker
            n="Legal"
            text={isTerms ? "Engagements and site use" : "Data and browser storage"}
          />
          <span id={uid + "-legal-h"}>
            <Split
              text={
                isTerms
                  ? "Terms and conditions in plain English"
                  : "What we collect, why, and how to remove it"
              }
              className="ovs-h2 ovs-h2-wide"
            />
          </span>

          <p className="ovs-legal-meta" data-rv>
            In effect from November 27, 2026. {brand} Studio, Egypt.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------- body */}
      <section
        className="ovs-sec"
        style={{ paddingTop: "clamp(40px, 5vw, 80px)" }}
        aria-label={isTerms ? "Terms sections" : "Privacy sections"}
      >
        <div className="ovs-wrap">
          <div className="ovs-legal-grid">
            <nav className="ovs-legal-toc" aria-label="On this page">
              <p className="ovs-legal-toc-h">On this page</p>
              <ol>
                {clauses.map((c) => (
                  <li key={c.id}>
                    <a
                      href={"#" + uid + "-" + c.id}
                      onClick={jumpTo(c.id)}
                      aria-current={active === c.id ? "true" : undefined}
                    >
                      <span>{c.num}</span>
                      {c.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div>
              {clauses.map((c) => (
                <article
                  key={c.id}
                  id={uid + "-" + c.id}
                  className="ovs-clause"
                  aria-labelledby={uid + "-" + c.id + "-h"}
                >
                  <h2 id={uid + "-" + c.id + "-h"}>
                    <span>{c.num}</span>
                    {c.title}
                  </h2>
                  <div className="ovs-short">
                    <small>In short</small>
                    <p>{c.summary}</p>
                  </div>
                  <div className="ovs-clause-body">
                    {c.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {c.bullets && c.bullets.length ? (
                    <ul>
                      {c.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}

              <div className="ovs-legal-contact">
                <h2>{isTerms ? "Questions about these terms" : "Questions about your data"}</h2>
                <p>
                  Write to {email} and a founder will answer. We can also sign
                  a custom MSA or DPA for your procurement team.
                </p>
                <div className="ovs-legal-contact-a">
                  <button
                    type="button"
                    className="ovs-btn ovs-btn-dark"
                    onClick={book("legal-" + mode)}
                  >
                    Book an intro call
                  </button>
                  <button
                    type="button"
                    className="ovs-btn ovs-btn-line"
                    onClick={copyEmail}
                    aria-live="polite"
                  >
                    {copied ? (
                      <Check aria-hidden="true" strokeWidth={1.5} />
                    ) : (
                      <Copy aria-hidden="true" strokeWidth={1.5} />
                    )}
                    <span>{copied ? "Email copied" : "Copy email"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
