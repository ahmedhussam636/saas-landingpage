import * as React from "react";
import BentoCard, {
  type BentoThemeItem,
} from "@/components/shadcn-studio/blocks/bento-cards-10/bento-cards-10";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "../motion";
import { Kicker, Split } from "../marks";
import { DEFAULT_CASES, DEFAULT_STATS, DEFAULT_STEPS } from "../defaults";
import { formatNumber } from "../canopy";
import type { OvsCase, OvsStat, OvsStep } from "../types";

interface BentoSectionProps {
  uid: string;
  brand: string;
  scheme: "light" | "dark";
  onSchemeChange: (next: "light" | "dark") => void;
  cases?: OvsCase[];
  stats?: OvsStat[];
  steps?: OvsStep[];
  book: (from: string) => (e: React.MouseEvent) => void;
}

const CODLY_STACK = [
  "React 19",
  "Next.js",
  "React Native",
  "TypeScript",
  "Tailwind CSS",
  "Postgres",
  "Figma Tokens",
  "GSAP and Motion",
];

/** Reads "Week 0 to 1" / "Weeks 3 to 7" / "Week 8 onward" into a span length in weeks. */
function weekSpan(when: string) {
  const n = (when.match(/\d+/g) || []).map(Number);
  if (n.length >= 2) return Math.max(1, n[1] - n[0]);
  return 1;
}

/** One hue, denser at each stage: the canopy filling in. */
const STAGE_TONE = [28, 48, 72, 100];

export function BentoSection({
  uid,
  brand,
  scheme,
  onSchemeChange,
  cases = DEFAULT_CASES as OvsCase[],
  stats = DEFAULT_STATS,
  steps = DEFAULT_STEPS,
  book,
}: BentoSectionProps) {
  const themeItems = React.useMemo<BentoThemeItem[]>(() => {
    const base: BentoThemeItem[] = [
      {
        name: `${brand} Summer`,
        tag: "Canopy palette",
        accent: "#3d6a12",
        soft: "#c4dc52",
      },
      {
        name: `${brand} Night`,
        tag: "Dark mode tokens",
        accent: "#0e1a10",
        soft: "#c4dc52",
      },
    ];
    const fromCases = cases.map((c) => ({
      name: c.client,
      tag: c.kind,
      accent: c.tint?.[1] || "#3d6a12",
      soft: c.tint?.[0] || "#c4dc52",
    }));
    return [...base, ...fromCases];
  }, [brand, cases]);

  const highlightStats = stats.slice(0, 4);
  const clientNames = cases.map((c) => c.client);
  const clientList =
    clientNames.length > 1
      ? clientNames.slice(0, -1).join(", ") + " and " + clientNames[clientNames.length - 1]
      : clientNames.join("");

  const tone = (i: number) =>
    `color-mix(in oklab, var(--ovs-accent) ${STAGE_TONE[Math.min(i, STAGE_TONE.length - 1)]}%, var(--ovs-card))`;

  const cardStyle: React.CSSProperties = {
    borderColor: "var(--ovs-line)",
    backgroundColor: "var(--ovs-card)",
  };

  return (
    <section
      className="ovs-sec"
      data-sec="bento"
      aria-labelledby={uid + "bento-h"}
    >
      <div className="ovs-wrap">
        <div className="ovs-head">
          <div>
            <Kicker n="07" text="Studio system" />
            <span id={uid + "bento-h"}>
              <Split
                text={`How ${brand} ships brand and code as one system`}
                className="ovs-h2"
              />
            </span>
          </div>
          <div className="ovs-head-side" data-rv>
            <p className="ovs-lede">
              Every sprint pairs senior product design with production
              engineering, so tokens, components and the launch come out of the
              same loop.
            </p>
          </div>
        </div>

        <ScrollReveal y={24} duration={0.7}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Themes and client design systems */}
            <div className="min-h-[368px] lg:col-span-2">
              <BentoCard
                title="Light, dark and client design systems"
                description={`Switch ${brand} between light and dark, and browse the token systems we built for ${clientList}.`}
                illustrationPosition="top"
                items={themeItems}
                scheme={scheme}
                onSchemeChange={onSchemeChange}
              />
            </div>

            {/* Outcomes */}
            <Card className="shadow-none" style={cardStyle}>
              <CardContent className="flex h-full flex-col gap-6">
                <h3 className="text-sm" style={{ color: "var(--ovs-ink2)" }}>
                  Outcomes so far
                </h3>

                <dl className="grid flex-1 grid-cols-2 content-start gap-x-6 gap-y-6">
                  {highlightStats.map((s) => (
                    <div
                      key={s.label}
                      className="border-t pt-3"
                      style={{ borderColor: "var(--ovs-line)" }}
                    >
                      <dd
                        className="text-[32px] leading-none font-medium tabular-nums"
                        style={{ color: "var(--ovs-ink)", letterSpacing: "-0.04em" }}
                      >
                        {(s.prefix || "") +
                          formatNumber(s.value, s.decimals || 0) +
                          (s.suffix || "")}
                      </dd>
                      <dt
                        className="mt-2 text-[13px] leading-snug"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        {s.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <p className="text-[13px] leading-relaxed" style={{ color: "var(--ovs-ink2)" }}>
                  Four new startup teams a quarter, each with senior builders
                  from day one.
                </p>
              </CardContent>
            </Card>

            {/* Stack and ownership */}
            <Card className="shadow-none" style={cardStyle}>
              <CardContent className="flex h-full flex-col justify-between gap-6">
                <div>
                  <h3 className="text-sm" style={{ color: "var(--ovs-ink2)" }}>
                    Core stack
                  </h3>
                  <p
                    className="mt-4 text-lg font-medium"
                    style={{ color: "var(--ovs-ink)", letterSpacing: "-0.01em" }}
                  >
                    Yours from day one
                  </p>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--ovs-ink2)" }}
                  >
                    Figma libraries, GitHub repos and design docs live in your
                    own workspace.
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2" aria-label="Core stack">
                  {CODLY_STACK.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border px-3 py-1 text-xs"
                      style={{
                        borderColor: "var(--ovs-line)",
                        color: "var(--ovs-ink2)",
                      }}
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Eight-week cadence */}
            <Card className="shadow-none lg:col-span-2" style={cardStyle}>
              <CardContent className="flex h-full flex-col gap-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm" style={{ color: "var(--ovs-ink2)" }}>
                      Cadence
                    </h3>
                    <p
                      className="mt-1 text-lg font-medium"
                      style={{ color: "var(--ovs-ink)", letterSpacing: "-0.01em" }}
                    >
                      Eight weeks from discovery to launch
                    </p>
                  </div>
                  <button
                    type="button"
                    className="ovs-btn ovs-btn-dark"
                    onClick={book("bento")}
                  >
                    Book a 30-min call
                  </button>
                </div>

                <div>
                  <div className="flex gap-1" aria-hidden="true">
                    {steps.map((step, i) => (
                      <span
                        key={step.name}
                        className="h-2 rounded-[4px]"
                        style={{ flex: weekSpan(step.when), backgroundColor: tone(i) }}
                      />
                    ))}
                  </div>
                  <div
                    className="mt-2 flex justify-between text-xs tabular-nums"
                    style={{ color: "var(--ovs-ink2)" }}
                    aria-hidden="true"
                  >
                    <span>Week 0</span>
                    <span>Week 8</span>
                  </div>
                </div>

                <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {steps.map((step, i) => (
                    <li key={step.name}>
                      <div className="flex items-center gap-2">
                        <span
                          className="size-2 shrink-0 rounded-[2px]"
                          style={{ backgroundColor: tone(i) }}
                          aria-hidden="true"
                        />
                        <span
                          className="text-xl leading-none"
                          style={{
                            fontFamily: "var(--ovs-serif)",
                            color: "var(--ovs-ink)",
                          }}
                        >
                          {step.name}
                        </span>
                      </div>
                      <p
                        className="mt-3 text-base font-medium"
                        style={{ color: "var(--ovs-ink)" }}
                      >
                        {step.title}
                      </p>
                      <p
                        className="mt-1 text-[13px] tabular-nums"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        {step.when}
                      </p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
