import * as React from "react"
import { motion } from "framer-motion"
import type { OvsLogo, OvsStat } from "../types"
import { DEFAULT_MANIFESTO } from "../defaults"
import { formatNumber, manifestoParts } from "../canopy"
import { OVS_EASE, ScrollParallax } from "../motion"
import { BrandMark, Kicker, Logo } from "../marks"

interface ManifestoSectionProps {
  uid: string
  logos: OvsLogo[]
  manifesto: { kicker?: string; text?: string } | null
  stats: OvsStat[] | null
}

export function ManifestoSection({ uid, logos, manifesto, stats }: ManifestoSectionProps) {
  return (
    <>
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
                <ScrollParallax offset={18}>
                  <dl className="ovs-stats">
                    {stats.map((s) => (
                      <div key={s.label} className="ovs-stat" data-rv>
                        <span className="ovs-stat-rule" />
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.35, ease: OVS_EASE }}
                        >
                          <dd data-count={s.value} data-dec={s.decimals || 0} data-pre={s.prefix || ""} data-suf={s.suffix || ""}>
                            {(s.prefix || "") + formatNumber(s.value, s.decimals || 0) + (s.suffix || "")}
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
        ) : null}
    </>
  )
}
