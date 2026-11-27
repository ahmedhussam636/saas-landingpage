import * as React from "react"
import { motion } from "framer-motion"
import type { OvsCase } from "../types"
import { CaseMock } from "../illustrations"
import { OVS_EASE, OVS_VIEWPORT } from "../motion"
import { Arrow, BrandMark, Kicker, Mark, Split } from "../marks"

interface WorkSectionProps {
  uid: string
  wk: { kicker: string; title: string; next: string; items: OvsCase[] } | null
  caseIdx: number
  go: (href?: string) => (e?: React.MouseEvent) => void
  book: (from: string) => (e: React.MouseEvent) => void
}

export function WorkSection({ uid, wk, caseIdx, go, book }: WorkSectionProps) {
  if (!wk) return null
  return (

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
                      <motion.div
                        className="ovs-card-meta"
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={OVS_VIEWPORT}
                        transition={{ duration: 0.65, delay: 0.08, ease: OVS_EASE }}
                      >
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
                      </motion.div>
                    </a>
                  </article>
                ))}
                <article className="ovs-card ovs-card-next" data-card>
                  <motion.a
                    href="#contact"
                    onClick={book("work")}
                    className="ovs-card-link"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={OVS_VIEWPORT}
                    transition={{ duration: 0.7, ease: OVS_EASE }}
                  >
                    <BrandMark />
                    <span className="ovs-card-next-t">{wk.next}</span>
                    <span className="ovs-btn ovs-btn-dark">
                      Start a project <Arrow />
                    </span>
                  </motion.a>
                </article>
              </div>
            </div>
          </section>
        
  )
}
