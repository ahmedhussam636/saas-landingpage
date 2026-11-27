import * as React from "react"
import TeamLanyardRail, { type LanyardMember } from "@/components/ui/team-lanyard-rail"
import { ScrollReveal } from "../motion"
import { Kicker, Split } from "../marks"

interface TeamSectionProps {
  uid: string
  brand: string
  still: boolean
  book: (from: string) => (e: React.MouseEvent) => void
}

function makeTeam(brand: string): LanyardMember[] {
  return [
    {
      id: "ada",
      name: "Ada Lindqvist",
      role: "Head of Design",
      team: `${brand} · Design`,
      tone: 1,
      image: "https://cdn.21st.dev/assets/mirror/01/0129a921379e99ffcfab45433afaff19fce694d988053594aca9f81bdc84030b.jpg",
      bio: "Turns fuzzy product ideas into calm, honest interfaces. Runs the Friday design crit.",
      tags: ["Design systems", "Since 2019"],
      links: [{ label: "Email", href: "#contact" }, { label: "Portfolio", href: "#work" }],
    },
    {
      id: "ravi",
      name: "Ravi Menon",
      role: "Engineering Lead",
      team: `${brand} · Platform`,
      tone: 2,
      image: "https://cdn.21st.dev/assets/mirror/b3/b30528dd471f65d68c0a32c02007e30235fb6f0292b70cee0b8ce8efc65a0370.jpg",
      bio: "Keeps the build green and the on-call quiet. Happiest deleting old code.",
      tags: ["Platform", "Rust", "Since 2020"],
      links: [{ label: "Email", href: "#contact" }, { label: "Work", href: "#work" }],
    },
    {
      id: "imani",
      name: "Imani Okafor",
      role: "Product Manager",
      team: `${brand} · Product`,
      tone: 3,
      image: "https://cdn.21st.dev/assets/mirror/31/3192d5cfd93963226a5f4c8a6a8cbc6913f975b44ac4e39299fe57ee85367f1e.jpg",
      bio: "Talks to five customers a week and writes the one-page plan everyone actually reads.",
      tags: ["Research", "Since 2021"],
      links: [{ label: "Email", href: "#contact" }, { label: "Process", href: "#process" }],
    },
    {
      id: "kenji",
      name: "Kenji Arata",
      role: "Motion & Frontend",
      team: `${brand} · Web`,
      tone: 4,
      image: "https://cdn.21st.dev/assets/mirror/3c/3cfeb559f917fcbdf360c177307aff2a9ea4db2f283175f2079d152d8e66a16e.jpg",
      bio: "Sweats the last 10% of every animation. Ships fast interfaces that feel alive.",
      tags: ["GSAP", "Motion", "Since 2022"],
      links: [{ label: "Email", href: "#contact" }, { label: "Portfolio", href: "#work" }],
    },
    {
      id: "lucia",
      name: "Lucia Ferreira",
      role: "Studio Operations",
      team: `${brand} · People`,
      tone: 5,
      image: "https://cdn.21st.dev/assets/mirror/7c/7c4026ddb84a32bdc2c78f11ef8f6ba8f9f88e4f716c9d3c8bf06fb3690c9a7e.jpg",
      bio: "Keeps every sprint on track and makes sure onboarding feels effortless.",
      tags: ["Operations", "Since 2018"],
      links: [{ label: "Email", href: "#contact" }, { label: "FAQ", href: "#faq" }],
    },
    {
      id: "mateo",
      name: "Mateo Ruiz",
      role: "Backend Engineer",
      team: `${brand} · Platform`,
      tone: 2,
      image: "https://cdn.21st.dev/assets/mirror/3f/3f7507b8577ffc6f2647006f918735f239d409fe50c5e74c70b924bf618fbcd9.jpg",
      bio: "Designs the APIs other teams love to call. Writes the docs before the code.",
      tags: ["APIs", "Go", "Since 2021"],
      links: [{ label: "Email", href: "#contact" }, { label: "Services", href: "#services" }],
    },
    {
      id: "mila",
      name: "Mila Novak",
      role: "Brand Designer",
      team: `${brand} · Design`,
      tone: 1,
      image: "https://cdn.21st.dev/assets/mirror/a2/a23846f7e9338b8b753b523dcb11db8cb275e76e13eaf1bb738590728f892970.jpg",
      bio: "Draws the illustrations, picks the type and guards the brand from clip art.",
      tags: ["Illustration", "Since 2023"],
      links: [{ label: "Email", href: "#contact" }, { label: "Portfolio", href: "#work" }],
    },
    {
      id: "noah",
      name: "Noah Mensah",
      role: "Partner Success",
      team: `${brand} · Support`,
      tone: 3,
      image: "https://cdn.21st.dev/assets/mirror/86/86f167053b1fc186b169482c15450834272b8a55993e9f0fb465f047de4b26a6.jpg",
      bio: "Answers within the hour and keeps founders synced with every weekly ship.",
      tags: ["Delivery", "Since 2020"],
      links: [{ label: "Email", href: "#contact" }, { label: "Book", href: "#contact" }],
    },
  ]
}

export function TeamSection({ uid, brand, still, book }: TeamSectionProps) {
  const members = React.useMemo(() => makeTeam(brand), [brand])

  return (
    <section className="ovs-sec" data-sec="team" aria-labelledby={uid + "tm"}>
      <div className="ovs-wrap">
        <div className="ovs-head">
          <div>
            <Kicker n="07" text="The crew" />
            <span id={uid + "tm"}>
              <Split text="Senior people, small crew. Flip a badge to meet us." className="ovs-h2" />
            </span>
          </div>
          <div className="ovs-head-side" data-rv>
            <p className="ovs-lede">
              Brush along the rail, pull a badge down, or click to flip it over and see what each person ships.
            </p>
          </div>
        </div>
      </div>

      <ScrollReveal className="mt-6" y={34} duration={0.8}>
        <TeamLanyardRail
          items={members}
          caption="Brush along the rail to meet someone, pull a badge down, click to flip it."
          autoplay={!still}
        />
      </ScrollReveal>
    </section>
  )
}
