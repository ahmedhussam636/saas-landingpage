"use client";

import { gsap } from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Minus, Plus, RotateCcw, Users } from "lucide-react";

const CROWD_SPRITE_SRC =
  "https://cdn.21st.dev/assets/localized/abdb8990a7bef8c2f5af3e45f0a3c969c4b0603fba8be92e81347de4ea4e1ed7.png";
const STORAGE_COUNT_KEY = "codly_crowd_count";
const STORAGE_JOINED_KEY = "codly_crowd_joined";
const DEFAULT_CROWD_COUNT = 3;
const MIN_CROWD_COUNT = 0;
const MAX_CROWD_COUNT = 105;

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  count?: number;
}

const CrowdCanvas = ({
  src,
  rows = 15,
  cols = 7,
  count = DEFAULT_CROWD_COUNT,
}: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef(count);
  const syncCountRef = useRef<((nextCount: number) => void) | null>(null);

  countRef.current = count;

  useEffect(() => {
    syncCountRef.current?.(count);
  }, [count]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;
    const config = {
      src,
      rows,
      cols,
    };

    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => randomRange(0, array.length) | 0;
    const removeFromArray = <T,>(array: T[], i: number): T =>
      array.splice(i, 1)[0];
    const removeItemFromArray = <T,>(array: T[], item: T): T =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = <T,>(array: T[]): T =>
      removeFromArray(array, randomIndex(array));

    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: [
        HTMLImageElement,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
      ];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: gsap.core.Timeline | null;
      setRect: (rect: number[]) => void;
      render: (context: CanvasRenderingContext2D, scale: number) => void;
    };

    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const getDisplayScale = (peepHeight: number) => {
      if (stage.height <= 0 || peepHeight <= 0) return 1;
      const targetHeight = stage.height * (stage.width < 640 ? 0.38 : 0.44);
      return Math.min(1, targetHeight / peepHeight);
    };

    const resetPeep = ({
      stage: st,
      peep,
    }: {
      stage: { width: number; height: number };
      peep: Peep;
    }) => {
      const displayScale = getDisplayScale(peep.height);
      const drawnH = peep.height * displayScale;
      const drawnW = peep.width * displayScale;
      const direction = Math.random() > 0.5 ? 1 : -1;
      const minTop = st.height * (st.width < 640 ? 0.54 : 0.48);
      const bottomY = Math.max(minTop, st.height - drawnH);
      const depthBand = Math.max(6, Math.min(28, bottomY - minTop));
      const offsetY = depthBand * gsap.parseEase("power2.in")(Math.random());
      const startY = Math.max(minTop, bottomY - offsetY);
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -drawnW;
        endX = st.width + drawnW;
        peep.scaleX = 1;
      } else {
        startX = st.width + drawnW;
        endX = -drawnW;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({
      peep,
      props,
    }: {
      peep: Peep;
      props: { startX: number; startY: number; endX: number };
    }) => {
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.55, 1.35));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0,
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: Math.floor(xDuration / yDuration),
          yoyo: true,
          y: startY - 7,
        },
        0,
      );

      return tl;
    };

    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [image, 0, 0, 0, 0, 0, 0, 0, 0],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (nextRect: number[]) => {
          peep.rect = nextRect;
          peep.width = nextRect[2];
          peep.height = nextRect[3];
          peep.drawArgs = [
            peep.image,
            nextRect[0],
            nextRect[1],
            nextRect[2],
            nextRect[3],
            0,
            0,
            peep.width,
            peep.height,
          ];
        },
        render: (context: CanvasRenderingContext2D, scale: number) => {
          context.save();
          context.translate(peep.x, peep.y);
          context.scale(peep.scaleX * scale, scale);
          context.drawImage(...peep.drawArgs);
          context.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    const img = document.createElement("img");

    const addPeepToCrowd = (randomStart = false): Peep | null => {
      if (!availablePeeps.length || stage.width <= 0) return null;
      const peep = removeRandomFromArray(availablePeeps);
      const walk = normalWalk({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        if (!alive) return;
        removePeepFromCrowd(peep);
        addPeepToCrowd(false);
      });

      peep.walk = walk;
      if (randomStart) {
        walk.progress(randomRange(0.12, 0.85));
      }

      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      if (crowd.includes(peep)) {
        removeItemFromArray(crowd, peep);
      }
      if (!availablePeeps.includes(peep)) {
        availablePeeps.push(peep);
      }
    };

    const syncCrowdCount = (target: number) => {
      if (!alive || !allPeeps.length || stage.width <= 0) return;
      const clamped = Math.max(0, Math.min(target, allPeeps.length));
      while (crowd.length < clamped && availablePeeps.length > 0) {
        addPeepToCrowd(false);
      }
      while (crowd.length > clamped && crowd.length > 0) {
        const removed = crowd.pop();
        if (removed) {
          removed.walk?.kill();
          removed.walk = null;
          if (!availablePeeps.includes(removed)) {
            availablePeeps.push(removed);
          }
        }
      }
    };

    syncCountRef.current = syncCrowdCount;

    const createPeeps = () => {
      const { rows: r, cols: c } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      if (!width || !height) return;
      const total = r * c;
      const rectWidth = width / r;
      const rectHeight = height / c;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % r) * rectWidth,
              ((i / r) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          }),
        );
      }
    };

    const initCrowd = () => {
      const initial = Math.max(
        0,
        Math.min(countRef.current, availablePeeps.length),
      );
      for (let i = 0; i < initial; i++) {
        addPeepToCrowd(true);
      }
    };

    const resize = () => {
      if (!alive) return;
      const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 0;
      const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 0;
      if (w <= 0 || h <= 0) return;

      stage.width = w;
      stage.height = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(stage.width * dpr);
      canvas.height = Math.floor(stage.height * dpr);

      crowd.forEach((peep) => {
        peep.walk?.kill();
        peep.walk = null;
      });
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      if (allPeeps.length) {
        initCrowd();
      }
    };

    const render = () => {
      if (!alive || stage.width <= 0 || stage.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      for (let i = 0; i < crowd.length; i++) {
        const peep = crowd[i];
        peep.render(ctx, getDisplayScale(peep.height));
      }

      ctx.restore();
    };

    const onLoad = () => {
      if (!alive) return;
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = onLoad;
    img.src = config.src;

    window.addEventListener("resize", resize);

    return () => {
      alive = false;
      syncCountRef.current = null;
      img.onload = null;
      window.removeEventListener("resize", resize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        peep.walk?.kill();
        peep.walk = null;
      });
      crowd.length = 0;
      availablePeeps.length = 0;
      allPeeps.length = 0;
    };
  }, [src, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      className="block h-full w-full"
      aria-label={`Animated crowd of ${count} community members walking`}
    />
  );
};

interface Skiper39Props {
  uid?: string;
}

const controlBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "36px",
  minWidth: "36px",
  padding: "0 12px",
  borderRadius: "999px",
  border: "1px solid var(--ovs-line)",
  backgroundColor: "var(--ovs-card)",
  color: "var(--ovs-ink)",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "transform 160ms ease, opacity 160ms ease",
};

const Skiper39 = ({ uid = "crowd" }: Skiper39Props) => {
  const [crowdCount, setCrowdCount] = useState<number>(() => {
    if (typeof window === "undefined") return DEFAULT_CROWD_COUNT;
    try {
      const saved = window.localStorage.getItem(STORAGE_COUNT_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!Number.isNaN(parsed) && parsed >= MIN_CROWD_COUNT) {
          return Math.min(parsed, MAX_CROWD_COUNT);
        }
      }
    } catch {
      // ignore storage issues
    }
    return DEFAULT_CROWD_COUNT;
  });

  const updateCount = (updater: (prev: number) => number) => {
    setCrowdCount((prev) => {
      const next = Math.max(
        MIN_CROWD_COUNT,
        Math.min(MAX_CROWD_COUNT, updater(prev)),
      );
      try {
        window.localStorage.setItem(STORAGE_COUNT_KEY, String(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  // Dynamic counter that increments once from 3 when a new user mounts the component
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(STORAGE_JOINED_KEY) === "true") return;
    } catch {
      // ignore
    }

    const timer = window.setTimeout(() => {
      updateCount((prev) => prev + 1);
      try {
        window.localStorage.setItem(STORAGE_JOINED_KEY, "true");
      } catch {
        // ignore
      }
    }, 550);

    return () => window.clearTimeout(timer);
  }, []);

  const handleReset = () => {
    try {
      window.localStorage.setItem(STORAGE_COUNT_KEY, String(DEFAULT_CROWD_COUNT));
      window.localStorage.removeItem(STORAGE_JOINED_KEY);
    } catch {
      // ignore
    }
    setCrowdCount(DEFAULT_CROWD_COUNT);
  };

  return (
    <section
      className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t pt-16 pb-0 sm:pt-20"
      style={{
        borderColor: "var(--ovs-line)",
        background:
          "linear-gradient(180deg, var(--ovs-card) 0%, color-mix(in oklab, var(--ovs-ink) 4%, var(--ovs-paper)) 100%)",
      }}
      data-sec="crowd"
      aria-labelledby={uid + "crowd-h"}
    >
      <div className="relative flex h-[450px] w-full flex-col items-center overflow-hidden sm:h-[470px] lg:h-[500px]">
        {/* Text overlay above the canvas */}
        <div className="pointer-events-none relative z-10 flex w-full max-w-3xl flex-col items-center px-5 pt-2 text-center sm:px-8 sm:pt-4">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 14px",
              borderRadius: "999px",
              border: "1px solid var(--ovs-line)",
              backgroundColor: "var(--ovs-paper)",
              color: "var(--ovs-ink2)",
              fontSize: "12.5px",
              fontWeight: 600,
            }}
          >
            <Users
              className="size-3.5"
              style={{ color: "var(--ovs-accent)" }}
            />
            <span className="tabular-nums">
              {crowdCount} {crowdCount === 1 ? "member" : "members"} active
            </span>
          </div>

          <h2
            id={uid + "crowd-h"}
            style={{
              marginTop: "14px",
              fontSize: "clamp(28px, 3.8vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              fontWeight: 500,
              color: "var(--ovs-ink)",
            }}
          >
            Join our community
          </h2>

          <p
            style={{
              marginTop: "10px",
              maxWidth: "46ch",
              fontSize: "clamp(14px, 1.15vw, 16px)",
              lineHeight: 1.5,
              color: "var(--ovs-ink2)",
            }}
          >
            Watch the crowd grow from 3 as new builders arrive — adjust the walk
            or reset anytime.
          </p>

          {/* Full control bar */}
          <div className="pointer-events-auto mt-4 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => updateCount((prev) => prev - 1)}
              disabled={crowdCount <= MIN_CROWD_COUNT}
              aria-label="Remove one person"
              style={{
                ...controlBtnStyle,
                padding: "0 10px",
                opacity: crowdCount <= MIN_CROWD_COUNT ? 0.45 : 1,
                cursor:
                  crowdCount <= MIN_CROWD_COUNT ? "not-allowed" : "pointer",
              }}
            >
              <Minus className="size-3.5" />
            </button>

            <input
              type="number"
              min={MIN_CROWD_COUNT}
              max={MAX_CROWD_COUNT}
              value={crowdCount}
              aria-label="Number of people in the crowd"
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                updateCount(() => (Number.isNaN(val) ? 0 : val));
              }}
              style={{
                height: "36px",
                width: "68px",
                padding: "0 10px",
                borderRadius: "999px",
                border: "1px solid transparent",
                backgroundColor: "var(--ovs-soft, #c4dc52)",
                color: "#10150d",
                fontSize: "13.5px",
                fontWeight: 700,
                textAlign: "center",
                outline: "none",
              }}
              className="tabular-nums"
            />

            <button
              type="button"
              onClick={() => updateCount((prev) => prev + 1)}
              disabled={crowdCount >= MAX_CROWD_COUNT}
              aria-label="Add one person"
              style={{
                ...controlBtnStyle,
                padding: "0 10px",
                opacity: crowdCount >= MAX_CROWD_COUNT ? 0.45 : 1,
                cursor:
                  crowdCount >= MAX_CROWD_COUNT ? "not-allowed" : "pointer",
              }}
            >
              <Plus className="size-3.5" />
            </button>

            <button
              type="button"
              onClick={() => updateCount((prev) => prev + 5)}
              disabled={crowdCount >= MAX_CROWD_COUNT}
              style={{
                ...controlBtnStyle,
                opacity: crowdCount >= MAX_CROWD_COUNT ? 0.45 : 1,
                cursor:
                  crowdCount >= MAX_CROWD_COUNT ? "not-allowed" : "pointer",
              }}
            >
              +5
            </button>

            <button
              type="button"
              onClick={handleReset}
              style={{
                ...controlBtnStyle,
                gap: "6px",
              }}
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Full-screen-width canvas */}
        <div className="pointer-events-none absolute inset-0 w-full">
          <CrowdCanvas
            src={CROWD_SPRITE_SRC}
            rows={15}
            cols={7}
            count={crowdCount}
          />
        </div>
      </div>
    </section>
  );
};

export { CrowdCanvas, Skiper39 };
export default Skiper39;
