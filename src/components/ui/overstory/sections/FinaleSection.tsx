import * as React from "react"
import type { OvsPalette, OvsSeason } from "../types"
import { DEFAULT_CTA } from "../defaults"
import { Canopy, PhotoCanopy } from "../canopy"
import { Arrow, Magnet } from "../marks"

interface FinaleSectionProps {
  uid: string
  cta: { title?: string; text?: string; button?: string } | null
  usePhoto: boolean
  photo: string | null
  season: OvsSeason
  scheme: "light" | "dark"
  seed: number
  pal: OvsPalette
  email: string
  copied: boolean
  copyEmail: () => void
  book: (from: string) => (e: React.MouseEvent) => void
  onBook?: (from: string) => void
}

export function FinaleSection({
  uid,
  cta,
  usePhoto,
  photo,
  season,
  scheme,
  seed,
  pal,
  email,
  copied,
  copyEmail,
  book,
  onBook,
}: FinaleSectionProps) {
  if (!cta) return null
  return (

          <section className="ovs-fin" data-fin data-sec="contact" aria-labelledby={uid + "cta"}>
            <div className="ovs-fin-stage">
              <div className="ovs-window">
                {usePhoto ? <PhotoCanopy src={photo as string} season={season} scheme={scheme} turn /> : <Canopy seed={seed + 31} scheme={scheme} palette={pal} lazy />}
                <div className="ovs-fin-copy">
                  <h2 id={uid + "cta"} className="ovs-fin-h">
                    {cta.title || DEFAULT_CTA.title}
                  </h2>
                  <p>{cta.text || DEFAULT_CTA.text}</p>
                  <div className="ovs-fin-actions">
                    <Magnet className="ovs-btn ovs-btn-dark ovs-btn-xl" href={"mailto:" + email} onClick={onBook ? book("finale") : undefined}>
                      <span>{cta.button || DEFAULT_CTA.button}</span>
                      <Arrow />
                    </Magnet>
                    <button type="button" className="ovs-btn ovs-btn-glass ovs-btn-xl" onClick={copyEmail}>
                      <span aria-live="polite">{copied ? "Copied" : email}</span>
                      <svg className="ovs-svg ovs-arrow" viewBox="0 0 16 16" aria-hidden="true">
                        {copied ? <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /> : <path d="M5.5 5.5V3.5h7v7h-2M3.5 5.5h7v7h-7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />}
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
  )
}
