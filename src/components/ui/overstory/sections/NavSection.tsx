import * as React from "react"
import type { OvsLink } from "../types"
import { Arrow, BrandMark, Magnet } from "../marks"

interface NavSectionProps {
  uid: string
  root: React.RefObject<HTMLDivElement | null>
  still: boolean
  brand: string
  links: OvsLink[]
  active: string
  themeToggle: boolean
  scheme: "light" | "dark"
  setOverride: React.Dispatch<React.SetStateAction<null | "light" | "dark">>
  menu: boolean
  setMenu: React.Dispatch<React.SetStateAction<boolean>>
  menuBtn: React.RefObject<HTMLButtonElement | null>
  sheet: React.RefObject<HTMLDivElement | null>
  go: (href?: string) => (e?: React.MouseEvent) => void
  book: (from: string) => (e: React.MouseEvent) => void
}

export function NavSection({
  uid,
  root,
  still,
  brand,
  links,
  active,
  themeToggle,
  scheme,
  setOverride,
  menu,
  setMenu,
  menuBtn,
  sheet,
  go,
  book,
}: NavSectionProps) {
  return (
    <>
      {/* ---------------------------------------------------------- nav */}
      <header className="ovs-nav">
        <div className="ovs-nav-in">
          <a className="ovs-brand" href="/" onClick={go("/")}>
            <BrandMark />
            <span>{brand}</span>
          </a>
          <nav className="ovs-links" aria-label="Main">
            {links.map((l) => (
              <a key={l.label} href={l.href || "#"} onClick={go(l.href)} data-on={l.href && active === l.href.slice(1) ? "" : undefined}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ovs-nav-end">
            {themeToggle ? (
              <button type="button" className="ovs-icon-btn" onClick={() => setOverride(scheme === "dark" ? "light" : "dark")} aria-label={scheme === "dark" ? "Switch to daylight" : "Switch to dusk"}>
                <svg className="ovs-svg" viewBox="0 0 24 24" aria-hidden="true">
                  {scheme === "dark" ? (
                    <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                      <circle cx="12" cy="12" r="4.2" />
                      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
                    </g>
                  ) : (
                    <path d="M20 14.6A8.4 8.4 0 0 1 9.4 4a8.4 8.4 0 1 0 10.6 10.6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  )}
                </svg>
              </button>
            ) : null}
            <Magnet className="ovs-btn ovs-btn-dark ovs-nav-cta" href="#contact" onClick={book("nav")}>
              <span>Book a call</span>
              <Arrow />
            </Magnet>
            <button ref={menuBtn} type="button" className="ovs-icon-btn ovs-burger" aria-expanded={menu} aria-controls={uid + "menu"} aria-label="Menu" onClick={() => setMenu((m) => !m)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div id={uid + "menu"} ref={sheet} className="ovs-sheet" role="dialog" aria-modal="true" aria-label="Menu" data-open={menu ? "" : undefined} hidden={!menu}>
        {links.map((l, i) => (
          <a key={l.label} href={l.href || "#"} onClick={go(l.href)} style={{ "--i": i } as React.CSSProperties}>
            <span>0{i + 1}</span>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="ovs-btn ovs-btn-dark" onClick={book("menu")} style={{ "--i": links.length } as React.CSSProperties}>
          Book a call <Arrow />
        </a>
      </div>

    </>
  )
}
