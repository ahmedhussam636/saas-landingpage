import * as React from "react"
import type { OvsLogo, OvsPalette, OvsSeason } from "../types"
import { Canopy, PhotoCanopy } from "../canopy"
import { Logo, WordMorph } from "../marks"

interface HeroSectionProps {
  uid: string
  status: string | null
  H: { lead: string; words: string[]; tail: string; trusted: string; cue: string }
  words: string[]
  logos: OvsLogo[]
  still: boolean
  usePhoto: boolean
  photo: string | null
  season: OvsSeason
  scheme: "light" | "dark"
  seed: number
  pal: OvsPalette
  heroReady: React.MutableRefObject<boolean>
  heroIn: React.MutableRefObject<null | (() => void)>
  gust: React.MutableRefObject<null | ((x: number) => void)>
  setPhotoFail: React.Dispatch<React.SetStateAction<boolean>>
  go: (href?: string) => (e?: React.MouseEvent) => void
}

export function HeroSection({
  uid,
  status,
  H,
  words,
  logos,
  still,
  usePhoto,
  photo,
  season,
  scheme,
  seed,
  pal,
  heroReady,
  heroIn,
  gust,
  setPhotoFail,
  go,
}: HeroSectionProps) {
  const onHeroReady = React.useCallback(() => {
    heroReady.current = true
    heroIn.current?.()
  }, [heroReady, heroIn])

  return (
    <section className="ovs-hero" data-hero data-sec="top" aria-label="Introduction">
          <div
            className="ovs-stage"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a,button")) return
              const b = e.currentTarget.getBoundingClientRect()
              gust.current?.((e.clientX - b.left) / b.width)
            }}
          >
            {usePhoto ? (
              <PhotoCanopy src={photo as string} season={season} scheme={scheme} onReady={onHeroReady} onFail={() => setPhotoFail(true)} />
            ) : (
              <Canopy seed={seed} scheme={scheme} palette={pal} onReady={onHeroReady} />
            )}
            <div className="ovs-falls" aria-hidden="true">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className="ovs-fall" data-fall={i < 5 ? "idle" : "burst"}>
                  <svg className="ovs-svg" viewBox="0 0 24 24" style={{ color: i % 3 ? "var(--ovs-accent)" : "var(--ovs-soft)" }}>
                    <path fill="currentColor" d="M2 12C6 5 14 3.5 22 12c-8 8.5-16 7-20 0z" />
                    <path d="M3 12h17" stroke="rgba(0,0,0,.25)" strokeWidth="0.8" />
                  </svg>
                </span>
              ))}
            </div>
            <div className="ovs-copy">
              {status ? (
                <p className="ovs-status">
                  <i />
                  {status}
                </p>
              ) : null}
              <h1 className="ovs-h1">
                <span className="ovs-line">
                  <span>{H.lead}</span>
                </span>
                <span className="ovs-line">
                  <span>
                    <span className="ovs-sr">{words[0]} </span>
                    <span aria-hidden="true">
                      <WordMorph words={words} still={still} />
                    </span>{" "}
                    {H.tail}
                  </span>
                </span>
              </h1>
              {logos && logos.length ? (
                <>
                  <p className="ovs-trusted">{H.trusted}</p>
                  <div className="ovs-logos" role="list" aria-label={H.trusted}>
                    {[logos.slice(0, 2), logos.slice(2)].map((row, r) =>
                      row.length ? (
                        <div key={r} className="ovs-logo-row">
                          {row.map((l, i) => (
                            <span role="listitem" key={l.name + i}>
                              <Logo logo={l} uid={uid + "h" + r + i} />
                            </span>
                          ))}
                        </div>
                      ) : null,
                    )}
                  </div>
                </>
              ) : null}
            </div>
            <a className="ovs-cue" href="#about" onClick={go("#about")}>
              <span className="ovs-cue-line" />
              {H.cue}
            </a>
            <div className="ovs-veil" aria-hidden="true">
              <p className="ovs-above">Above the canopy</p>
            </div>
          </div>
        </section>
  )
}
