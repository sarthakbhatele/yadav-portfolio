"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
  visible: boolean;
}

export default function FilmClapLoader({ onComplete, visible }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topClapRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const called = useRef(false);

  useEffect(() => {
    if (!visible) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      gsap.set(topClapRef.current, { rotateX: -40, transformOrigin: "bottom center" });
      gsap.set([word1Ref.current, word2Ref.current, word3Ref.current], { opacity: 0, y: 10 });

      tl.to(topClapRef.current, { rotateX: 0, duration: 0.15, ease: "power4.in" })
        .to({}, { duration: 0.1 })
        .to(word1Ref.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
        .to(word2Ref.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
        .to(word3Ref.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.1")
        .to({}, { duration: 0.8 })
        .call(() => {
          if (!called.current) {
            called.current = true;
            onComplete();
          }
        });
    }, containerRef);

    return () => ctx.revert();
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ zIndex: 99999, backgroundColor: "#0a1208", perspective: "600px" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          suppressHydrationWarning
        >
          {/* Clapperboard */}
          <div style={{ width: 200 }}>
            {/* Top stripe panel */}
            <div
              ref={topClapRef}
              style={{
                width: "100%",
                height: 36,
                display: "flex",
                overflow: "hidden",
                borderRadius: "4px 4px 0 0",
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    backgroundColor: i % 2 === 0 ? "#1a1208" : "#e8b06a",
                    transform: "skewX(-20deg)",
                  }}
                />
              ))}
            </div>

            {/* Board body */}
            <div
              style={{
                width: "100%",
                backgroundColor: "#1a1208",
                border: "2px solid #e8b06a",
                borderTop: "none",
                borderRadius: "0 0 4px 4px",
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {["SCENE 01", "TAKE 01", "SARTHAK"].map((text) => (
                <div
                  key={text}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e8b06a33",
                    paddingBottom: 4,
                  }}
                >
                  <span style={{ color: "#e8b06a", fontSize: 9, fontFamily: "serif", letterSpacing: 2 }}>
                    {text}
                  </span>
                  <span style={{ color: "#8a7a66", fontSize: 9, fontFamily: "serif" }}>
                    framesbysarthak
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Words */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 12,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: "clamp(18px, 4vw, 28px)",
              color: "#f0e6d0",
              letterSpacing: 2,
            }}
          >
            <span ref={word1Ref}>Lights.</span>
            <span ref={word2Ref}>Camera.</span>
            <span ref={word3Ref} style={{ color: "#e8b06a" }}>Action.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}