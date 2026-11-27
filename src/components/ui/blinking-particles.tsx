"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BlinkingParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
  blinkSpeed?: number;
  minOpacity?: number;
  edgeBias?: number;
}

function hexToRgb(hex: string): number[] {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const hexInt = parseInt(cleanHex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

type Circle = {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  homeX: number;
  homeY: number;
  magnetism: number;
  blinkSpeed: number;
  blinkOffset: number;
};

export const BlinkingParticles: React.FC<BlinkingParticlesProps> = ({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  size = 0.8,
  refresh = false,
  color = "#808080",
  vx = 0,
  vy = 0,
  blinkSpeed = 1,
  minOpacity = 0.15,
  edgeBias = 0,
  ...props
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const cellQueue = useRef<{ x: number; y: number }[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    rafID.current = window.requestAnimationFrame(animate);

    const handleResize = () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = setTimeout(() => {
        initCanvas();
      }, 200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      if (rafID.current != null) {
        window.cancelAnimationFrame(rafID.current);
      }
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  useEffect(() => {
    initCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.setTransform(1, 0, 0, 1, 0, 0);
      context.current.scale(dpr, dpr);
      circles.current = [];
      cellQueue.current = [];
      for (let i = 0; i < quantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };

  const CELL_JITTER_RATIO = 0.8;
  const EDGE_PULL_RATIO = 0.35;

  const buildCellQueue = (): { x: number; y: number }[] => {
    const { w, h } = canvasSize.current;
    if (w <= 0 || h <= 0) {
      return [{ x: 0, y: 0 }];
    }
    const cols = Math.max(1, Math.round(Math.sqrt(quantity * (w / h))));
    const rows = Math.max(1, Math.ceil(quantity / cols));
    const cellW = w / cols;
    const cellH = h / rows;
    const centerX = w / 2;
    const centerY = h / 2;
    const cells: { col: number; row: number }[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        cells.push({ col, row });
      }
    }

    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    return cells.slice(0, quantity).map(({ col, row }) => {
      const cellCenterX = col * cellW + cellW / 2;
      const cellCenterY = row * cellH + cellH / 2;
      const dirX = cellCenterX - centerX;
      const dirY = cellCenterY - centerY;
      const dirLength = Math.sqrt(dirX ** 2 + dirY ** 2) || 1;
      const outwardX = dirX / dirLength;
      const outwardY = dirY / dirLength;
      const jitterX = (Math.random() - 0.5) * cellW * CELL_JITTER_RATIO;
      const jitterY = (Math.random() - 0.5) * cellH * CELL_JITTER_RATIO;
      const pullX = outwardX * edgeBias * cellW * EDGE_PULL_RATIO;
      const pullY = outwardY * edgeBias * cellH * EDGE_PULL_RATIO;
      return {
        x: cellCenterX + jitterX + pullX,
        y: cellCenterY + jitterY + pullY,
      };
    });
  };

  const getGridSlot = () => {
    if (cellQueue.current.length === 0) {
      cellQueue.current = buildCellQueue();
    }
    return (
      cellQueue.current.pop() ?? {
        x: canvasSize.current.w / 2,
        y: canvasSize.current.h / 2,
      }
    );
  };

  const circleParams = (): Circle => {
    const gridSlot = getGridSlot();
    const x = Math.floor(gridSlot.x);
    const y = Math.floor(gridSlot.y);
    const pSize = size + Math.random() * size;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const magnetism = 0.1 + Math.random() * 4;
    const particleBlinkSpeed = (0.0008 + Math.random() * 0.001) * blinkSpeed;
    const blinkOffset = Math.random() * Math.PI * 2;
    return {
      x,
      y,
      translateX: 0,
      translateY: 0,
      size: pSize,
      alpha: 0,
      targetAlpha,
      homeX: x,
      homeY: y,
      magnetism,
      blinkSpeed: particleBlinkSpeed,
      blinkOffset,
    };
  };

  const rgb = hexToRgb(color);
  const drawCircle = (
    circle: Circle,
    update = false,
    renderAlpha?: number,
  ) => {
    if (context.current) {
      const { x, y, translateX, translateY, size: r } = circle;
      const alpha = renderAlpha ?? circle.alpha;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, r, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = (timestamp: number) => {
    if (startTime.current === null) {
      startTime.current = timestamp;
    }
    const elapsed = timestamp - startTime.current;
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.homeX += vx;
      circle.homeY += vy;
      circle.x += (circle.homeX - circle.x) * 0.02 + (Math.random() - 0.5) * 0.25;
      circle.y += (circle.homeY - circle.y) * 0.02 + (Math.random() - 0.5) * 0.25;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;
      const blink =
        minOpacity +
        (1 - minOpacity) *
          ((Math.sin(elapsed * circle.blinkSpeed + circle.blinkOffset) + 1) / 2);
      drawCircle(circle, true, circle.alpha * blink);
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    rafID.current = window.requestAnimationFrame(animate);
  };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 size-full", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
