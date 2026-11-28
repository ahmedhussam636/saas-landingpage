"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Moon, SunMedium } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  BeamConnection,
  ConnectionBeam,
} from "@/components/shadcn-studio/illustrations/beam-connection";
import { cn } from "@/lib/utils";

export interface BentoThemeItem {
  name: string;
  tag: string;
  accent: string;
  soft: string;
}

const DEFAULT_CODLY_THEMES: BentoThemeItem[] = [
  {
    name: "Codly Summer",
    tag: "Canopy palette",
    accent: "#3d6a12",
    soft: "#c4dc52",
  },
  {
    name: "ScribeAI",
    tag: "AI clinical notes",
    accent: "#2d6a4f",
    soft: "#cfe3d8",
  },
  {
    name: "Salesive",
    tag: "AI sales coaching",
    accent: "#a5451a",
    soft: "#e9e2cf",
  },
  {
    name: "watchup",
    tag: "Field monitoring",
    accent: "#3b6598",
    soft: "#d4e0ee",
  },
  {
    name: "Venn",
    tag: "Shared finance",
    accent: "#8f4e7d",
    soft: "#e6d9e4",
  },
  {
    name: "Codly Night",
    tag: "Dark canopy",
    accent: "#0e1a10",
    soft: "#c4dc52",
  },
];

const WIDE_WIDTH = 320;

export const usePrefersReducedMotion = () => {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    setReduce(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
};

export const useSlotWidth = (ref: RefObject<HTMLElement | null>) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width)),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return width;
};

const ThemeToggleIllustration = ({
  wide,
  items,
  scheme = "light",
  onSchemeChange,
}: {
  wide: boolean;
  items: BentoThemeItem[];
  scheme?: "light" | "dark";
  onSchemeChange?: (next: "light" | "dark") => void;
}) => {
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const span3Ref = useRef<HTMLSpanElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <BeamConnection
      key={wide ? "wide" : "stacked"}
      background="particles"
      className={cn(
        "flex w-full max-w-118 flex-1 items-center gap-4",
        wide ? "justify-between" : "flex-col",
      )}
    >
      {({ containerRef, active }) => (
        <>
          <div className={cn("flex", wide ? "flex-col gap-15.5" : "gap-36.5")}>
            <button
              type="button"
              ref={div2Ref as unknown as RefObject<HTMLButtonElement>}
              onClick={() => onSchemeChange?.("light")}
              aria-label="Preview light theme"
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                border:
                  scheme === "light"
                    ? "2px solid var(--ovs-accent, #3d6a12)"
                    : "1px solid var(--ovs-line)",
                backgroundColor: "#ffffff",
                color: "#10150d",
                cursor: onSchemeChange ? "pointer" : "default",
                position: "relative",
                zIndex: 2,
              }}
            >
              <SunMedium className="size-5 shrink-0" />
            </button>

            <button
              type="button"
              ref={div3Ref as unknown as RefObject<HTMLButtonElement>}
              onClick={() => onSchemeChange?.("dark")}
              aria-label="Preview dark theme"
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "12px",
                border:
                  scheme === "dark"
                    ? "2px solid var(--ovs-soft, #c4dc52)"
                    : "1px solid rgba(255,255,255,0.16)",
                backgroundColor: "#0e1a10",
                color: "#f4f6f0",
                cursor: onSchemeChange ? "pointer" : "default",
                position: "relative",
                zIndex: 2,
              }}
            >
              <Moon className="size-5 shrink-0" />
            </button>
          </div>

          <div className={cn("flex", wide ? "flex-col gap-12.75" : "gap-23")}>
            <span ref={span1Ref} className="size-0.5" />
            <span ref={span2Ref} className="size-0.5" />
            <span ref={span3Ref} className="size-0.5" />
          </div>

          <div
            ref={div1Ref}
            className={cn("relative flex items-center", wide && "h-52.5")}
          >
            <Carousel
              opts={{
                align: "center",
                loop: true,
                slidesToScroll: 1,
              }}
              orientation="vertical"
              plugins={reduceMotion ? [] : [Autoplay({ delay: 2600, stopOnInteraction: false })]}
              className={cn("z-2", wide && "bg-card rounded-2xl")}
            >
              <CarouselContent
                className={cn("z-2 max-h-50 px-px", wide && "-mt-7")}
              >
                {items.map((theme) => (
                  <CarouselItem
                    key={theme.name}
                    className={cn(wide && "basis-1/2 pt-7")}
                  >
                    <div
                      className="bg-card flex items-center gap-3 rounded-xl border px-3 py-2.5"
                      style={{ borderColor: "var(--ovs-line)" }}
                    >
                      <div
                        className="size-7 shrink-0 rounded-lg border"
                        style={{
                          borderColor: "var(--ovs-line)",
                          background: `linear-gradient(90deg, ${theme.soft} 50%, ${theme.accent} 50%)`,
                        }}
                      />
                      <div className="flex min-w-0 flex-col text-left">
                        <span
                          className="text-sm font-medium whitespace-nowrap"
                          style={{ color: "var(--ovs-ink)" }}
                        >
                          {theme.name}
                        </span>
                        <span
                          className="text-xs whitespace-nowrap"
                          style={{ color: "var(--ovs-ink2)" }}
                        >
                          {theme.tag}
                        </span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {wide && (
                <div className="from-card pointer-events-none absolute inset-x-0 -top-2 h-[28%] bg-linear-to-b to-transparent" />
              )}
              <div className="from-card pointer-events-none absolute inset-x-0 -bottom-2 h-[28%] bg-linear-to-t to-transparent" />
            </Carousel>
          </div>

          {!wide && (
            <ConnectionBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={span2Ref}
              startYOffset={-80}
              pathColor="var(--ovs-ink, #10150d)"
              pathOpacity={0.16}
              gradientStartColor="var(--ovs-accent, #3d6a12)"
              gradientStopColor="var(--ovs-soft, #c4dc52)"
              className="z-0"
              duration={4}
              active={active && !reduceMotion}
            />
          )}
          {wide && (
            <ConnectionBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={span2Ref}
              pathColor="var(--ovs-ink, #10150d)"
              pathOpacity={0.16}
              gradientStartColor="var(--ovs-accent, #3d6a12)"
              gradientStopColor="var(--ovs-soft, #c4dc52)"
              className="z-0"
              duration={4}
              active={active && !reduceMotion}
            />
          )}
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
            reverse={!wide}
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
            toRef={div2Ref}
            reverse={!wide}
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
            fromRef={span3Ref}
            toRef={div3Ref}
            reverse={!wide}
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

export type BentoCardProps = {
  title: string;
  description: string;
  illustrationPosition?: "top" | "bottom";
  items?: BentoThemeItem[];
  scheme?: "light" | "dark";
  onSchemeChange?: (next: "light" | "dark") => void;
  className?: string;
};

const BentoCard = ({
  title,
  description,
  illustrationPosition = "top",
  items = DEFAULT_CODLY_THEMES,
  scheme = "light",
  onSchemeChange,
  className,
}: BentoCardProps) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const width = useSlotWidth(slotRef);
  const wide = width === 0 || width >= WIDE_WIDTH;

  const illustrationSlot = (
    <div
      ref={slotRef}
      aria-hidden="true"
      className={cn(
        "relative flex min-h-[210px] flex-1 justify-center overflow-hidden",
        wide ? "items-center" : "items-start",
      )}
    >
      <ThemeToggleIllustration
        wide={wide}
        items={items}
        scheme={scheme}
        onSchemeChange={onSchemeChange}
      />
      {!wide && (
        <div
          className={cn(
            "from-card pointer-events-none absolute inset-x-0 z-10 h-12 to-transparent",
            illustrationPosition === "top"
              ? "bottom-0 bg-linear-to-t"
              : "top-0 bg-linear-to-b",
          )}
        />
      )}
    </div>
  );

  return (
    <Card
      className={cn("size-full min-h-0 overflow-hidden shadow-none", className)}
      style={{
        borderColor: "var(--ovs-line)",
        backgroundColor: "var(--ovs-card)",
      }}
    >
      <CardContent className="flex h-full min-h-0 flex-col justify-between gap-6">
        {illustrationPosition === "top" && illustrationSlot}
        <div className="flex shrink-0 flex-col gap-2">
          <CardTitle
            className="text-xl font-medium"
            style={{ color: "var(--ovs-ink)" }}
          >
            {title}
          </CardTitle>
          <CardDescription
            className="text-sm leading-relaxed"
            style={{ color: "var(--ovs-ink2)" }}
          >
            {description}
          </CardDescription>
        </div>
        {illustrationPosition === "bottom" && illustrationSlot}
      </CardContent>
    </Card>
  );
};

export default BentoCard;
