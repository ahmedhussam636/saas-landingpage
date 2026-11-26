import * as React from "react"
import type { OvsPalette, OvsQuote, OvsSeason } from "../types"
import { Canopy, PhotoCanopy } from "../canopy"
import { Arrow, Mark } from "../marks"

interface QuotesSectionProps {
  uid: string
  qs: OvsQuote[]
  curQuote: OvsQuote
  quote: number
  setQuote: React.Dispatch<React.SetStateAction<number>>
  quotePaused: boolean
  setQuotePaused: React.Dispatch<React.SetStateAction<boolean>>
  still: boolean
  usePhoto: boolean
  photo: string | null
  season: OvsSeason
  seed: number
  pal: OvsPalette
  setPhotoFail: React.Dispatch<React.SetStateAction<boolean>>
}

export function QuotesSection({
  uid,
  qs,
  curQuote,
  quote,
  setQuote,
  quotePaused,
  setQuotePaused,
  still,
  usePhoto,
  photo,
  season,
  seed,
  pal,
  setPhotoFail,
}: QuotesSectionProps) {
  if (!qs.length || !curQuote) return null
  return (
    <section className="ovs-shade" data-sec="quotes" aria-label="What founders say" onPointerEnter={() => setQuotePaused(true)} onPointerLeave={() => setQuotePaused(false)} onFocus={() => setQuotePaused(true)} onBlur={() => setQuotePaused(false)}>
            {usePhoto ? <div className="ovs-shade-photo" aria-hidden="true" style={{ backgroundImage: "url(" + photo + ")" }} /> : null}
            <div className="ovs-dapple" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="ovs-wrap ovs-quote-wrap">
              <p className="ovs-kicker ovs-kicker-light" data-rv>
                <span className="ovs-kicker-n">( ✦ )</span>
                <span>In the shade, with founders</span>
              </p>
              <figure className="ovs-quote" data-quote aria-live="polite">
                <blockquote>
                  <p>
                    {curQuote.quote.split(" ").map((w, i) => (
                      <React.Fragment key={quote + "-" + i}>
                        <span className="ovs-w">
                          <span data-qw>{w}</span>
                        </span>{" "}
                      </React.Fragment>
                    ))}
                  </p>
                </blockquote>
                <figcaption>
                  <span className="ovs-avatar">{curQuote.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
                  <span>
                    <b>{curQuote.name}</b>
                    <span>{curQuote.role}</span>
                  </span>
                  <span className="ovs-quote-mark">
                    <Mark kind={curQuote.mark} uid={uid + "q"} />
                  </span>
                </figcaption>
              </figure>
              {qs.length > 1 ? (
                <div className="ovs-quote-nav">
                  <button type="button" className="ovs-round" aria-label="Previous quote" onClick={() => setQuote((v) => (v - 1 + qs.length) % qs.length)}>
                    <svg className="ovs-svg" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M13 8H3m4-4L3 8l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="ovs-dots">
                    {qs.map((qq, i) => (
                      <button key={qq.name} type="button" aria-label={"Quote " + (i + 1) + " of " + qs.length} aria-current={i === quote ? "true" : undefined} onClick={() => setQuote(i)}>
                        {i === quote ? <i key={quote} data-paused={quotePaused ? "" : undefined} onAnimationEnd={() => setQuote((v) => (v + 1) % qs.length)} /> : null}
                      </button>
                    ))}
                  </div>
                  <button type="button" className="ovs-round" aria-label="Next quote" onClick={() => setQuote((v) => (v + 1) % qs.length)}>
                    <Arrow />
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        
  )
}
