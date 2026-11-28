import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { FileText, GitBranch, Layers } from "lucide-react";
import BentoCard, {
  usePrefersReducedMotion,
  useSlotWidth,
  type BentoThemeItem,
} from "@/components/shadcn-studio/blocks/bento-cards-10/bento-cards-10";
import {
  BeamConnection,
  ConnectionBeam,
} from "@/components/shadcn-studio/illustrations/beam-connection";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
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

type WorkspaceKey = "figma" | "github" | "docs";

interface StackEntry {
  name: string;
  workspace: WorkspaceKey;
}

const CODLY_STACK: StackEntry[] = [
  { name: "React 19", workspace: "github" },
  { name: "Next.js", workspace: "github" },
  { name: "React Native", workspace: "github" },
  { name: "TypeScript", workspace: "docs" },
  { name: "Tailwind CSS", workspace: "figma" },
  { name: "Postgres", workspace: "docs" },
  { name: "Figma Tokens", workspace: "figma" },
  { name: "GSAP and Motion", workspace: "figma" },
];

const WORKSPACES: {
  key: WorkspaceKey;
  label: string;
  targetIndex: number;
  Icon: typeof Layers;
}[] = [
  { key: "figma", label: "Figma", targetIndex: 6, Icon: Layers },
  { key: "github", label: "GitHub", targetIndex: 0, Icon: GitBranch },
  { key: "docs", label: "Docs", targetIndex: 3, Icon: FileText },
];

/** Reads "Week 0 to 1" / "Weeks 3 to 7" / "Week 8 onward" into a span length in weeks. */
function weekSpan(when: string) {
  const n = (when.match(/\d+/g) || []).map(Number);
  if (n.length >= 2) return Math.max(1, n[1] - n[0]);
  return 1;
}

/** One hue, denser at each stage: the canopy filling in. */
const STAGE_TONE = [28, 48, 72, 100];

const cardStyle: React.CSSProperties = {
  borderColor: "var(--ovs-line)",
  backgroundColor: "var(--ovs-card)",
};

const OutcomesIllustration = ({ stats }: { stats: OvsStat[] }) => {
  const reduceMotion = usePrefersReducedMotion();
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const hubRef = React.useRef<HTMLSpanElement>(null);
  const pillRefs = React.useMemo(
    () => stats.map(() => React.createRef<HTMLButtonElement>()),
    [stats.length],
  );

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <BeamConnection
      background="particles"
      className="flex w-full max-w-92 flex-1 items-center justify-between gap-2.5"
    >
      {({ containerRef, active }) => (
        <>
          <div className="z-2 flex shrink-0 flex-col gap-2">
            {stats.map((s, i) => {
              const isSelected = activeIndex === i;
              const valueText =
                (s.prefix || "") +
                formatNumber(s.value, s.decimals || 0) +
                (s.suffix || "");
              return (
                <button
                  key={s.label}
                  type="button"
                  ref={pillRefs[i]}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`${valueText} ${s.label}`}
                  style={{
                    height: "36px",
                    minWidth: "66px",
                    padding: "0 10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                    border: isSelected
                      ? "1.5px solid var(--ovs-accent, #3d6a12)"
                      : "1px solid var(--ovs-line)",
                    backgroundColor: isSelected
                      ? "color-mix(in oklab, var(--ovs-soft, #c4dc52) 18%, var(--ovs-card))"
                      : "var(--ovs-card)",
                    color: "var(--ovs-ink)",
                    fontSize: "12px",
                    fontWeight: 500,
                    fontVariantNumeric: "tabular-nums",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 2,
                    transition: "border-color 220ms ease, background-color 220ms ease",
                  }}
                >
                  {valueText}
                </button>
              );
            })}
          </div>

          <span ref={hubRef} className="size-0.5 shrink-0" />

          <div
            ref={carouselRef}
            className="relative flex h-48 min-w-0 flex-1 items-center justify-end"
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
              }}
              orientation="vertical"
              plugins={
                reduceMotion
                  ? []
                  : [Autoplay({ delay: 2800, stopOnInteraction: false })]
              }
              className="bg-card z-2 w-full rounded-2xl"
            >
              <CarouselContent className="z-2 -mt-5 max-h-46 px-px">
                {stats.map((s) => (
                  <CarouselItem key={s.label} className="basis-1/2 pt-5">
                    <div
                      className="bg-card flex flex-col gap-1.5 rounded-xl border px-3.5 py-3"
                      style={{ borderColor: "var(--ovs-line)" }}
                    >
                      <span
                        className="text-2xl leading-none font-medium tabular-nums"
                        style={{
                          color: "var(--ovs-ink)",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {(s.prefix || "") +
                          formatNumber(s.value, s.decimals || 0) +
                          (s.suffix || "")}
                      </span>
                      <span
                        className="text-xs leading-snug"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        {s.label}
                      </span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="from-card pointer-events-none absolute inset-x-0 -top-2 h-[28%] bg-linear-to-b to-transparent" />
              <div className="from-card pointer-events-none absolute inset-x-0 -bottom-2 h-[28%] bg-linear-to-t to-transparent" />
            </Carousel>
          </div>

          {pillRefs.map((pillRef, i) => (
            <ConnectionBeam
              key={stats[i].label}
              containerRef={containerRef}
              fromRef={pillRef}
              toRef={hubRef}
              pathColor="var(--ovs-ink, #10150d)"
              pathOpacity={0.16}
              gradientStartColor="var(--ovs-accent, #3d6a12)"
              gradientStopColor="var(--ovs-soft, #c4dc52)"
              className="z-0"
              duration={4}
              delay={i * 0.45}
              active={active && !reduceMotion}
            />
          ))}
          <ConnectionBeam
            containerRef={containerRef}
            fromRef={hubRef}
            toRef={carouselRef}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            active={active && !reduceMotion}
          />
        </>
      )}
    </BeamConnection>
  );
};

const StackIllustration = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [api, setApi] = React.useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const stackRef = React.useRef<HTMLDivElement>(null);
  const span1Ref = React.useRef<HTMLSpanElement>(null);
  const span2Ref = React.useRef<HTMLSpanElement>(null);
  const span3Ref = React.useRef<HTMLSpanElement>(null);
  const targetRefs = React.useMemo(
    () => WORKSPACES.map(() => React.createRef<HTMLButtonElement>()),
    [],
  );

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const activeWorkspace = CODLY_STACK[activeIndex]?.workspace ?? "github";

  return (
    <BeamConnection
      background="particles"
      className="flex w-full max-w-92 flex-1 items-center justify-between gap-2.5"
    >
      {({ containerRef, active }) => (
        <>
          <div
            ref={stackRef}
            className="relative flex h-48 min-w-0 flex-1 items-center"
          >
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
              }}
              orientation="vertical"
              plugins={
                reduceMotion
                  ? []
                  : [Autoplay({ delay: 2300, stopOnInteraction: false })]
              }
              className="bg-card z-2 w-full rounded-2xl"
            >
              <CarouselContent className="z-2 -mt-4 max-h-46 px-px">
                {CODLY_STACK.map((tech, i) => {
                  const isCentered = activeIndex === i;
                  return (
                    <CarouselItem key={tech.name} className="basis-1/3 pt-4">
                      <div
                        className="bg-card flex items-center justify-between gap-2 rounded-xl border px-3 py-2"
                        style={{
                          borderColor: isCentered
                            ? "var(--ovs-accent, #3d6a12)"
                            : "var(--ovs-line)",
                          transition: "border-color 220ms ease",
                        }}
                      >
                        <span
                          className="truncate text-xs font-medium"
                          style={{ color: "var(--ovs-ink)" }}
                        >
                          {tech.name}
                        </span>
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: isCentered
                              ? "var(--ovs-accent, #3d6a12)"
                              : "var(--ovs-line)",
                          }}
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <div className="from-card pointer-events-none absolute inset-x-0 -top-2 h-[28%] bg-linear-to-b to-transparent" />
              <div className="from-card pointer-events-none absolute inset-x-0 -bottom-2 h-[28%] bg-linear-to-t to-transparent" />
            </Carousel>
          </div>

          <div className="flex shrink-0 flex-col gap-10">
            <span ref={span1Ref} className="size-0.5" />
            <span ref={span2Ref} className="size-0.5" />
            <span ref={span3Ref} className="size-0.5" />
          </div>

          <div className="z-2 flex shrink-0 flex-col gap-3">
            {WORKSPACES.map(({ key, label, targetIndex, Icon }, i) => {
              const isHighlighted = activeWorkspace === key;
              return (
                <button
                  key={key}
                  type="button"
                  ref={targetRefs[i]}
                  onClick={() => api?.scrollTo(targetIndex)}
                  aria-label={`Jump stack to ${label}`}
                  style={{
                    height: "40px",
                    minWidth: "92px",
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    borderRadius: "12px",
                    border: isHighlighted
                      ? "1.5px solid var(--ovs-accent, #3d6a12)"
                      : "1px solid var(--ovs-line)",
                    backgroundColor: isHighlighted
                      ? "color-mix(in oklab, var(--ovs-soft, #c4dc52) 18%, var(--ovs-card))"
                      : "var(--ovs-card)",
                    color: "var(--ovs-ink)",
                    fontSize: "12.5px",
                    fontWeight: 500,
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 2,
                    transition: "border-color 220ms ease, background-color 220ms ease",
                  }}
                >
                  <Icon className="size-3.5 shrink-0" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <ConnectionBeam
            containerRef={containerRef}
            fromRef={stackRef}
            toRef={span2Ref}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            active={active && !reduceMotion}
          />
          <ConnectionBeam
            containerRef={containerRef}
            fromRef={span2Ref}
            toRef={span1Ref}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            active={active && !reduceMotion}
          />
          <ConnectionBeam
            containerRef={containerRef}
            fromRef={span2Ref}
            toRef={span3Ref}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            active={active && !reduceMotion}
          />
          <ConnectionBeam
            containerRef={containerRef}
            fromRef={span1Ref}
            toRef={targetRefs[0]}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            delay={0.35}
            active={active && !reduceMotion}
          />
          <ConnectionBeam
            containerRef={containerRef}
            fromRef={span2Ref}
            toRef={targetRefs[1]}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            delay={0.7}
            active={active && !reduceMotion}
          />
          <ConnectionBeam
            containerRef={containerRef}
            fromRef={span3Ref}
            toRef={targetRefs[2]}
            pathColor="var(--ovs-ink, #10150d)"
            pathOpacity={0.16}
            gradientStartColor="var(--ovs-accent, #3d6a12)"
            gradientStopColor="var(--ovs-soft, #c4dc52)"
            className="z-0"
            duration={4}
            delay={1.05}
            active={active && !reduceMotion}
          />
        </>
      )}
    </BeamConnection>
  );
};

const CadenceIllustration = ({
  steps,
  tone,
}: {
  steps: OvsStep[];
  tone: (i: number) => string;
}) => {
  const slotRef = React.useRef<HTMLDivElement>(null);
  const width = useSlotWidth(slotRef);
  const wide = width === 0 || width >= 540;
  const reduceMotion = usePrefersReducedMotion();
  const [activeStep, setActiveStep] = React.useState(0);
  const stepRefs = React.useMemo(
    () => steps.map(() => React.createRef<HTMLButtonElement>()),
    [steps.length],
  );

  React.useEffect(() => {
    if (reduceMotion || steps.length <= 1) return;
    const id = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion, steps.length]);

  return (
    <div
      ref={slotRef}
      className="relative flex min-h-[210px] w-full flex-1 flex-col justify-center overflow-hidden"
    >
      <BeamConnection
        key={wide ? "wide" : "stacked"}
        background="particles"
        className="flex w-full flex-1 flex-col justify-center gap-5 py-1"
      >
        {({ containerRef, active }) => (
          <>
            <div
              className={cn(
                "relative z-2 grid gap-3",
                wide ? "grid-cols-4" : "grid-cols-2",
              )}
            >
              {steps.map((step, i) => {
                const isStageActive = activeStep === i;
                return (
                  <button
                    key={step.name}
                    type="button"
                    ref={stepRefs[i]}
                    onClick={() => setActiveStep(i)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                      padding: "14px",
                      borderRadius: "14px",
                      border: isStageActive
                        ? "1.5px solid var(--ovs-accent, #3d6a12)"
                        : "1px solid var(--ovs-line)",
                      backgroundColor: "var(--ovs-card)",
                      cursor: "pointer",
                      position: "relative",
                      zIndex: 2,
                      transition:
                        "border-color 240ms ease, transform 240ms ease",
                    }}
                  >
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
                      className="mt-3 text-sm leading-snug font-medium"
                      style={{ color: "var(--ovs-ink)" }}
                    >
                      {step.title}
                    </p>
                    <p
                      className="mt-1 text-[12.5px] tabular-nums"
                      style={{ color: "var(--ovs-ink2)" }}
                    >
                      {step.when}
                    </p>
                  </button>
                );
              })}
            </div>

            {steps.slice(0, -1).map((step, i) => (
              <ConnectionBeam
                key={`${step.name}-beam`}
                containerRef={containerRef}
                fromRef={stepRefs[i]}
                toRef={stepRefs[i + 1]}
                pathColor="var(--ovs-ink, #10150d)"
                pathOpacity={0.16}
                gradientStartColor="var(--ovs-accent, #3d6a12)"
                gradientStopColor="var(--ovs-soft, #c4dc52)"
                className="z-0"
                duration={3.4}
                delay={i * 0.7}
                active={active && !reduceMotion}
              />
            ))}

            <div className="relative z-2">
              <div className="flex gap-1.5" aria-hidden="true">
                {steps.map((step, i) => {
                  const isStageActive = activeStep === i;
                  return (
                    <button
                      key={`${step.name}-bar`}
                      type="button"
                      onClick={() => setActiveStep(i)}
                      aria-label={`Select ${step.name}`}
                      style={{
                        flex: weekSpan(step.when),
                        height: "8px",
                        borderRadius: "4px",
                        backgroundColor: tone(i),
                        opacity: isStageActive ? 1 : 0.48,
                        border: 0,
                        padding: 0,
                        cursor: "pointer",
                        transition: "opacity 240ms ease",
                      }}
                    />
                  );
                })}
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
          </>
        )}
      </BeamConnection>
    </div>
  );
};

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
      ? clientNames.slice(0, -1).join(", ") +
        " and " +
        clientNames[clientNames.length - 1]
      : clientNames.join("");

  const tone = (i: number) =>
    `color-mix(in oklab, var(--ovs-accent) ${STAGE_TONE[Math.min(i, STAGE_TONE.length - 1)]}%, var(--ovs-card))`;

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
            <div className="min-h-[368px]">
              <Card
                className="size-full min-h-0 overflow-hidden shadow-none"
                style={cardStyle}
              >
                <CardContent className="flex h-full min-h-0 flex-col justify-between gap-6">
                  <div
                    aria-hidden="true"
                    className="relative flex min-h-[210px] flex-1 items-center justify-center overflow-hidden"
                  >
                    <OutcomesIllustration stats={highlightStats} />
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <CardTitle
                      className="text-xl font-medium"
                      style={{ color: "var(--ovs-ink)" }}
                    >
                      Outcomes so far
                    </CardTitle>
                    <CardDescription
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ovs-ink2)" }}
                    >
                      Four new startup teams a quarter, each with senior
                      builders from day one.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stack and ownership */}
            <div className="min-h-[368px]">
              <Card
                className="size-full min-h-0 overflow-hidden shadow-none"
                style={cardStyle}
              >
                <CardContent className="flex h-full min-h-0 flex-col justify-between gap-6">
                  <div
                    aria-hidden="true"
                    className="relative flex min-h-[210px] flex-1 items-center justify-center overflow-hidden"
                  >
                    <StackIllustration />
                  </div>
                  <div className="flex shrink-0 flex-col gap-2">
                    <CardTitle
                      className="text-xl font-medium"
                      style={{ color: "var(--ovs-ink)" }}
                    >
                      Yours from day one
                    </CardTitle>
                    <CardDescription
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--ovs-ink2)" }}
                    >
                      Figma libraries, GitHub repos and design docs live in your
                      own workspace.
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Eight-week cadence */}
            <div className="min-h-[368px] lg:col-span-2">
              <Card
                className="size-full min-h-0 overflow-hidden shadow-none"
                style={cardStyle}
              >
                <CardContent className="flex h-full min-h-0 flex-col justify-between gap-6">
                  <CadenceIllustration steps={steps} tone={tone} />
                  <div className="flex shrink-0 flex-wrap items-end justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      <CardTitle
                        className="text-xl font-medium"
                        style={{ color: "var(--ovs-ink)" }}
                      >
                        Eight weeks from discovery to launch
                      </CardTitle>
                      <CardDescription
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--ovs-ink2)" }}
                      >
                        Seed, Sapling, Branch and Canopy — four clear sprints
                        from kickoff to live launch.
                      </CardDescription>
                    </div>
                    <button
                      type="button"
                      className="ovs-btn ovs-btn-dark"
                      onClick={book("bento")}
                    >
                      Book a 30-min call
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
