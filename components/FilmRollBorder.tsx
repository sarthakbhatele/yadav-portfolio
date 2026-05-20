"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function FilmStrip() {
  // One full tile: sprocket hole → frame cell, repeated
  const tiles = Array.from({ length: 20 });

  return (
    <motion.div
      className="flex flex-col w-full"
      animate={{ y: ["0%", "-50%"] }}
      transition={{ ease: "linear", duration: 18, repeat: Infinity }}
    >
      {/* Duplicate for seamless loop */}
      {[0, 1].map((pass) => (
        <div key={pass} className="flex flex-col w-full">
          {tiles.map((_, i) => (
            <div key={i} className="flex flex-col w-full">
              {/* Sprocket hole */}
              <div className="flex justify-center items-center py-[3px]">
                <div
                  style={{
                    width: 14,
                    height: 10,
                    backgroundColor: "#000",
                    borderRadius: 2,
                    boxShadow: "inset 0 0 0 1px #333",
                  }}
                />
              </div>
              {/* Frame cell */}
              <div
                style={{
                  width: "100%",
                  height: 28,
                  backgroundColor: "#0d0d0b",
                  borderTop: "1px solid #1f1c14",
                  borderBottom: "1px solid #1f1c14", boxShadow: "inset 0 0 8px #b8860b22",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Subtle amber film grain tint */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at center, #b8860b28 0%, #b8860b08 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

export default function FilmRollBorder() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) return null;

  const stripStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width: 36,
    height: "100vh",
    backgroundColor: "#080808",
    zIndex: 100,
    overflow: "hidden",
    pointerEvents: "none",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <>
      {/* Left */}
      <div style={{ ...stripStyle, left: 0, borderRight: "1px solid #1a1a14", boxShadow: "2px 0 16px #b8860b22" }}>
        <FilmStrip />
      </div>

      {/* Right */}
      <div style={{ ...stripStyle, right: 0, borderLeft: "1px solid #1a1a14", boxShadow: "-2px 0 16px #b8860b22" }}>
        <FilmStrip />
      </div>
    </>
  );
}