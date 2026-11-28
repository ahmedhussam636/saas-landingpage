"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const COOKIE_CONSENT_KEY = "codly_cookie_consent";
export const COOKIE_RESET_EVENT = "codly:cookie-preferences-open";

export type CookieConsentValue = "accepted" | "declined";

interface AlertCookieNoticeProps {
  onOpenPolicy?: (e: React.MouseEvent) => void;
  still?: boolean;
}

export function AlertCookieNotice({
  onOpenPolicy,
  still = false,
}: AlertCookieNoticeProps) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let timer: number | undefined;
    try {
      const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!saved) {
        timer = window.setTimeout(() => setVisible(true), 850);
      }
    } catch {
      timer = window.setTimeout(() => setVisible(true), 850);
    }

    const handleReopen = () => setVisible(true);
    window.addEventListener(COOKIE_RESET_EVENT, handleReopen);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      window.removeEventListener(COOKIE_RESET_EVENT, handleReopen);
    };
  }, []);

  const choose = (value: CookieConsentValue) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      // ignore storage issues
    }
    setVisible(false);
  };

  const dismiss = () => {
    choose("declined");
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="cookie-popup"
          initial={still ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={still ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: still ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 bottom-4 z-[100] w-[calc(100vw-2rem)] max-w-[400px] sm:right-6 sm:bottom-6"
        >
          <Alert
            className="w-full"
            layout="complex"
            isNotification
            size="lg"
            style={{
              backgroundColor: "var(--ovs-card)",
              borderColor: "var(--ovs-line)",
              color: "var(--ovs-ink)",
              borderRadius: "20px",
              boxShadow: "0 20px 50px -16px rgba(10, 20, 8, 0.22)",
            }}
            icon={
              <span
                className="flex size-8 items-center justify-center rounded-xl"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--ovs-soft, #c4dc52) 24%, var(--ovs-card))",
                  color: "var(--ovs-accent, #3d6a12)",
                }}
              >
                <Cookie className="size-4" strokeWidth={1.8} />
              </span>
            }
            action={
              <Button
                type="button"
                variant="ghost"
                onClick={dismiss}
                aria-label="Close notification"
                style={{
                  width: "32px",
                  height: "32px",
                  padding: 0,
                  borderRadius: "999px",
                  color: "var(--ovs-ink2)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} strokeWidth={2} />
              </Button>
            }
          >
            <AlertContent>
              <AlertTitle
                className="text-[15px] font-medium"
                style={{ color: "var(--ovs-ink)", letterSpacing: "-0.015em" }}
              >
                We Value Your Privacy
              </AlertTitle>
              <AlertDescription
                className="text-[13.5px] leading-relaxed"
                style={{ color: "var(--ovs-ink2)" }}
              >
                We use minimal browser storage and essential cookies to
                remember your theme and improve your experience.{" "}
                <a
                  href="/cookies"
                  onClick={(e) => {
                    onOpenPolicy?.(e);
                  }}
                  style={{
                    color: "var(--ovs-ink)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    fontWeight: 500,
                  }}
                >
                  Cookie Policy
                </a>
              </AlertDescription>
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => choose("accepted")}
                  style={{
                    height: "34px",
                    padding: "0 16px",
                    borderRadius: "999px",
                    backgroundColor: "var(--ovs-ink)",
                    color: "var(--ovs-paper)",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Accept
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => choose("declined")}
                  style={{
                    height: "34px",
                    padding: "0 16px",
                    borderRadius: "999px",
                    backgroundColor: "transparent",
                    border: "1px solid var(--ovs-line)",
                    color: "var(--ovs-ink)",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Decline
                </Button>
              </div>
            </AlertContent>
          </Alert>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default AlertCookieNotice;
