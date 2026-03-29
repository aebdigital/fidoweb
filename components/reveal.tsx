"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  threshold?: number;
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 0.985,
  threshold = 0.16,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(node);
          return;
        }

        if (!once) setVisible(false);
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div
      ref={ref}
      className={cn("reveal-block", className)}
      data-visible={visible ? "true" : "false"}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
          "--reveal-scale": scale,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
