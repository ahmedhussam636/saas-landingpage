import * as React from "react"
import { motion } from "framer-motion"
import type { OvsLink } from "../types"
import { OVS_EASE, OVS_VIEWPORT } from "../motion"
import { Clock } from "../marks"

interface FooterSectionProps {
  uid: string
  brand: string
  email: string
  root: React.RefObject<HTMLDivElement | null>
  still: boolean
  ft: { columns: { title: string; links: OvsLink[] }[]; city: string; timeZone: string; note: string } | null
  mail: string
  setMail: React.Dispatch<React.SetStateAction<string>>
  mailState: "idle" | "sending" | "done" | "error" | "invalid"
  setMailState: React.Dispatch<React.SetStateAction<"idle" | "sending" | "done" | "error" | "invalid">>
  subscribe: (e: React.FormEvent) => void
  go: (href?: string) => (e?: React.MouseEvent) => void
}

export function FooterSection({
  uid,
  brand,
  email,
  root,
  still,
  ft,
  mail,
  setMail,
  mailState,
  setMailState,
  subscribe,
  go,
}: FooterSectionProps) {
  if (!ft) return null
  return (

        <footer className="ovs-foot">
          <div className="ovs-wrap">
            <div className="ovs-foot-top">
              <motion.form
                className="ovs-news"
                onSubmit={subscribe}
                noValidate
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={OVS_VIEWPORT}
                transition={{ duration: 0.7, ease: OVS_EASE }}
              >
                <label htmlFor={uid + "mail"}>Field notes, once a month. What we learn shipping for startups.</label>
                <div className="ovs-news-row">
                  <input
                    id={uid + "mail"}
                    type="email"
                    autoComplete="email"
                    placeholder="you@startup.com"
                    value={mail}
                    onChange={(e) => {
                      setMail(e.target.value)
                      if (mailState !== "sending") setMailState("idle")
                    }}
                    aria-invalid={mailState === "invalid" || mailState === "error"}
                    aria-describedby={uid + "mailmsg"}
                  />
                  <button type="submit" className="ovs-btn ovs-btn-lime" disabled={mailState === "sending"}>
                    {mailState === "sending" ? "Sending" : "Subscribe"}
                  </button>
                </div>
                <p id={uid + "mailmsg"} className="ovs-news-msg" aria-live="polite" data-state={mailState}>
                  {mailState === "invalid" ? "That email does not look right." : mailState === "error" ? "Something went wrong. Try again?" : mailState === "done" ? "You are in. First notes land next month." : ""}
                </p>
              </motion.form>
              <div className="ovs-foot-cols">
                {ft.columns.map((col, idx) => (
                  <motion.div
                    key={col.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={OVS_VIEWPORT}
                    transition={{ duration: 0.65, delay: 0.06 * (idx + 1), ease: OVS_EASE }}
                  >
                    <p>{col.title}</p>
                    <ul>
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a href={l.href || "#"} onClick={go(l.href)}>
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={OVS_VIEWPORT}
                  transition={{ duration: 0.65, delay: 0.06 * (ft.columns.length + 1), ease: OVS_EASE }}
                >
                  <p>{ft.city}</p>
                  <ul>
                    <li className="ovs-clock">
                      <i />
                      <Clock timeZone={ft.timeZone} />
                    </li>
                    <li>
                      <a href={"mailto:" + email}>{email}</a>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
          <div className="ovs-wrap">
            <div className="ovs-wordmark-box">
              <div
                className="ovs-wordmark"
                data-wordmark
                aria-hidden="true"
                style={{ "--ovs-brand-len": Math.max(Array.from(brand).length, 4) } as React.CSSProperties}
              >
                {Array.from(brand).map((ch, i) => (
                  <span key={i}>{ch === " " ? "\u00A0" : ch}</span>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            className="ovs-wrap ovs-foot-bottom"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={OVS_VIEWPORT}
            transition={{ duration: 0.6, ease: OVS_EASE }}
          >
            <span>
              © {new Date().getFullYear()} {brand} Studio
            </span>
            <span>{ft.note}</span>
            <button type="button" className="ovs-top" onClick={() => root.current?.scrollIntoView({ behavior: still ? "auto" : "smooth" })}>
              Back to the canopy
              <svg className="ovs-svg ovs-arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M8 13V3M4 7l4-4 4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </motion.div>
        </footer>
      
  )
}
