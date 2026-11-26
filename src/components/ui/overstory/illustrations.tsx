import * as React from "react"
import type { OvsMock, OvsServiceArt } from "./types"
import { mulberry32 } from "./canopy"

export function ServiceArt({ art }: { art?: OvsServiceArt }) {
  switch (art) {
    case "brand":
      return (
        <svg className="ovs-svg" viewBox="0 0 240 160" aria-hidden="true">
          <rect width="240" height="160" rx="14" fill="var(--ovs-card)" />
          <rect x="18" y="18" width="96" height="124" rx="10" fill="var(--ovs-accent)" />
          <g transform="translate(66 80) scale(2.2) translate(-16 -16)" fill="var(--ovs-soft)">
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} transform={"rotate(" + i * 45 + " 16 16)"} d="M16 1.6c2.6 1.9 3.6 4.4 2.6 7.2-.6 1.6-1.6 2.4-2.6 2.8-1-.4-2-1.2-2.6-2.8-1-2.8 0-5.3 2.6-7.2z" opacity={i % 2 ? 0.6 : 1} />
            ))}
          </g>
          {["var(--ovs-soft)", "var(--ovs-ink)", "var(--ovs-mist)", "var(--ovs-accent)"].map((c, i) => (
            <rect key={i} x={128 + (i % 2) * 50} y={18 + Math.floor(i / 2) * 50} width="42" height="42" rx="8" fill={c} stroke="var(--ovs-line)" />
          ))}
          <text x="128" y="138" fontSize="26" fontFamily="Georgia, serif" fill="var(--ovs-ink)">Aa</text>
          <text x="170" y="138" fontSize="26" fontWeight="700" fill="var(--ovs-ink)">Aa</text>
        </svg>
      )
    case "product":
      return (
        <svg className="ovs-svg" viewBox="0 0 240 160" aria-hidden="true">
          <rect width="240" height="160" rx="14" fill="var(--ovs-card)" />
          <rect x="16" y="16" width="62" height="128" rx="8" fill="var(--ovs-mist)" />
          {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="26" y={30 + i * 20} width={i === 1 ? 42 : 34} height="8" rx="4" fill={i === 1 ? "var(--ovs-accent)" : "var(--ovs-line)"} />)}
          <rect x="90" y="16" width="134" height="40" rx="8" fill="var(--ovs-mist)" />
          <rect x="100" y="28" width="60" height="8" rx="4" fill="var(--ovs-ink)" />
          <rect x="100" y="40" width="90" height="6" rx="3" fill="var(--ovs-line)" />
          <rect x="90" y="66" width="64" height="78" rx="8" fill="var(--ovs-soft)" />
          <rect x="160" y="66" width="64" height="78" rx="8" fill="var(--ovs-mist)" />
          <path d="M98 128c10-18 20-6 30-22s18-6 20-14" fill="none" stroke="var(--ovs-accent)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="192" cy="104" r="20" fill="none" stroke="var(--ovs-accent)" strokeWidth="6" strokeDasharray="80 200" strokeLinecap="round" />
        </svg>
      )
    case "site":
      return (
        <svg className="ovs-svg" viewBox="0 0 240 160" aria-hidden="true">
          <rect width="240" height="160" rx="14" fill="var(--ovs-card)" />
          <rect x="12" y="12" width="216" height="136" rx="10" fill="var(--ovs-mist)" />
          {[0, 1, 2].map((i) => <circle key={i} cx={24 + i * 10} cy="23" r="3" fill="var(--ovs-line)" />)}
          <rect x="12" y="32" width="216" height="1" fill="var(--ovs-line)" />
          <rect x="62" y="54" width="116" height="12" rx="6" fill="var(--ovs-ink)" />
          <rect x="82" y="72" width="76" height="12" rx="6" fill="var(--ovs-accent)" />
          <rect x="94" y="94" width="52" height="16" rx="8" fill="var(--ovs-ink)" />
          {[0, 1, 2, 3].map((i) => <rect key={i} x={36 + i * 46} y="122" width="32" height="8" rx="4" fill="var(--ovs-line)" />)}
        </svg>
      )
    case "code":
      return (
        <svg className="ovs-svg" viewBox="0 0 240 160" aria-hidden="true">
          <rect width="240" height="160" rx="14" fill="#0f1a12" />
          {[
            [18, 40, "#c4dc52"], [64, 60, "#8fb7d9"], [18, 30, "#e6b765"], [52, 90, "#c4dc52"], [52, 50, "#d9e3cf"], [18, 70, "#8fb7d9"], [36, 44, "#e6b765"], [18, 20, "#d9e3cf"],
          ].map((r, i) => (
            <rect key={i} x={(r[0] as number) + 14} y={22 + i * 15} width={r[1] as number} height="7" rx="3.5" fill={r[2] as string} opacity="0.85" />
          ))}
          <rect x="160" y="110" width="64" height="30" rx="8" fill="#1c2c1f" />
          <circle cx="174" cy="125" r="4" fill="#9be15d" />
          <rect x="184" y="121" width="30" height="8" rx="4" fill="#d9e3cf" opacity="0.6" />
        </svg>
      )
    default:
      return (
        <svg className="ovs-svg" viewBox="0 0 240 160" aria-hidden="true">
          <rect width="240" height="160" rx="14" fill="var(--ovs-card)" />
          <rect x="16" y="16" width="60" height="22" rx="11" fill="var(--ovs-ink)" />
          <rect x="84" y="16" width="60" height="22" rx="11" fill="none" stroke="var(--ovs-ink)" strokeWidth="1.5" />
          <rect x="152" y="16" width="72" height="22" rx="11" fill="var(--ovs-accent)" />
          <rect x="16" y="48" width="44" height="24" rx="12" fill="var(--ovs-mist)" />
          <circle cx="48" cy="60" r="9" fill="var(--ovs-accent)" />
          <rect x="70" y="52" width="16" height="16" rx="4" fill="var(--ovs-accent)" />
          <path d="M73 60l3 3 6-6" stroke="#fff" strokeWidth="2" fill="none" />
          <rect x="96" y="54" width="128" height="12" rx="6" fill="var(--ovs-mist)" />
          <rect x="96" y="54" width="70" height="12" rx="6" fill="var(--ovs-soft)" />
          <rect x="16" y="84" width="100" height="60" rx="10" fill="var(--ovs-mist)" />
          <rect x="124" y="84" width="100" height="60" rx="10" fill="var(--ovs-mist)" />
          <rect x="28" y="98" width="50" height="8" rx="4" fill="var(--ovs-ink)" />
          <rect x="28" y="112" width="76" height="6" rx="3" fill="var(--ovs-line)" />
          <rect x="136" y="98" width="40" height="8" rx="4" fill="var(--ovs-ink)" />
          <rect x="136" y="112" width="70" height="6" rx="3" fill="var(--ovs-line)" />
        </svg>
      )
  }
}

/* -------------------------------------------------------------- case mocks */

export function CaseMock({ mock, name }: { mock?: OvsMock; name: string }) {
  if (mock === "mobile")
    return (
      <div className="ovs-mock ovs-mock-phone" data-mock>
        <div className="ovs-phone-notch" />
        <p className="ovs-mk-sm">Shared balance</p>
        <p className="ovs-mk-big">$8,240.12</p>
        <div className="ovs-phone-split">
          <span style={{ width: "58%" }} />
          <span style={{ width: "42%" }} />
        </div>
        {["Groceries", "Rent", "Trip fund"].map((t, i) => (
          <div className="ovs-mk-row" key={t}>
            <i style={{ background: ["var(--ovs-accent)", "#7d9cc4", "#c9a865"][i] }} />
            <span>{t}</span>
            <b>{["$184", "$1,450", "$620"][i]}</b>
          </div>
        ))}
      </div>
    )
  return (
    <div className="ovs-mock" data-mock>
      <div className="ovs-mk-bar">
        <i />
        <i />
        <i />
        <span>{name.toLowerCase()}.app</span>
      </div>
      <div className="ovs-mk-body">
        <div className="ovs-mk-side">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} data-on={i === 1 ? "" : undefined} />
          ))}
        </div>
        {mock === "chat" ? (
          <div className="ovs-mk-main">
            <div className="ovs-bubble">Pricing pushback, 3 min in. Try anchoring on the team plan.</div>
            <div className="ovs-bubble ovs-bubble-me">Nice. Mention the onboarding call?</div>
            <div className="ovs-bubble">Yes. Close rate goes up 18% when you do.</div>
            <div className="ovs-mk-wave">
              {Array.from({ length: 28 }, (_, i) => (
                <i key={i} style={{ height: 6 + Math.abs(Math.sin(i * 1.7)) * 22 + "px" }} />
              ))}
            </div>
          </div>
        ) : mock === "doc" ? (
          <div className="ovs-mk-main">
            <p className="ovs-mk-sm">Visit summary, auto-drafted</p>
            <p className="ovs-mk-h">Follow-up, knee pain</p>
            {[92, 78, 86, 60].map((w, i) => (
              <span className="ovs-mk-line" key={i} style={{ width: w + "%" }} />
            ))}
            <div className="ovs-mk-chips">
              <span>ICD-10 M25.561</span>
              <span>Plan reviewed</span>
            </div>
            {[70, 84].map((w, i) => (
              <span className="ovs-mk-line" key={i} style={{ width: w + "%" }} />
            ))}
          </div>
        ) : (
          <div className="ovs-mk-main">
            <div className="ovs-mk-kpis">
              {[["Active crews", "2,048"], ["On site", "1,612"], ["Alerts", "3"]].map((k) => (
                <div key={k[0]}>
                  <span>{k[0]}</span>
                  <b>{k[1]}</b>
                </div>
              ))}
            </div>
            <svg className="ovs-svg ovs-mk-chart" viewBox="0 0 300 110" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0 90 C 30 84, 50 70, 80 74 S 130 50, 160 54 S 210 30, 240 28 S 280 14, 300 10 V110 H0z" fill="var(--ovs-soft)" opacity="0.5" />
              <path d="M0 90 C 30 84, 50 70, 80 74 S 130 50, 160 54 S 210 30, 240 28 S 280 14, 300 10" fill="none" stroke="var(--ovs-accent)" strokeWidth="2.5" />
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- the tree */

export function GrowingTree({ seed }: { seed: number }) {
  const crown = React.useMemo(() => {
    const r = mulberry32(seed + 404)
    return Array.from({ length: 46 }, () => {
      const a = r() * Math.PI * 2
      const d = Math.sqrt(r())
      return { x: 182 + Math.cos(a) * d * 128, y: 132 + Math.sin(a) * d * 86, r: 10 + r() * 16, l: r() }
    })
  }, [seed])
  const tips = [
    [[96, 332], [262, 306]],
    [[70, 214], [292, 186], [122, 270]],
  ]
  return (
    <svg className="ovs-svg ovs-tree" viewBox="0 0 360 540" aria-hidden="true">
      <circle data-sun cx="300" cy="70" r="26" fill="var(--ovs-soft)" opacity="0.8" />
      <ellipse cx="180" cy="508" rx="130" ry="12" fill="var(--ovs-line)" />
      <g fill="none" stroke="var(--ovs-bark)" strokeLinecap="round">
        <path data-grow="0" pathLength={1} strokeWidth="9" d="M180 506 C 176 440, 188 380, 180 320 S 172 200, 182 120" />
        <path data-grow="1" pathLength={1} strokeWidth="4.5" d="M181 386 C 152 366, 122 354, 96 332" />
        <path data-grow="1" pathLength={1} strokeWidth="4.5" d="M180 356 C 210 340, 238 326, 262 306" />
        <path data-grow="2" pathLength={1} strokeWidth="3.5" d="M178 262 C 140 244, 104 238, 70 214" />
        <path data-grow="2" pathLength={1} strokeWidth="3.5" d="M182 232 C 220 216, 262 208, 292 186" />
        <path data-grow="2" pathLength={1} strokeWidth="3" d="M180 300 C 160 292, 140 286, 122 270" />
      </g>
      <g data-leaves="0">
        <path d="M180 470c-18-2-30-12-32-26 16 0 28 8 32 26z" fill="var(--ovs-accent)" />
        <path d="M181 462c16-6 30-4 38 8-14 6-28 4-38-8z" fill="var(--ovs-soft)" />
      </g>
      {tips.map((set, s) => (
        <g data-leaves={s + 1} key={s}>
          {set.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="17" fill="var(--ovs-accent)" />
              <circle cx={x + 9} cy={y - 8} r="12" fill="var(--ovs-soft)" />
              <circle cx={x - 10} cy={y - 5} r="9" fill="var(--ovs-leaf2)" />
            </g>
          ))}
        </g>
      ))}
      <g data-leaves="3">
        {crown.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill={c.l > 0.66 ? "var(--ovs-soft)" : c.l > 0.33 ? "var(--ovs-leaf2)" : "var(--ovs-accent)"} opacity={0.82 + c.l * 0.18} />
        ))}
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------- the page */

