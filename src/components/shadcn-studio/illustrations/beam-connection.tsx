"use client";

import * as React from "react";
import { useAnimate } from "motion/react";
import { IllustrationsBackground } from "@/components/shadcn-studio/illustrations/illustrations-background";
import { cn } from "@/lib/utils";

type Curvature = number | [number, number];

export type BeamPathBuilder = (
  start: { x: number; y: number },
  end: { x: number; y: number },
) => string;

const getAmbientRotationInverse = (container: HTMLElement) => {
  const transform = getComputedStyle(container).transform;
  if (!transform || transform === "none") return null;
  try {
    const { m11, m12, m21, m22 } = new DOMMatrix(transform);
    const det = m11 * m22 - m21 * m12;
    if (!det) return null;
    return (x: number, y: number) => ({
      x: (m22 * x - m21 * y) / det,
      y: (-m12 * x + m11 * y) / det,
    });
  } catch {
    return null;
  }
};

export interface ConnectionBeamProps {
  className?: string;
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  pathType?: "solid" | "dashed";
  pathDash?: number | string;
  curvature?: Curvature;
  bendAt?: number;
  pathBuilder?: BeamPathBuilder;
  restartKey?: string | number;
  beamType?: "gradient" | "dot" | "dash" | "none";
  beamColor?: string;
  beamSize?: number;
  beamCount?: number;
  dashGap?: number;
  seamless?: boolean;
  gradientStartColor?: string;
  gradientStopColor?: string;
  duration?: number;
  speed?: number;
  delay?: number;
  travelRatio?: number;
  reverse?: boolean;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  active?: boolean;
  visible?: boolean;
  onMeasure?: (info: {
    pathLength: number;
    duration: number;
    travelRatio: number;
  }) => void;
}

interface BeamPlayback {
  time: number;
  play: () => void;
  pause: () => void;
  stop: () => void;
}

export const ConnectionBeam = (props: ConnectionBeamProps) => {
  const {
    className,
    containerRef,
    fromRef,
    toRef,
    pathColor = "currentColor",
    pathWidth = 1.25,
    pathOpacity = 0.2,
    pathType = "solid",
    pathDash = 4,
    curvature = 0,
    bendAt = 0.5,
    pathBuilder,
    restartKey,
    beamType = "gradient",
    beamColor = "var(--ovs-soft, #c4dc52)",
    beamSize,
    beamCount = 1,
    dashGap,
    seamless = false,
    gradientStartColor = "var(--ovs-accent, #3d6a12)",
    gradientStopColor = "var(--ovs-soft, #c4dc52)",
    duration,
    speed,
    delay = 0,
    reverse = false,
    startXOffset = 0,
    startYOffset = 0,
    endXOffset = 0,
    endYOffset = 0,
    active = true,
    visible = true,
    onMeasure,
  } = props;

  const id = React.useId();
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const pathRef = React.useRef<SVGPathElement>(null);
  const gradientRef = React.useRef<SVGLinearGradientElement>(null);
  const gradientPlaybackRef = React.useRef<BeamPlayback | null>(null);
  const [pathD, setPathD] = React.useState("");
  const [pathLength, setPathLength] = React.useState(0);
  const [svgDimensions, setSvgDimensions] = React.useState({
    width: 0,
    height: 0,
  });
  const [startBend, endBend] = Array.isArray(curvature)
    ? curvature
    : [curvature, curvature];

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  React.useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const container = containerRef.current;
        setSvgDimensions({
          width: container.offsetWidth,
          height: container.offsetHeight,
        });
        const containerRect = container.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        const containerCenterX = containerRect.left + containerRect.width / 2;
        const containerCenterY = containerRect.top + containerRect.height / 2;
        let startX = rectA.left + rectA.width / 2 - containerCenterX;
        let startY = rectA.top + rectA.height / 2 - containerCenterY;
        let endX = rectB.left + rectB.width / 2 - containerCenterX;
        let endY = rectB.top + rectB.height / 2 - containerCenterY;

        const inverse = getAmbientRotationInverse(container);
        if (inverse) {
          const start = inverse(startX, startY);
          const end = inverse(endX, endY);
          startX = start.x;
          startY = start.y;
          endX = end.x;
          endY = end.y;
        }

        startX += container.offsetWidth / 2 + startXOffset;
        startY += container.offsetHeight / 2 + startYOffset;
        endX += container.offsetWidth / 2 + endXOffset;
        endY += container.offsetHeight / 2 + endYOffset;

        if (pathBuilder) {
          setPathD(
            pathBuilder({ x: startX, y: startY }, { x: endX, y: endY }),
          );
          return;
        }

        const dx = endX - startX;
        const dy = endY - startY;
        const c1x = startX + dx * bendAt;
        const c1y = startY + dy * bendAt - startBend;
        const c2x = endX - dx * bendAt;
        const c2y = endY - dy * bendAt - endBend;
        setPathD(
          `M ${startX},${startY} C ${c1x},${c1y} ${c2x},${c2y} ${endX},${endY}`,
        );
      }
    };

    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    updatePath();
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    startBend,
    endBend,
    bendAt,
    pathBuilder,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  React.useEffect(() => {
    if (pathRef.current && pathD) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  const durationRef = React.useRef(duration ?? Math.random() * 3 + 4);
  const resolvedDuration = React.useMemo(() => {
    if (duration !== undefined) return duration;
    if (speed !== undefined && pathLength > 0) return pathLength / speed;
    return durationRef.current;
  }, [duration, speed, pathLength]);

  const dashTravelRatio =
    speed === undefined || pathLength === 0
      ? 1
      : Math.min(1, Math.max(0.02, pathLength / speed / resolvedDuration));

  const onMeasureRef = React.useRef(onMeasure);
  onMeasureRef.current = onMeasure;
  React.useEffect(() => {
    if (pathLength > 0) {
      onMeasureRef.current?.({
        pathLength,
        duration: resolvedDuration,
        travelRatio: dashTravelRatio,
      });
    }
  }, [pathLength, resolvedDuration, dashTravelRatio]);

  const hasSyncedClockRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      hasSyncedClockRef.current = false;
      return;
    }
    if (beamType === "dot" && pathLength > 0 && !hasSyncedClockRef.current) {
      scope.current?.setCurrentTime(0);
      hasSyncedClockRef.current = true;
    }
  }, [active, beamType, pathLength, scope]);

  const travellerSize = beamSize ?? 3;

  React.useEffect(() => {
    if (beamType !== "gradient" || !gradientRef.current) return;
    const playback = animate(
      gradientRef.current,
      {
        x1: gradientCoordinates.x1,
        x2: gradientCoordinates.x2,
        y1: gradientCoordinates.y1,
        y2: gradientCoordinates.y2,
      },
      {
        delay,
        duration: resolvedDuration,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 0,
      },
    );
    if (!active) playback.pause();
    gradientPlaybackRef.current = playback as unknown as BeamPlayback;
    return () => playback.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beamType, reverse, resolvedDuration, delay, animate]);

  React.useEffect(() => {
    const playback = gradientPlaybackRef.current;
    if (!playback) return;
    if (active) playback.play();
    else playback.pause();
  }, [active]);

  const dotRevealKeyframeName = `beam-dot-reveal-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const dotTravellers = pathLength > 0 && beamType === "dot" && active && (
    <>
      <style>{`@keyframes ${dotRevealKeyframeName} { to { opacity: 1; } }`}</style>
      {Array.from({ length: Math.max(1, beamCount) }, (_, index) => {
        const begin =
          delay + (index * resolvedDuration) / Math.max(1, beamCount);
        const hasHold = dashTravelRatio < 1;
        const [from, to] = reverse ? ["1", "0"] : ["0", "1"];
        const motionProps = {
          dur: `${resolvedDuration}s`,
          begin: `${begin}s`,
          repeatCount: "indefinite",
          path: pathD,
          ...(reverse || hasHold
            ? {
                keyPoints: hasHold
                  ? `${from};${to};${to}`
                  : `${from};${to}`,
                keyTimes: hasHold ? `0;${dashTravelRatio};1` : "0;1",
                calcMode: "linear",
              }
            : {}),
        };
        return (
          <g
            key={index}
            fill={beamColor}
            style={{
              opacity: 0,
              animation: `${dotRevealKeyframeName} 0.01s linear ${Math.max(0, begin)}s forwards`,
            }}
          >
            <circle r={travellerSize * 2} fillOpacity={0.15}>
              <animateMotion {...motionProps} />
            </circle>
            <circle r={travellerSize}>
              <animateMotion {...motionProps} />
            </circle>
          </g>
        );
      })}
    </>
  );

  const dashChunkLength =
    beamSize ?? Math.min(pathLength * 0.4, Math.max(12, pathLength * 0.12));
  const seamMargin = seamless ? 2 : 0;
  const dashGapLength = seamless
    ? pathLength + seamMargin * 2
    : (dashGap ?? Math.max(1, pathLength - dashChunkLength));
  const dashPatternPeriod =
    dashGap !== undefined || seamless
      ? dashChunkLength + dashGapLength
      : pathLength;
  const dashStartOffset = seamless
    ? dashChunkLength + seamMargin
    : dashPatternPeriod;
  const dashEndOffset = seamless ? -(pathLength + seamMargin) : 0;
  const dashFromOffset = reverse ? dashEndOffset : dashStartOffset;
  const dashToOffset = reverse ? dashStartOffset : dashEndOffset;
  const dashKeyframeName = `beam-dash-relay-${id.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const dashTravellers = pathLength > 0 && beamType === "dash" && active && (
    <>
      <style>{`@keyframes ${dashKeyframeName} { 0% { stroke-dashoffset: ${dashFromOffset}; } ${(dashTravelRatio * 100).toFixed(3)}% { stroke-dashoffset: ${dashToOffset}; } 100% { stroke-dashoffset: ${dashToOffset}; } }`}</style>
      {Array.from({ length: Math.max(1, beamCount) }, (_, index) => {
        const dashDelay =
          delay + (index * resolvedDuration) / Math.max(1, beamCount);
        return (
          <path
            key={`${index}-${restartKey ?? ""}`}
            d={pathD}
            stroke={beamColor}
            strokeWidth={Math.max(1, pathWidth + 0.5)}
            strokeLinecap="round"
            strokeDasharray={`${dashChunkLength} ${dashGapLength}`}
            style={{
              animationName: dashKeyframeName,
              animationDuration: `${resolvedDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${dashDelay}s`,
            }}
          />
        );
      })}
    </>
  );

  return (
    <svg
      ref={scope}
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className,
      )}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        ref={pathRef}
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        strokeDasharray={pathType === "dashed" ? pathDash : undefined}
      />
      <g
        className={cn(
          "transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        {beamType === "gradient" && (
          <path
            d={pathD}
            stroke={`url(#${id})`}
            strokeWidth={pathWidth}
            strokeOpacity="1"
            strokeLinecap="round"
          />
        )}
        {dotTravellers}
        {dashTravellers}
      </g>
      {beamType === "gradient" && (
        <defs>
          <linearGradient
            ref={gradientRef}
            className="transform-gpu"
            id={id}
            gradientUnits="userSpaceOnUse"
            x1="0%"
            x2="0%"
            y1="0%"
            y2="0%"
          >
            <stop stopColor={gradientStartColor} stopOpacity="0" />
            <stop stopColor={gradientStartColor} />
            <stop offset="32.5%" stopColor={gradientStopColor} />
            <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
    </svg>
  );
};

export interface BeamLine
  extends Omit<
    ConnectionBeamProps,
    "containerRef" | "fromRef" | "toRef" | "active"
  > {
  from: number;
  to?: number;
}

export interface BeamConnectionRenderProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
  visible: boolean;
}

export interface BeamConnectionProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  sources?: React.ReactNode[];
  target?: React.ReactNode;
  beams?: BeamLine[];
  background?: "ripple" | "gradient" | "particles" | "grid" | "none";
  layout?: "horizontal" | "vertical";
  nodeClassName?: string;
  targetClassName?: string;
  isometric?: boolean;
  trigger?: "default" | "beam" | "hover";
  children?:
    | React.ReactNode
    | ((render: BeamConnectionRenderProps) => React.ReactNode);
  pathColor?: ConnectionBeamProps["pathColor"];
  pathWidth?: ConnectionBeamProps["pathWidth"];
  pathOpacity?: ConnectionBeamProps["pathOpacity"];
  pathType?: ConnectionBeamProps["pathType"];
  beamType?: ConnectionBeamProps["beamType"];
  beamColor?: ConnectionBeamProps["beamColor"];
  beamSize?: ConnectionBeamProps["beamSize"];
  beamCount?: ConnectionBeamProps["beamCount"];
  curvature?: ConnectionBeamProps["curvature"];
  bendAt?: ConnectionBeamProps["bendAt"];
  duration?: ConnectionBeamProps["duration"];
  speed?: ConnectionBeamProps["speed"];
  delay?: ConnectionBeamProps["delay"];
  reverse?: ConnectionBeamProps["reverse"];
}

export const BeamConnection = React.forwardRef<
  HTMLDivElement,
  BeamConnectionProps
>((props, forwardedRef) => {
  const {
    sources,
    target,
    beams,
    background = "none",
    layout = "horizontal",
    nodeClassName,
    targetClassName,
    isometric = false,
    trigger = "beam",
    className,
    style,
    children,
    pathColor,
    pathWidth,
    pathOpacity,
    pathType,
    beamType,
    beamColor,
    beamSize,
    beamCount,
    curvature,
    bendAt,
    duration,
    speed,
    delay,
    reverse,
    ...rest
  } = props;

  const isCustomLayout = sources === undefined && target === undefined;
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = React.useState(false);

  const active = trigger !== "default";
  const visible = trigger === "hover" ? isHovering : active;

  const sourceRefs = React.useMemo(
    () => (sources ?? []).map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sources?.length],
  );
  const targetRef = React.useRef<HTMLDivElement>(null);

  const sharedBeamProps = {
    pathColor,
    pathWidth,
    pathOpacity,
    pathType,
    beamType,
    beamColor,
    beamSize,
    beamCount,
    curvature,
    bendAt,
    duration,
    speed,
    delay,
    reverse,
    active,
    visible,
  };

  const resolvedBeams: BeamLine[] = isCustomLayout
    ? []
    : (beams ?? (sources ?? []).map((_, index) => ({ from: index })));

  return (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      }}
      style={{
        ...style,
        ...(isometric && { transform: "rotateX(45deg) rotateZ(-45deg)" }),
      }}
      className={cn(
        "relative",
        !isCustomLayout && [
          "flex items-center justify-between gap-5",
          { "flex-col": layout === "vertical" },
        ],
        className,
      )}
      onMouseEnter={() => trigger === "hover" && setIsHovering(true)}
      onMouseLeave={() => trigger === "hover" && setIsHovering(false)}
      {...rest}
    >
      <IllustrationsBackground background={background} />
      {isCustomLayout ? (
        typeof children === "function" ? (
          children({ containerRef, active, visible })
        ) : (
          children
        )
      ) : (
        <>
          <div
            className={cn(
              "z-1 flex gap-4",
              layout === "vertical" ? "flex-row" : "flex-col",
            )}
          >
            {sources?.map((source, index) => (
              <div
                key={index}
                ref={sourceRefs[index]}
                className={cn(
                  "bg-background grid size-10 place-content-center rounded-xl border p-2 shadow-sm",
                  nodeClassName,
                )}
              >
                {source}
              </div>
            ))}
          </div>
          <div
            ref={targetRef}
            className={cn(
              "bg-background z-1 grid place-content-center rounded-xl border shadow-sm",
              targetClassName,
            )}
          >
            {target}
          </div>
          {resolvedBeams.map((beam, index) => {
            const { from, to, ...beamOverrides } = beam;
            const fromRef = sourceRefs[from];
            if (!fromRef) return null;
            const toRef =
              to === undefined ? targetRef : (sourceRefs[to] ?? targetRef);
            return (
              <ConnectionBeam
                key={index}
                containerRef={containerRef}
                fromRef={fromRef}
                toRef={toRef}
                {...sharedBeamProps}
                {...beamOverrides}
              />
            );
          })}
          {typeof children !== "function" ? children : null}
        </>
      )}
    </div>
  );
});

BeamConnection.displayName = "BeamConnection";
