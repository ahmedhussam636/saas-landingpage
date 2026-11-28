"use client";

import * as React from "react";
import { motion, type Variants } from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Facebook01Icon,
  NewTwitterIcon,
  InstagramIcon,
  Linkedin01Icon,
} from "@hugeicons/core-free-icons";
import LogoIcon from "@/assets/logo-icon";

export interface Footer27Props {
  brand?: string;
  email?: string;
  onNavigate?: (href: string, e: React.MouseEvent<HTMLAnchorElement>) => void;
  onBook?: (from: string) => (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const footerColumns = [
  {
    title: "STUDIO",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Selected Work", href: "#work" },
      { label: "Services", href: "#services" },
      { label: "How We Work", href: "#process" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "CAPABILITIES",
    links: [
      { label: "Brand & Identity", href: "#services" },
      { label: "Product Design", href: "#services" },
      { label: "Design Systems", href: "#services" },
      { label: "Full-Stack Eng", href: "#services" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "The Crew", href: "#team" },
      { label: "Join the Walk", href: "#crowd" },
      { label: "Client Stories", href: "#quotes" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Fair Use", href: "/terms" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Subprocessors", href: "/privacy" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialIcons = [
  { icon: Facebook01Icon, label: "Facebook", href: "#contact" },
  { icon: NewTwitterIcon, label: "Twitter", href: "#contact" },
  { icon: InstagramIcon, label: "Instagram", href: "#contact" },
  { icon: Linkedin01Icon, label: "LinkedIn", href: "#contact" },
];

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const riseUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 28, mass: 0.9 },
  },
};

const linkCascade: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.04 },
  },
};

const linkTrickle: Variants = {
  hidden: { opacity: 0, x: -8, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 350, damping: 30, mass: 0.6 },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const wordmarkSlam: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 22, mass: 2.2 },
  },
};

export default function Footer27({
  brand = "Codly",
  email = "hello@codly.studio",
  onNavigate,
  onBook,
}: Footer27Props) {
  const handleLinkClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigate && ((href.startsWith("#") && href.length > 1) || href.startsWith("/"))) {
      onNavigate(href, e);
    }
  };

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#0a0a0a] font-sans antialiased selection:bg-white selection:text-black"
      aria-label="Site footer"
    >
      <div className="relative w-full">
        <motion.img
          src="https://assets.watermelon.sh/footer-25.avif"
          alt="Dramatic golden-hour sunset over a mountain lake surrounded by pine trees"
          variants={imageReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="h-[300px] w-full object-cover object-center sm:h-[360px] md:h-[420px] lg:h-[500px]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.6) 70%, #0a0a0a 100%)",
          }}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 md:px-12 lg:px-16"
        >
          <motion.h2
            variants={riseUp}
            className="max-w-xs text-3xl leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-white sm:max-w-sm sm:text-4xl md:max-w-md md:text-5xl"
          >
            The future of SaaS
            <br />
            is crafted fast.
          </motion.h2>
          <motion.p
            variants={riseUp}
            className="mt-3 max-w-[290px] text-sm leading-relaxed text-pretty text-white/75 sm:text-[15px]"
          >
            {brand} partners with ambitious founders to design, engineer, and
            ship products people love in weeks.
          </motion.p>
          <motion.div variants={riseUp} className="mt-5">
            <motion.a
              href={`mailto:${email}`}
              onClick={onBook ? onBook("footer-banner") : handleLinkClick("#contact")}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-5 text-sm font-medium text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-[background-color,box-shadow] duration-200 hover:bg-white/90 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.4)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              Contact Us
              <span className="flex size-7 items-center justify-center rounded-full bg-black/10 transition-transform duration-200 group-hover:translate-x-0.5">
                <HugeiconsIcon icon={ArrowRight01Icon} className="size-3.5" />
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-10 pb-0 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          <motion.div
            variants={riseUp}
            className="flex flex-col gap-5 sm:col-span-2 lg:col-span-3"
          >
            <div className="flex items-center gap-2.5">
              <LogoIcon className="size-9 flex-shrink-0 text-white" />
              <span className="text-lg font-medium tracking-[0.05em] text-white uppercase select-none">
                {brand}
              </span>
            </div>
            <p className="max-w-[230px] text-[13px] leading-relaxed text-pretty text-neutral-400">
              Senior design &amp; engineering studio crafting SaaS experiences
              that leave a lasting impact.
            </p>
            <motion.a
              href={`mailto:${email}`}
              onClick={onBook ? onBook("footer-connect") : handleLinkClick("#contact")}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.2)] transition-[background-color,box-shadow,transform] duration-200 hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.35)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
            >
              Let&apos;s Connect
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </motion.a>
          </motion.div>

          {/* Navigation columns — 6 cols */}
          <motion.nav
            variants={staggerContainer}
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:col-span-6 lg:ml-8"
          >
            {footerColumns.map((col) => (
              <motion.div
                key={col.title}
                variants={riseUp}
                className="flex flex-col gap-4"
              >
                <h3 className="text-sm font-semibold tracking-[0.1em] text-balance text-white uppercase">
                  {col.title}
                </h3>

                <motion.ul
                  variants={linkCascade}
                  className="flex flex-col gap-[10px]"
                >
                  {col.links.map((link) => (
                    <motion.li key={link.label} variants={linkTrickle}>
                      <a
                        href={link.href}
                        onClick={handleLinkClick(link.href)}
                        className="inline-block text-[13px] leading-snug text-pretty text-neutral-400 transition-colors duration-150 hover:text-white focus-visible:text-white focus-visible:outline-none"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            variants={riseUp}
            className="flex flex-col gap-4 lg:col-span-3"
          >
            <h3 className="text-xl font-semibold text-balance text-white">
              Stay Connected
            </h3>
            <p className="max-w-[230px] text-[13px] leading-relaxed text-pretty text-neutral-400">
              Follow us for product launches, insights, and a dose of
              inspiration.
            </p>

            <div className="flex items-center gap-2">
              {socialIcons.map(({ icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={handleLinkClick(href)}
                  aria-label={label}
                  whileTap={{ scale: 0.96 }}
                  className="flex size-10 items-center justify-center rounded-full bg-white/5 text-neutral-400 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[background-color,color,box-shadow] duration-150 hover:bg-white/10 hover:text-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:outline-none"
                >
                  <HugeiconsIcon icon={icon} className="size-[18px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/[0.08] pt-5 pb-6 text-[13px] text-neutral-500 sm:flex-row sm:items-center"
        >
          <p className="leading-none tabular-nums">
            © {new Date().getFullYear()} {brand}, Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 leading-none">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/privacy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={handleLinkClick(item.href)}
                className="transition-colors duration-150 hover:text-neutral-200 focus-visible:text-neutral-200 focus-visible:outline-none"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Massive Wordmark */}
      <div className="relative w-full overflow-hidden pt-2" aria-hidden="true">
        <motion.div
          variants={wordmarkSlam}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto flex w-full max-w-[1400px] items-end gap-3 px-6 select-none sm:gap-5 sm:px-8 md:px-12 lg:px-16"
        >
          <div className="flex-shrink-0 self-end pb-1 sm:pb-2">
            <LogoIcon className="h-[64px] w-auto text-[#474747] sm:h-[96px] md:h-[120px] lg:h-[155px] xl:h-[175px]" />
          </div>

          <div className="flex-1 overflow-hidden">
            <svg
              className="h-auto w-full"
              viewBox="0 0 640 175"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="wm-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0%" stopColor="#6b6b6b" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#191919" stopOpacity="0.75" />
                </linearGradient>
              </defs>
              <text
                x="50%"
                y="86%"
                dominantBaseline="auto"
                textAnchor="middle"
                fontSize="168"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
                letterSpacing="-0.035em"
                fill="url(#wm-gradient)"
              >
                {brand}
              </text>
            </svg>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
