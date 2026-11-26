import * as React from "react"
import type { OvsLeaf, OvsPalette, OvsPlan, OvsSeason, OvsTwig, Rgb } from "./types"
import { LAYERS, SEASONS, SKIES } from "./defaults"

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a), 0, 1)
  return t * t * (3 - 2 * t)
}

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const hash = (n: number) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

export function noise2(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const h = (i: number, j: number) => hash(i * 57.0 + j * 131.0)
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  return lerp(lerp(h(xi, yi), h(xi + 1, yi), u), lerp(h(xi, yi + 1), h(xi + 1, yi + 1), u), v)
}

export function fbm(x: number, y: number) {
  let s = 0
  let a = 0.5
  let f = 1
  for (let i = 0; i < 5; i++) {
    s += a * noise2(x * f, y * f)
    f *= 2.03
    a *= 0.5
  }
  return s / 0.96875
}

/** The radii of the box ellipse the canopy is measured in. Phones get a taller hole. */
function ellipse(w: number, h: number) {
  return { rx: Math.max(w / 2, h * 0.34), ry: h / 2 }
}

/** Normalised distance from the centre: 0 at the middle, 1 on the ellipse. */
function distAt(x: number, y: number, w: number, h: number) {
  const e = ellipse(w, h)
  const dx = (x - w / 2) / e.rx
  const dy = (y - h / 2) / e.ry
  return Math.sqrt(dx * dx + dy * dy)
}

/** Where a layer's leaves begin at an angle: a lobed ring, different per seed, coherent across layers. */
function reachAt(theta: number, layer: number, seed: number) {
  const p1 = hash(seed + 1) * 6.283
  const p2 = hash(seed + 2) * 6.283
  const p3 = hash(seed + 3) * 6.283
  const base = LAYERS[layer].reach
  return base * (1 + 0.13 * Math.sin(3 * theta + p1 + layer * 0.55) + 0.08 * Math.sin(5 * theta + p2 - layer * 0.9) + 0.05 * Math.sin(8 * theta + p3 + layer * 1.7))
}

function canopyPlan(w: number, h: number, layer: number, seed: number) {
  const spec = LAYERS[layer]
  const rand = mulberry32(seed * 977 + layer * 7919 + 13)
  const gauss = () => (rand() + rand() + rand() - 1.5) / 0.75
  // leaves keep a minimum size, so a phone's canopy reads as dense as a desktop's
  const u = Math.max(Math.sqrt(w * h), 1000)
  const leafPx = spec.leaf * u
  const cx = w / 2
  const cy = h / 2
  const area = clamp((w * h) / (1612 * 1008), 0.62, 1.35)
  const twigs = [] as OvsTwig[]
  const clusters = [] as { x: number; y: number; r: number; n: number; d: number }[]
  // budgets: a phone gets a lighter forest than a wide screen
  const branchCap = Math.round(spec.masses * area * 0.9)
  let forks = 0

  const thetaOf = (x: number, y: number) => {
    const e = ellipse(w, h)
    return Math.atan2((y - cy) / e.ry, (x - cx) / e.rx)
  }

  // branches reach in from beyond the frame and end in clusters at the hole's edge
  const grow = (x: number, y: number, dir: number, width: number, depth: number) => {
    const pts = [x, y]
    const step = u * 0.028
    let px = x
    let py = y
    let a = dir
    const stopAt = reachAt(thetaOf(x, y), layer, seed) + 0.02 + rand() * 0.08
    for (let i = 0; i < 60; i++) {
      a += (rand() - 0.5) * 0.32
      const toC = Math.atan2(cy - py, cx - px)
      let diff = toC - a
      while (diff > Math.PI) diff -= Math.PI * 2
      while (diff < -Math.PI) diff += Math.PI * 2
      a += diff * 0.08
      px += Math.cos(a) * step
      py += Math.sin(a) * step
      pts.push(px, py)
      const d = distAt(px, py, w, h)
      const here = reachAt(thetaOf(px, py), layer, seed)
      if (d < here + spec.band * 0.75 && i % 2 === 0 && clusters.length < branchCap) clusters.push({ x: px + gauss() * leafPx, y: py + gauss() * leafPx, r: leafPx * (1.9 + rand() * 1.2), n: Math.round(spec.per * (0.7 + rand() * 0.5)), d })
      if (depth < 2 && i > 3 && forks < spec.twigs * 2 && rand() < 0.16 && ++forks) grow(px, py, a + (rand() < 0.5 ? -1 : 1) * (0.45 + rand() * 0.4), width * 0.55, depth + 1)
      if (d < Math.min(stopAt, here + 0.04)) break
    }
    clusters.push({ x: px, y: py, r: leafPx * 2.8, n: Math.round(spec.per * 1.4), d: distAt(px, py, w, h) })
    twigs.push({ p: pts, w: width })
  }

  for (let i = 0; i < spec.twigs; i++) {
    const t = (i / spec.twigs) * Math.PI * 2 + rand() * 0.5
    const e = ellipse(w, h)
    const sx = cx + Math.cos(t) * e.rx * 1.55
    const sy = cy + Math.sin(t) * e.ry * 1.55
    grow(sx, sy, Math.atan2(cy - sy, cx - sx) + (rand() - 0.5) * 0.7, leafPx * (0.42 + rand() * 0.2), 0)
  }

  // masses fill the band behind the branches, with noise-shaped gaps of sky
  const want = Math.round(spec.masses * area)
  const off = hash(seed + layer) * 100
  for (let tries = 0, got = 0; got < want && tries < want * 30; tries++) {
    const x = rand() * w
    const y = rand() * h
    const d = distAt(x, y, w, h)
    const r = reachAt(thetaOf(x, y), layer, seed)
    if (d < r || d > r + spec.band) continue
    const gap = fbm(x / (u * 0.12) + off, y / (u * 0.12) - off)
    const nearEdge = 1 - (d - r) / spec.band
    if (gap < 0.36 + nearEdge * 0.12) continue
    clusters.push({ x, y, r: leafPx * (1.9 + rand() * 1.6), n: Math.round(spec.per * (0.8 + rand() * 0.5)), d })
    got++
  }

  // outer clusters first, so the sunlit edge of the hole sits on top
  clusters.sort((p, q) => q.d - p.d)
  const leaves = [] as OvsLeaf[]
  for (const c of clusters) {
    const r = reachAt(thetaOf(c.x, c.y), layer, seed)
    const depthIn = clamp((c.d - r) / spec.band, 0, 1)
    const tx = cx - c.x
    const ty = cy - c.y
    const tl = Math.hypot(tx, ty) || 1
    const group = [] as OvsLeaf[]
    for (let k = 0; k < c.n; k++) {
      const ox = gauss() * c.r * 0.55
      const oy = gauss() * c.r * 0.55
      const ol = Math.hypot(ox, oy) || 1
      const toward = (ox * tx + oy * ty) / (ol * tl)
      const l = 0.5 + 0.28 * toward * Math.min(1, ol / c.r) + (rand() - 0.5) * 0.36 - depthIn * (0.3 + layer * 0.07) + 0.08
      group.push({ x: c.x + ox, y: c.y + oy, s: leafPx * (0.72 + rand() * 0.6), a: Math.atan2(oy, ox) + (rand() - 0.5) * 1.3, l: clamp(l, 0, 1) })
    }
    group.sort((p, q) => p.l - q.l)
    for (const g of group) leaves.push(g)
  }
  return { twigs, leaves }
}

/** Shadow to mid to sunlit to glowing, then hazed toward the sky for depth. */
function leafColor(p: OvsPalette, l: number, haze: Rgb, hazeAmt: number, dim: number) {
  let c: Rgb
  if (l < 0.45) c = mix(p.shadow, p.mid, l / 0.45)
  else if (l < 0.86) c = mix(p.mid, p.lit, (l - 0.45) / 0.41)
  else c = mix(p.lit, p.glow, (l - 0.86) / 0.14)
  c = c.map((v) => v * dim)
  return mix(c, haze, hazeAmt)
}

function mix(a: Rgb, b: Rgb, t: number) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

const rgb = (c: Rgb, a = 1) => "rgba(" + Math.round(c[0]) + "," + Math.round(c[1]) + "," + Math.round(c[2]) + "," + a + ")"

function skyAt(stops: (number | Rgb)[][], t: number) {
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1]
    const b = stops[i]
    if (t <= (b[0] as number)) return mix(a[1] as Rgb, b[1] as Rgb, (t - (a[0] as number)) / ((b[0] as number) - (a[0] as number)))
  }
  return stops[stops.length - 1][1] as Rgb
}

export function formatNumber(v: number, decimals = 0) {
  const s = v.toFixed(decimals)
  const [i, d] = s.split(".")
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (d ? "." + d : "")
}

export function planPrice(plan: OvsPlan, quarterly: boolean) {
  if (plan.price === null) return null
  return quarterly && plan.quarterly ? plan.quarterly : plan.price
}

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s.trim())

/** Splits the manifesto into words and inline pictures: "[team]" and "[chart]". */
export function manifestoParts(text: string) {
  return text.split(/\s+/).filter(Boolean).map((t) => {
    const m = t.match(/^\[(team|chart|leaf)\]$/)
    return m ? { pic: m[1], word: "" } : { pic: "", word: t }
  })
}

/** How much of a photo pixel is sky: blue-dominant, or a bright low-saturation cloud. 0..1. */
function skyAmount(r: number, g: number, b: number) {
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  const blue = clamp(((b - Math.max(r, g)) / 255) * 6, 0, 1)
  const cloud = clamp(((mx + mn) / 510 - 0.78) * 5, 0, 1) * clamp(1 - ((mx - mn) / 255) * 4, 0, 1)
  return Math.max(blue, cloud)
}

/**
 * Grades one pixel of the canopy photo in place: turns the leaves for a season
 * and, at dusk, swaps the sky for a violet evening and the leaves for
 * silhouettes. `y` is the row, 0 at the top. Values are 0..255.
 */
function gradePixel(px: number[], y: number, season: string, dark: boolean) {
  const r = px[0] / 255
  const g = px[1] / 255
  const b = px[2] / 255
  const sky = skyAmount(px[0], px[1], px[2])
  const leaf = 1 - sky
  // rgb to hsv
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  const d = mx - mn
  let h = d === 0 ? 0 : mx === r ? (((g - b) / d) % 6) / 6 : mx === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6
  let sa = mx === 0 ? 0 : d / mx
  let v = mx
  if (season === "autumn") {
    h -= 0.085 * leaf
    sa = Math.min(1, sa * (1 + 0.3 * leaf))
    v = Math.min(1, v * (1 + 0.04 * leaf))
  } else if (season === "blossom") {
    h = lerp(h, 0.94, 0.9 * leaf)
    sa *= 1 - 0.38 * leaf
    v = Math.min(1, v * (1 + 0.2 * leaf) + 0.06 * leaf)
  }
  h = ((h % 1) + 1) % 1
  // hsv to rgb
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - sa)
  const q = v * (1 - f * sa)
  const t = v * (1 - (1 - f) * sa)
  const k = i % 6
  let R = k === 0 ? v : k === 1 ? q : k === 2 ? p : k === 3 ? p : k === 4 ? t : v
  let G = k === 0 ? t : k === 1 ? v : k === 2 ? v : k === 3 ? q : k === 4 ? p : p
  let B = k === 0 ? p : k === 1 ? p : k === 2 ? t : k === 3 ? v : k === 4 ? v : q
  if (dark) {
    const lum = 0.2126 * R + 0.7152 * G + 0.0722 * B
    const glow = 0.42 + 1.15 * lum
    const sr = lerp(0.03, 0.34, y) * glow
    const sg = lerp(0.06, 0.24, y) * glow
    const sb = lerp(0.16, 0.46, y) * glow
    R = lerp(R * 0.24 + 0.01, sr, sky)
    G = lerp(G * 0.3 + 0.02, sg, sky)
    B = lerp(B * 0.3 + 0.05, sb, sky)
  }
  px[0] = clamp(R * 255, 0, 255)
  px[1] = clamp(G * 255, 0, 255)
  px[2] = clamp(B * 255, 0, 255)
  return px
}

/** Which step of the process a 0..1 progress is in. */
export function stepAt(progress: number, count: number) {
  return clamp(Math.floor(progress * count), 0, count - 1)
}
// #endregion logic

/* ------------------------------------------------------------------ canvas */

function drawSky(cv: HTMLCanvasElement, w: number, h: number, scheme: "light" | "dark", seed: number) {
  const S = SKIES[scheme]
  const k = 0.32
  const W = Math.max(8, Math.round(w * k))
  const H = Math.max(8, Math.round(h * k))
  cv.width = W
  cv.height = H
  const ctx = cv.getContext("2d")
  if (!ctx) return
  const img = ctx.createImageData(W, H)
  const off = hash(seed) * 50
  const [sx, sy, sr, sg, sb, sa] = S.sun
  for (let y = 0; y < H; y++) {
    const base = skyAt(S.stops, y / (H - 1))
    for (let x = 0; x < W; x++) {
      let c = base
      const dx = x / W - sx
      const dy = (y / H - sy) * (h / w)
      const g = Math.exp(-(dx * dx + dy * dy) * 9) * sa
      c = mix(c, [sr, sg, sb], g)
      const n = fbm(x / (W * 0.16) + off, y / (H * 0.2) - off * 0.5)
      const wisp = fbm(x / (W * 0.05) - off, y / (H * 0.07) + off)
      const cloud = smoothstep(0.5, 0.82, n * 0.8 + wisp * 0.25) * S.cloud[3]
      c = mix(c, [S.cloud[0], S.cloud[1], S.cloud[2]], cloud)
      if (S.stars && hash(x * 13.1 + y * 71.7 + seed) > 0.9965) c = mix(c, [255, 250, 240], 0.75 * (1 - y / H))
      const i = (y * W + x) * 4
      img.data[i] = c[0]
      img.data[i + 1] = c[1]
      img.data[i + 2] = c[2]
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
}

function drawLayer(cv: HTMLCanvasElement, w: number, h: number, layer: number, seed: number, pal: OvsPalette, scheme: "light" | "dark") {
  const spec = LAYERS[layer]
  const S = SKIES[scheme]
  const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 1.6) * spec.res
  const W = Math.max(4, Math.round(w * dpr))
  const H = Math.max(4, Math.round(h * dpr))
  const plan = canopyPlan(w, h, layer, seed)
  const target = spec.blur > 0 ? document.createElement("canvas") : cv
  target.width = W
  target.height = H
  const ctx = target.getContext("2d")
  if (!ctx) return
  ctx.clearRect(0, 0, W, H)
  const hazeAmt = spec.haze * (scheme === "dark" ? 0.7 : 1)
  // branches
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.strokeStyle = rgb(mix(pal.twig.map((v) => v * (scheme === "dark" ? 0.5 : 1)), S.haze, hazeAmt))
  for (const t of plan.twigs) {
    const n = t.p.length / 2
    for (let i = 1; i < n; i++) {
      ctx.lineWidth = Math.max(0.6, t.w * (1 - (i / n) * 0.8)) * dpr
      ctx.beginPath()
      ctx.moveTo(t.p[(i - 1) * 2] * dpr, t.p[(i - 1) * 2 + 1] * dpr)
      ctx.lineTo(t.p[i * 2] * dpr, t.p[i * 2 + 1] * dpr)
      ctx.stroke()
    }
  }
  // leaves
  const shape = pal.shape
  const vein = layer >= 2
  for (const f of plan.leaves) {
    const c = Math.cos(f.a) * dpr
    const s = Math.sin(f.a) * dpr
    ctx.setTransform(c, s, -s, c, f.x * dpr, f.y * dpr)
    const L = f.s * 0.5
    const Wd = f.s * shape
    ctx.fillStyle = rgb(leafColor(pal, f.l, S.haze, hazeAmt, S.leaf))
    ctx.beginPath()
    ctx.moveTo(-L, 0)
    ctx.quadraticCurveTo(0, -Wd, L, 0)
    ctx.quadraticCurveTo(0, Wd, -L, 0)
    ctx.fill()
    if (f.l > 0.72) {
      ctx.fillStyle = rgb(leafColor(pal, Math.min(1, f.l + 0.16), S.haze, hazeAmt, S.leaf), 0.7)
      ctx.beginPath()
      ctx.moveTo(-L * 0.55, 0)
      ctx.quadraticCurveTo(0, -Wd * 0.5, L * 0.7, 0)
      ctx.quadraticCurveTo(0, Wd * 0.5, -L * 0.55, 0)
      ctx.fill()
    }
    if (vein && f.s > 14) {
      ctx.strokeStyle = rgb(leafColor(pal, f.l * 0.55, S.haze, hazeAmt, S.leaf), 0.55)
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.moveTo(-L * 0.9, 0)
      ctx.lineTo(L * 0.8, 0)
      ctx.stroke()
    }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  if (target !== cv) {
    cv.width = W
    cv.height = H
    const out = cv.getContext("2d")
    if (!out) return
    out.filter = "blur(" + spec.blur * dpr + "px)"
    out.drawImage(target, 0, 0)
    out.filter = "none"
  }
}

type CanopyProps = {
  seed: number
  scheme: "light" | "dark"
  palette: OvsPalette
  lazy?: boolean
  onReady?: () => void
  className?: string
}

/** The generated view up through the trees: a sky and four leaf layers, each nested for pointer, scroll and sway. */
export function Canopy({ seed, scheme, palette, lazy, onReady, className }: CanopyProps) {
  const box = React.useRef(null as HTMLDivElement | null)
  const sky = React.useRef(null as HTMLCanvasElement | null)
  const layers = React.useRef([] as (HTMLCanvasElement | null)[])
  const ready = React.useRef(onReady)
  ready.current = onReady

  React.useEffect(() => {
    const el = box.current
    if (!el) return
    let size = { w: 0, h: 0 }
    let job = 0
    let alive = true
    let seen = !lazy
    let drawn = false
    const draw = () => {
      cancelAnimationFrame(job)
      const w = el.clientWidth
      const h = el.clientHeight
      if (w < 2 || h < 2) return
      size = { w, h }
      // one canvas per frame, so the main thread never stalls for long
      const work = [
        () => sky.current && drawSky(sky.current, w, h, scheme, seed),
        ...LAYERS.map((_, i) => () => {
          const cv = layers.current[i]
          // the layer box is larger than the stage (see .ovs-layer), so plan for its own size
          if (cv && cv.parentElement) drawLayer(cv, cv.parentElement.clientWidth, cv.parentElement.clientHeight, i, seed, palette, scheme)
        }),
      ]
      let i = 0
      const next = () => {
        if (!alive) return
        try {
          work[i]()
        } catch {
          /* a canvas that cannot draw leaves the CSS sky behind it */
        }
        i++
        if (i < work.length) job = requestAnimationFrame(next)
        else {
          drawn = true
          el.setAttribute("data-drawn", "")
          ready.current?.()
        }
      }
      job = requestAnimationFrame(next)
    }
    const ro = new ResizeObserver(() => {
      if (!seen) return
      const w = el.clientWidth
      const h = el.clientHeight
      // mobile toolbars change the height by a little; do not regrow the forest for that
      if (drawn && Math.abs(w - size.w) < 40 && Math.abs(h - size.h) < 140) return
      draw()
    })
    ro.observe(el)
    let io: IntersectionObserver | null = null
    if (lazy) {
      io = new IntersectionObserver(
        (es) => {
          if (es.some((e) => e.isIntersecting) && !seen) {
            seen = true
            draw()
          }
        },
        { rootMargin: "900px 0px" },
      )
      io.observe(el)
    } else draw()
    return () => {
      alive = false
      cancelAnimationFrame(job)
      ro.disconnect()
      io?.disconnect()
    }
  }, [seed, scheme, palette, lazy])

  return (
    <div ref={box} className={"ovs-canopy " + (className || "")} aria-hidden="true">
      <div className="ovs-skybox" data-sky>
        <canvas ref={sky} className="ovs-cv ovs-skycv" />
      </div>
      {LAYERS.map((_, i) => (
        <div key={i} className="ovs-layer" data-layer={i}>
          <div className="ovs-zoom" data-zoom={i}>
            <div className={"ovs-sway ovs-sway-" + i}>
              <canvas ref={(c) => { layers.current[i] = c }} className="ovs-cv" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

type PhotoProps = {
  src: string
  season: OvsSeason
  scheme: "light" | "dark"
  /** Turn the photo upside down (looking up, any way round is still the sky). */
  turn?: boolean
  onReady?: () => void
  onFail?: () => void
}

/**
 * The real canopy: one photo, graded per season and scheme in canvas, plus a
 * soft-focus copy of its rim that rushes past when you rise through it. On a
 * portrait screen the photo is turned a quarter, so a phone gets a full ring
 * of trees instead of a slice of one.
 */
export function PhotoCanopy({ src, season, scheme, turn, onReady, onFail }: PhotoProps) {
  const box = React.useRef(null as HTMLDivElement | null)
  const base = React.useRef(null as HTMLCanvasElement | null)
  const fore = React.useRef(null as HTMLCanvasElement | null)
  const cbs = React.useRef({ onReady, onFail })
  cbs.current = { onReady, onFail }
  const [portrait, setPortrait] = React.useState(false)

  React.useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setPortrait(el.clientHeight > el.clientWidth * 1.05))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  React.useEffect(() => {
    let alive = true
    const img = document.createElement("img")
    img.decoding = "async"
    const paint = () => {
      const cv = base.current
      const fv = fore.current
      if (!cv || !fv) return
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const W = portrait ? ih : iw
      const H = portrait ? iw : ih
      cv.width = W
      cv.height = H
      const ctx = cv.getContext("2d", { willReadFrequently: true })
      if (!ctx) throw new Error("no 2d")
      ctx.save()
      if (portrait) {
        ctx.translate(W, 0)
        ctx.rotate(Math.PI / 2)
      }
      if (turn) {
        ctx.translate(iw, ih)
        ctx.rotate(Math.PI)
      }
      ctx.drawImage(img, 0, 0)
      ctx.restore()
      const dark = scheme === "dark"
      if (season !== "summer" || dark) {
        const data = ctx.getImageData(0, 0, W, H)
        const a = data.data
        const px = [0, 0, 0]
        for (let y = 0; y < H; y++) {
          const yy = y / (H - 1)
          for (let x = 0; x < W; x++) {
            const o = (y * W + x) * 4
            px[0] = a[o]
            px[1] = a[o + 1]
            px[2] = a[o + 2]
            gradePixel(px, yy, season, dark)
            a[o] = px[0]
            a[o + 1] = px[1]
            a[o + 2] = px[2]
          }
        }
        ctx.putImageData(data, 0, 0)
      }
      // the rim, out of focus, for the rise
      fv.width = Math.round(W / 2)
      fv.height = Math.round(H / 2)
      const f = fv.getContext("2d")
      if (f) {
        f.filter = "blur(7px)"
        f.drawImage(cv, 0, 0, fv.width, fv.height)
        f.filter = "none"
        f.globalCompositeOperation = "destination-in"
        const gr = f.createRadialGradient(fv.width / 2, fv.height / 2, Math.min(fv.width, fv.height) * 0.22, fv.width / 2, fv.height / 2, Math.max(fv.width, fv.height) * 0.62)
        gr.addColorStop(0, "rgba(0,0,0,0)")
        gr.addColorStop(1, "rgba(0,0,0,1)")
        f.fillStyle = gr
        f.fillRect(0, 0, fv.width, fv.height)
        f.globalCompositeOperation = "source-over"
      }
      box.current?.setAttribute("data-drawn", "")
    }
    img.onload = () => {
      if (!alive) return
      try {
        paint()
        cbs.current.onReady?.()
      } catch {
        cbs.current.onFail?.()
      }
    }
    img.onerror = () => {
      if (alive) cbs.current.onFail?.()
    }
    img.src = src
    return () => {
      alive = false
      img.onload = null
      img.onerror = null
    }
  }, [src, season, scheme, turn, portrait])

  return (
    <div ref={box} className="ovs-canopy ovs-photo" data-photo aria-hidden="true">
      <div className="ovs-layer" data-layer={0}>
        <div className="ovs-zoom" data-zoom={0}>
          <div className="ovs-sway ovs-sway-p">
            <canvas ref={base} className="ovs-cv ovs-pcv" />
          </div>
        </div>
      </div>
      <div className="ovs-layer ovs-fore" data-layer={1}>
        <div className="ovs-zoom" data-zoom={1}>
          <canvas ref={fore} className="ovs-cv ovs-pcv" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- marks */

