"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type RevealProps = ComponentPropsWithoutRef<"div">;

export function Reveal({ children, className, ...props }: RevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (element.getBoundingClientRect().top <= window.innerHeight * 0.94) {
      element.classList.add("reveal-visible");
      return;
    }

    element.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.remove("reveal-pending");
        element.classList.add("reveal-visible");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={cn(className)} ref={elementRef} {...props}>
      {children}
    </div>
  );
}
