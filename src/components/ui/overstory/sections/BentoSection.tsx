import * as React from "react";
import { ArrowUpRight, Layers, ShieldCheck, Sparkles, Zap } from "lucide-react";
import BentoCard, {
  type BentoThemeItem,
} from "@/components/shadcn-studio/blocks/bento-cards-10/bento-cards-10";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "../motion";
import { Kicker, Split } from "../marks";
import {
  DEFAULT_CASES,
  DEFAULT_SERVICES,
  DEFAULT_STATS,
  DEFAULT_STEPS,
} from "../defaults";
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
  "GSAP & Motion",
];

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
  const serviceTags = DEFAULT_SERVICES.slice(0, 4);

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
                text={`How ${brand} ships cohesive brands and code together.`}
                className="ovs-h2"
              />
            </span>
          </div>
          <div className="ovs-head-side" data-rv>
            <p className="ovs-lede">
              Every sprint pairs senior product design with production
              engineering—tokens, components, and launch velocity in one system.
            </p>
          </div>
        </div>

        <ScrollReveal y={28} duration={0.75}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {/* Primary bento-cards-10 tile (2 columns on desktop) */}
            <div className="min-h-[370px] lg:col-span-2">
              <BentoCard
                title="Adaptive themes & client design systems"
                description={`Switch ${brand} between light and dark modes while previewing the live token systems crafted for ScribeAI, Salesive, watchup, and Venn.`}
                illustrationPosition="top"
                items={themeItems}
                scheme={scheme}
                onSchemeChange={onSchemeChange}
              />
            </div>

            {/* Outcomes & velocity metrics from Codly stats */}
            <Card
              className="flex flex-col justify-between"
              style={{
                borderColor: "var(--ovs-line)",
                backgroundColor: "var(--ovs-card)",
              }}
            >
              <CardContent className="flex h-full flex-col justify-between gap-6">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "var(--ovs-accent)" }}
                  >
                    <Zap className="size-3.5" />
                    Ship velocity
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--ovs-ink2)" }}
                  >
                    Since 2019
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {highlightStats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border p-3.5"
                      style={{
                        borderColor: "var(--ovs-line)",
                        backgroundColor: "var(--ovs-paper)",
                      }}
                    >
                      <div
                        className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl"
                        style={{ color: "var(--ovs-ink)" }}
                      >
                        {s.prefix || ""}
                        {s.value}
                        {s.suffix || ""}
                      </div>
                      <div
                        className="mt-1 text-xs leading-snug"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--ovs-ink2)" }}
                >
                  Four new startup teams per quarter—every engagement gets
                  senior builders from day one.
                </div>
              </CardContent>
            </Card>

            {/* Production stack & ownership */}
            <Card
              style={{
                borderColor: "var(--ovs-line)",
                backgroundColor: "var(--ovs-card)",
              }}
            >
              <CardContent className="flex h-full flex-col justify-between gap-5">
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "var(--ovs-accent)" }}
                  >
                    <Layers className="size-3.5" />
                    Core stack
                  </span>
                  <ShieldCheck
                    className="size-4"
                    style={{ color: "var(--ovs-accent)" }}
                  />
                </div>

                <div>
                  <div
                    className="text-lg font-semibold tracking-tight"
                    style={{ color: "var(--ovs-ink)" }}
                  >
                    100% yours from day one
                  </div>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: "var(--ovs-ink2)" }}
                  >
                    Figma libraries, GitHub repos, and design docs live directly
                    in your workspace.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {CODLY_STACK.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: "var(--ovs-line)",
                        backgroundColor: "var(--ovs-paper)",
                        color: "var(--ovs-ink)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 8-week sprint cadence + capabilities */}
            <Card
              className="lg:col-span-2"
              style={{
                borderColor: "var(--ovs-line)",
                backgroundColor: "var(--ovs-card)",
              }}
            >
              <CardContent className="flex h-full flex-col justify-between gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "var(--ovs-accent)" }}
                  >
                    <Sparkles className="size-3.5" />
                    Eight-week cadence &amp; capabilities
                  </span>

                  <button
                    type="button"
                    onClick={book("bento")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      height: "36px",
                      padding: "0 16px",
                      borderRadius: "999px",
                      backgroundColor: "var(--ovs-soft, #c4dc52)",
                      color: "#10150d",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <span>Book a 30-min call</span>
                    <ArrowUpRight className="size-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {steps.map((step, i) => (
                    <div
                      key={step.name}
                      className="flex flex-col justify-between rounded-xl border p-3.5"
                      style={{
                        borderColor: "var(--ovs-line)",
                        backgroundColor: "var(--ovs-paper)",
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className="font-semibold"
                            style={{ color: "var(--ovs-accent)" }}
                          >
                            0{i + 1} · {step.name}
                          </span>
                          <span style={{ color: "var(--ovs-ink2)" }}>
                            {step.when}
                          </span>
                        </div>
                        <div
                          className="mt-2 text-base font-semibold"
                          style={{ color: "var(--ovs-ink)" }}
                        >
                          {step.title}
                        </div>
                      </div>
                      <div
                        className="mt-2 text-xs"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        {serviceTags[i]?.title || "Weekly Friday demos"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
