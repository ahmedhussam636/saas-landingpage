import type { OvsFaq, OvsLogo, OvsPlan, OvsQuote, OvsService, OvsStep } from "./types"

export const DEFAULT_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
]

export const DEFAULT_HERO = {
  lead: "Design and Eng For",
  words: ["SAAS", "AI", "Fintech", "DevTool"],
  tail: "Startups.",
  trusted: "Trusted by fast growing startups",
  cue: "Scroll to rise above the trees",
}

export const DEFAULT_LOGOS = [
  { name: "watchup", mark: "watch", type: "heavy" },
  { name: "Salesive", mark: "slash", type: "heavy" },
  { name: "ScribeAI", mark: "scribe", type: "serif" },
  { name: "Salesbase", mark: "knot", type: "sans" },
  { name: "Venn", mark: "venn", type: "sans" },
]

export const DEFAULT_MANIFESTO = {
  kicker: "Above the canopy",
  text: "We are a senior design and engineering crew for SaaS founders. [team] We take products from a napkin sketch to something people pay for, [chart] in weeks, not quarters, and we stay until it grows.",
}

export const DEFAULT_STATS = [
  { value: 48, label: "startups launched since 2019" },
  { value: 410, prefix: "$", suffix: "M", label: "raised by clients after launch" },
  { value: 6, suffix: " wks", label: "median time to a shipped v1" },
  { value: 4.9, decimals: 1, suffix: "/5", label: "average rating from founders" },
]

export const DEFAULT_SERVICES = [
  { title: "Brand & Identity", art: "brand", time: "2 to 3 weeks", text: "Names, marks and a visual voice that make a seed-stage company look like it already won.", tags: ["Naming", "Logo & mark", "Type & colour", "Guidelines"] },
  { title: "Product Design", art: "product", time: "3 to 6 weeks", text: "Flows, prototypes and interfaces your users understand on the first click, tested before a line of code.", tags: ["Research", "Wireframes", "High-fidelity UI", "Prototypes"] },
  { title: "Marketing Sites", art: "site", time: "2 to 4 weeks", text: "Fast, animated, CMS-backed sites that turn launch traffic into booked demos.", tags: ["Next.js", "Copywriting", "CMS", "SEO & analytics"] },
  { title: "Engineering", art: "code", time: "Ongoing", text: "Production React, Next.js and React Native, shipped by the same people who designed it.", tags: ["Frontend", "APIs", "Auth & billing", "CI/CD"] },
  { title: "Design Systems", art: "system", time: "3 to 5 weeks", text: "Tokens, components and docs, so your own team keeps shipping UI that looks like you after we leave.", tags: ["Figma library", "Coded components", "Storybook", "Docs"] },
]

export const DEFAULT_CASES = [
  { client: "ScribeAI", mark: "scribe", kind: "AI clinical notes", title: "Notes that write themselves, for clinics that hate paperwork.", metric: "$12M", metricLabel: "Series A, four months after launch", year: "2025", mock: "doc", tint: ["#cfe3d8", "#86b49a"] },
  { client: "Salesive", mark: "slash", kind: "AI sales coaching", title: "A coach in every call, without the awkward silence.", metric: "+212%", metricLabel: "activation after the new onboarding", year: "2025", mock: "chat", tint: ["#e9e2cf", "#c9a865"] },
  { client: "watchup", mark: "watch", kind: "Field-team monitoring", title: "One calm dashboard for two thousand remote crews.", metric: "3.1x", metricLabel: "trial to paid conversion", year: "2024", mock: "dashboard", tint: ["#d4e0ee", "#7d9cc4"] },
  { client: "Venn", mark: "venn", kind: "Shared finance", title: "Money for two, designed so nobody keeps score.", metric: "48k", metricLabel: "waitlist sign-ups in launch week", year: "2024", mock: "mobile", tint: ["#e6d9e4", "#b48aa8"] },
]

export const DEFAULT_STEPS = [
  { name: "Seed", when: "Week 0 to 1", title: "Discovery", text: "We sit with your founders, your users and your data. You leave with a sharp problem, a scope and a fixed price." },
  { name: "Sapling", when: "Weeks 1 to 3", title: "Design", text: "Brand, flows and high-fidelity screens in weekly loops. Real work every Friday, never one big reveal." },
  { name: "Branch", when: "Weeks 3 to 7", title: "Build", text: "The designers who drew it pair with the engineers who ship it. Production code from week three, on a preview link every day." },
  { name: "Canopy", when: "Week 8 onward", title: "Launch & grow", text: "Launch, measure, iterate. Keep us as your embedded team, or take over a codebase and a system your next hires will love." },
]

export const DEFAULT_QUOTES = [
  { quote: "Codly felt like hiring a senior product team overnight. We went from Figma chaos to a launched product in seven weeks, and raised our A on the back of it.", name: "Maya Okafor", role: "CEO, ScribeAI", mark: "scribe" },
  { quote: "They designed it and they built it, so nothing got lost in a handoff. Activation doubled the month the new onboarding shipped.", name: "Daniel Reyes", role: "Founder, Salesive", mark: "slash" },
  { quote: "The design system they left behind is the reason our three new engineers still ship UI that looks like us.", name: "Priya Natarajan", role: "CTO, watchup", mark: "watch" },
]

export const DEFAULT_PLANS = [
  { name: "Launch Sprint", price: 14000, unit: "fixed", text: "A three-week sprint for a new product, a rebrand or a launch site.", features: ["Brand or product sprint", "Two senior designers", "Clickable prototype", "Figma handover and walkthrough"], cta: "Start a sprint" },
  { name: "Product Partner", price: 9800, quarterly: 8820, unit: "/mo", text: "Design and engineering as one subscription. The way most of our founders work with us.", features: ["Unlimited requests, one at a time", "Designer and full-stack engineer", "Friday demos, daily preview links", "Pause or cancel any month"], cta: "Book a call", featured: true, badge: "Most chosen" },
  { name: "Embedded Team", price: null, text: "A dedicated pod for funded teams that need to move fast for a quarter or more.", features: ["Three to six person pod", "Product lead included", "Your Slack, your standups", "Response-time commitments"], cta: "Talk to us" },
]

export const DEFAULT_FAQ = [
  { q: "How fast can you start?", a: "Usually within two weeks. We take on four new teams a quarter, so every project gets senior people, not whoever is free." },
  { q: "Do you only work with SaaS startups?", a: "Mostly pre-seed to Series B SaaS and AI products. If you are building software people pay for, we are probably a fit." },
  { q: "Who owns the work?", a: "You do, from the first day. Figma files, repositories and accounts live in your workspace, not ours." },
  { q: "What is your stack?", a: "React, Next.js, React Native, TypeScript, Tailwind and Postgres, plus whatever your team already runs. Figma for design." },
  { q: "Can you work alongside our team?", a: "Yes, and we like to. We often pair with a founding engineer and leave a system and docs they can carry forward." },
  { q: "What if we need to pause?", a: "The Partner plan pauses any month. Unused days roll over for sixty days." },
]

export const DEFAULT_CTA = {
  title: "Let's grow something worth looking up at.",
  text: "Tell us what you are building. You will hear back from a founder within a day, with a plan and a price.",
  button: "Book an intro call",
}

export const DEFAULT_FOOTER = {
  columns: [
    { title: "Studio", links: [{ label: "Work", href: "#work" }, { label: "Services", href: "#services" }, { label: "Process", href: "#process" }, { label: "Pricing", href: "#pricing" }] },
    { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Careers" }, { label: "Field notes" }, { label: "Press kit" }] },
    { title: "Elsewhere", links: [{ label: "LinkedIn" }, { label: "X" }, { label: "Dribbble" }, { label: "GitHub" }] },
  ],
  city: "Cairo",
  timeZone: "Africa/Cairo",
  note: "Made under the trees.",
}

export const SEASONS = {
  summer: { shadow: [20, 38, 12], mid: [74, 114, 22], lit: [170, 202, 56], glow: [228, 240, 140], twig: [42, 38, 26], accent: "#3d6a12", soft: "#c4dc52", shape: 0.42 },
  autumn: { shadow: [46, 20, 10], mid: [146, 62, 18], lit: [224, 138, 36], glow: [252, 210, 116], twig: [46, 30, 22], accent: "#a5451a", soft: "#f1b24a", shape: 0.5 },
  blossom: { shadow: [92, 44, 64], mid: [192, 102, 138], lit: [242, 176, 200], glow: [255, 230, 238], twig: [56, 38, 42], accent: "#a33a64", soft: "#f3b1c9", shape: 0.66 },
}

export const SKIES = {
  light: { stops: [[0, [100, 150, 208]], [0.55, [166, 202, 233]], [1, [212, 228, 241]]], sun: [0.56, 0.28, 255, 255, 250, 0.62], cloud: [255, 255, 255, 0.9], haze: [194, 216, 236], stars: 0, leaf: 1 },
  dark: { stops: [[0, [8, 14, 34]], [0.55, [26, 40, 84]], [1, [74, 60, 108]]], sun: [0.5, 0.92, 240, 150, 112, 0.42], cloud: [150, 140, 196, 0.32], haze: [34, 46, 84], stars: 1, leaf: 0.36 },
}

/** Four depth layers, far to near. `reach` is where the leaves start, in units of the half-box ellipse. */
export const LAYERS = [
  { reach: 0.6, band: 0.52, leaf: 0.011, twigs: 9, masses: 170, per: 26, haze: 0.44, blur: 0.5, res: 1.25 },
  { reach: 0.72, band: 0.58, leaf: 0.016, twigs: 8, masses: 135, per: 26, haze: 0.22, blur: 0, res: 1.25 },
  { reach: 0.86, band: 0.66, leaf: 0.023, twigs: 7, masses: 105, per: 24, haze: 0.08, blur: 0, res: 1 },
  { reach: 1.02, band: 0.86, leaf: 0.036, twigs: 6, masses: 82, per: 22, haze: 0, blur: 2.2, res: 0.8 },
]
