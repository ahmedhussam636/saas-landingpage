import * as React from "react"
import type { OvsFaq } from "../types"
import { Kicker, Split } from "../marks"

interface FaqSectionProps {
  uid: string
  fq: { kicker: string; title: string; text: string; items: OvsFaq[] } | null
  faqOpen: number
  setFaqOpen: React.Dispatch<React.SetStateAction<number>>
  copied: boolean
  email: string
  copyEmail: () => void
}

export function FaqSection({
  uid,
  fq,
  faqOpen,
  setFaqOpen,
  copied,
  email,
  copyEmail,
}: FaqSectionProps) {
  if (!fq) return null
  return (

          <section className="ovs-sec ovs-faq" data-sec="faq" aria-labelledby={uid + "fq"}>
            <div className="ovs-wrap ovs-faq-grid">
              <div>
                <Kicker n="06" text={fq.kicker} />
                <span id={uid + "fq"}>
                  <Split text={fq.title} className="ovs-h2" />
                </span>
                <div className="ovs-faq-card" data-rv>
                  <p>{fq.text}</p>
                  <button type="button" className="ovs-btn ovs-btn-line" onClick={copyEmail}>
                    <span aria-live="polite">{copied ? "Copied to clipboard" : email}</span>
                  </button>
                </div>
              </div>
              <div className="ovs-acc">
                {fq.items.map((f, i) => {
                  const open = faqOpen === i
                  return (
                    <div key={f.q} className="ovs-acc-item" data-open={open ? "" : undefined} data-rv>
                      <h3>
                        <button type="button" aria-expanded={open} aria-controls={uid + "fa" + i} onClick={() => setFaqOpen(open ? -1 : i)}>
                          {f.q}
                          <span className="ovs-plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div id={uid + "fa" + i} className="ovs-fold" role="region" aria-label={f.q}>
                        <div>
                          <p>{f.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        
  )
}
