"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface Props {
  onComplete: () => void;
  visible: boolean;
}

export default function FilmClapLoader({ onComplete, visible }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reelWrapRef = useRef<HTMLDivElement>(null);
  const reelSvgRef = useRef<SVGSVGElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const called = useRef(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!visible || hasRun.current) return;
    hasRun.current = true;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Start: reel off-screen left, strip width=0
      gsap.set(reelWrapRef.current, { x: -260 });
      gsap.set(reelSvgRef.current, { rotation: 0, transformOrigin: "50% 50%" });
      gsap.set(stripRef.current, { width: 0 });
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current], {
        opacity: 0,
        y: 20,
        filter: "blur(4px)",
      });

      // Phase 1: Reel rolls in from left to center (2.2s)
      // Strip grows simultaneously — trailing behind the reel
      tl.to(reelWrapRef.current, {
        x: 0,
        duration: 2.2,
        ease: "power1.inOut",
      })
      .to(reelSvgRef.current, {
        rotation: 720,
        duration: 2.2,
        ease: "power1.inOut",
      }, "<")
      .to(stripRef.current, {
        width: 260,
        duration: 2.0,
        ease: "power1.inOut",
      }, "<+=0.15")

      // Phase 2: Text appears one by one
      .to(text1Ref.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.55, ease: "power3.out",
      }, "-=0.3")
      .to(text2Ref.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.55, ease: "power3.out",
      }, "-=0.2")
      .to(text3Ref.current, {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.55, ease: "power3.out",
      }, "-=0.2")

      // Hold then complete
      .to({}, { duration: 1.2 })
      .call(() => {
        if (!called.current) {
          called.current = true;
          onComplete();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [visible, onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#0a1208",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 48,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Reel + Strip track */}
      <div
        style={{
          position: "relative",
          width: 360,
          height: 90,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Reel wrapper moves left → right */}
        <div
          ref={reelWrapRef}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          {/* Strip trails to the left of the reel */}
          <div
            ref={stripRef}
            style={{
              height: 52,
              width: 0,
              backgroundColor: "#111a0f",
              borderTop: "2px solid #b8860b",
              borderBottom: "2px solid #b8860b",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "4px 0",
              boxSizing: "border-box",
            }}
          >
            {/* Top sprocket row */}
            <div style={{ display: "flex", gap: 8, paddingLeft: 6, flexShrink: 0 }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{
                  width: 9, height: 7,
                  backgroundColor: "#0a1208",
                  border: "1px solid #b8860b66",
                  borderRadius: 2,
                  flexShrink: 0,
                }} />
              ))}
            </div>
            {/* Center frames */}
            <div style={{ display: "flex", gap: 3, paddingLeft: 6, flexShrink: 0 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{
                  width: 18, height: 14,
                  backgroundColor: "#0d150b",
                  border: "1px solid #b8860b33",
                  borderRadius: 1,
                  flexShrink: 0,
                }} />
              ))}
            </div>
            {/* Bottom sprocket row */}
            <div style={{ display: "flex", gap: 8, paddingLeft: 6, flexShrink: 0 }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} style={{
                  width: 9, height: 7,
                  backgroundColor: "#0a1208",
                  border: "1px solid #b8860b66",
                  borderRadius: 2,
                  flexShrink: 0,
                }} />
              ))}
            </div>
          </div>

          {/* THE REEL SVG */}
          <svg
            ref={reelSvgRef}
            width="90"
            height="90"
            viewBox="0 0 90 90"
            style={{ flexShrink: 0, display: "block", filter: "drop-shadow(0 0 14px #b8860b66)" }}
          >
            <circle cx="45" cy="45" r="44" fill="#c8920c" />
            <circle cx="45" cy="45" r="44" fill="none" stroke="#e8b06a" strokeWidth="2" />
            <circle cx="45" cy="45" r="37" fill="#1c1608" />
            <circle cx="45" cy="45" r="37" fill="none" stroke="#b8860b" strokeWidth="1.5" />

            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const cx = 45 + 24 * Math.cos(angle);
              const cy = 45 + 24 * Math.sin(angle);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="9.5" fill="#0a0a08" />
                  <circle cx={cx} cy={cy} r="9.5" fill="none" stroke="#b8860b" strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="7" fill="#050805" />
                </g>
              );
            })}

            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180);
              const x1 = 45 + 15 * Math.cos(angle);
              const y1 = 45 + 15 * Math.sin(angle);
              const x2 = 45 + 33 * Math.cos(angle);
              const y2 = 45 + 33 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b8860b44" strokeWidth="1" />;
            })}

            <circle cx="45" cy="45" r="7" fill="#c8920c" />
            <circle cx="45" cy="45" r="4" fill="#1c1608" />
            <circle cx="45" cy="45" r="2" fill="#c8920c" />
            <circle cx="45" cy="45" r="41" fill="none" stroke="#b8860b44" strokeWidth="1" strokeDasharray="4 3" />
          </svg>
        </div>
      </div>

      {/* Text row */}
      <div
        style={{
          display: "flex",
          gap: 32,
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontStyle: "italic",
          letterSpacing: "0.12em",
        }}
      >
        <div ref={text1Ref} style={{
          display: "flex", alignItems: "center", gap: 9,
          color: "#d4c5a9", fontSize: "clamp(15px, 3vw, 22px)", fontWeight: 400,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e8b06a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          Lights.
        </div>

        <div ref={text2Ref} style={{
          display: "flex", alignItems: "center", gap: 9,
          color: "#d4c5a9", fontSize: "clamp(15px, 3vw, 22px)", fontWeight: 400,
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e8b06a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          Camera.
        </div>

        <div ref={text3Ref} style={{
          display: "flex", alignItems: "center", gap: 9,
          color: "#e8b06a", fontSize: "clamp(15px, 3vw, 22px)", fontWeight: 600,
          textShadow: "0 0 20px #e8b06a55",
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#e8b06a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.2 6L3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3L20.2 6z" />
            <path d="M6.2 5.3l3.1 3.9" /><path d="M12.05 3.8l3.1 3.9" />
            <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z" />
          </svg>
          Action.
        </div>
      </div>

      {/* Bottom credit */}
      <div style={{
        position: "absolute",
        bottom: 28,
        fontFamily: "monospace",
        fontSize: 10,
        letterSpacing: "0.3em",
        color: "#b8860b55",
        textTransform: "uppercase",
      }}>
        framesbysarthak
      </div>
    </div>
  );
}