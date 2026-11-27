import { motion } from "framer-motion"
import type { OvsStep } from "../types"
import { GrowingTree } from "../illustrations"
import { OVS_EASE, OVS_VIEWPORT, ScrollParallax } from "../motion"
import { Kicker, Split } from "../marks"

interface ProcessSectionProps {
  uid: string
  pr: { kicker: string; title: string; steps: OvsStep[] } | null
  seed: number
}

export function ProcessSection({ uid, pr, seed }: ProcessSectionProps) {
  if (!pr) return null
  return (

          <section className="ovs-sec ovs-process" data-process data-sec="process" aria-labelledby={uid + "pr"}>
            <div className="ovs-wrap">
              <Kicker n="04" text={pr.kicker} />
              <span id={uid + "pr"}>
                <Split text={pr.title} className="ovs-h2 ovs-h2-wide" />
              </span>
              <div className="ovs-proc-grid">
                <div className="ovs-tree-col">
                  <div className="ovs-tree-stick">
                    <ScrollParallax offset={20}>
                      <GrowingTree seed={seed} />
                    </ScrollParallax>
                  </div>
                </div>
                <ol className="ovs-steps">
                  {pr.steps.map((s, i) => (
                    <li key={s.name} className="ovs-step">
                      <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={OVS_VIEWPORT}
                        transition={{ duration: 0.7, delay: i * 0.05, ease: OVS_EASE }}
                        style={{ display: "flex", flexDirection: "column", gap: "14px" }}
                      >
                        <p className="ovs-step-k">
                          <span>0{i + 1}</span>
                          <b>{s.name}</b>
                          <em>{s.when}</em>
                        </p>
                        <h3>{s.title}</h3>
                        <p>{s.text}</p>
                      </motion.div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        
  )
}
