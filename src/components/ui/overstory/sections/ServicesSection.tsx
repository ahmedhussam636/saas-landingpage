import type { OvsService } from "../types"
import { ServiceArt } from "../illustrations"
import { Kicker, Split } from "../marks"

interface ServicesSectionProps {
  uid: string
  svc: { kicker: string; title: string; text: string; items: OvsService[] } | null
  svcItems: OvsService[]
  svcOpen: number
  setSvcOpen: React.Dispatch<React.SetStateAction<number>>
  svcHover: number
  setSvcHover: React.Dispatch<React.SetStateAction<number>>
}

export function ServicesSection({
  uid,
  svc,
  svcItems,
  svcOpen,
  setSvcOpen,
  svcHover,
  setSvcHover,
}: ServicesSectionProps) {
  if (!svc) return null
  return (

          <section className="ovs-sec ovs-services" data-sec="services" aria-labelledby={uid + "svc"}>
            <div className="ovs-wrap">
              <div className="ovs-head">
                <div>
                  <Kicker n="02" text={svc.kicker} />
                  <span id={uid + "svc"}>
                    <Split text={svc.title} className="ovs-h2" />
                  </span>
                </div>
                <p className="ovs-lede" data-rv>
                  {svc.text}
                </p>
              </div>
              <div className="ovs-svc-list" onPointerLeave={() => setSvcHover(svcOpen >= 0 ? svcOpen : 0)}>
                <div className="ovs-svc-prev" aria-hidden="true">
                  {svcItems.map((s, i) => (
                    <div key={i} className="ovs-svc-art" data-on={i === svcHover ? "" : undefined}>
                      <ServiceArt art={s.art} />
                    </div>
                  ))}
                </div>
                {svcItems.map((s, i) => {
                  const open = svcOpen === i
                  return (
                    <div key={s.title} className="ovs-svc-row" data-open={open ? "" : undefined} onPointerEnter={() => setSvcHover(i)}>
                      <h3 className="ovs-svc-h">
                        <button type="button" aria-expanded={open} aria-controls={uid + "svc" + i} onClick={() => setSvcOpen(open ? -1 : i)} onFocus={() => setSvcHover(i)}>
                          <span className="ovs-svc-n">0{i + 1}</span>
                          <span className="ovs-svc-t">{s.title}</span>
                          <span className="ovs-svc-time">{s.time}</span>
                          <span className="ovs-plus" aria-hidden="true" />
                        </button>
                      </h3>
                      <div id={uid + "svc" + i} className="ovs-fold" role="region" aria-label={s.title}>
                        <div>
                          <div className="ovs-svc-body">
                            <p>{s.text}</p>
                            <ul>
                              {s.tags.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                          </div>
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
