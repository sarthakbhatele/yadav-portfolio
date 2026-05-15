"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const IMAGES = [
  "https://picsum.photos/seed/puzzle1/800/800",
  "https://picsum.photos/seed/puzzle2/800/800",
  "https://picsum.photos/seed/puzzle3/800/800",
  "https://picsum.photos/seed/puzzle4/800/800",
];

export default function StillShots() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const shuffled = [...IMAGES].sort(() => 0.5 - Math.random());
    setPhotos(shuffled.slice(0, 2));
    
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSolve = () => setSolved(true);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  if (photos.length === 0) return null;

  return (
    <section className="relative w-full min-h-screen bg-[#0a1520] py-32 overflow-hidden z-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Side: Original Photo */}
        <div className="relative w-full aspect-square bg-[#050d12] rounded-xl overflow-hidden shadow-2xl border border-white/5 p-4 flex flex-col group">
          <div className="absolute inset-0 flex flex-col p-8 z-10 pointer-events-none">
            <h2 className="text-[#f0e6d0] text-3xl md:text-5xl font-black uppercase tracking-widest mb-2 drop-shadow-lg">Still Shots</h2>
            <p className="text-[#c8b99a] text-lg font-light italic drop-shadow-md">The Reference</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1520]/80 to-transparent z-0 pointer-events-none" />
          <img src={photos[0]} alt="Original" className="w-full h-full object-cover rounded-lg opacity-80 group-hover:scale-105 transition-transform duration-700" />
        </div>

        {/* Right Side: Puzzle */}
        <div className="relative w-full aspect-square bg-[#050d12]/50 rounded-xl border border-[#3ecfb0]/20 flex flex-col items-center justify-center p-8 overflow-hidden shadow-[0_0_50px_rgba(62,207,176,0.05)]">
          <div className="flex justify-between w-full mb-6 z-10">
            <span className="text-[#c8b99a] font-mono tracking-widest uppercase text-sm bg-[#050d12] px-4 py-2 rounded-full border border-white/10">
              {solved ? `Solved in ${formatTime(timeElapsed)}` : `Time: ${formatTime(timeElapsed)}`}
            </span>
            {!solved && (
              <button onClick={handleSolve} className="text-[#3ecfb0] text-sm uppercase tracking-widest hover:text-[#050d12] transition-colors bg-[#050d12] hover:bg-[#3ecfb0] px-4 py-2 rounded-full border border-[#3ecfb0]/50 hover:border-[#3ecfb0] shadow-[0_0_15px_rgba(62,207,176,0.2)]">
                Auto-Solve
              </button>
            )}
          </div>
          
          <div className="relative w-full aspect-square max-w-[400px]">
            {/* Background grid */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 opacity-20 border border-[#3ecfb0]/50 p-1">
              <div className="border border-dashed border-[#3ecfb0]" />
              <div className="border border-dashed border-[#3ecfb0]" />
              <div className="border border-dashed border-[#3ecfb0]" />
              <div className="border border-dashed border-[#3ecfb0]" />
            </div>

            {/* Puzzle Pieces */}
            <div className="absolute inset-0 p-1">
              {[0, 1, 2, 3].map((i) => {
                const row = Math.floor(i / 2);
                const col = i % 2;
                const initialX = solved ? 0 : (Math.random() - 0.5) * 150;
                const initialY = solved ? 0 : (Math.random() - 0.5) * 150;
                const initialRot = solved ? 0 : (Math.random() - 0.5) * 60;

                return (
                  <motion.div
                    key={i}
                    animate={{
                      x: solved ? 0 : initialX,
                      y: solved ? 0 : initialY,
                      rotate: solved ? 0 : initialRot,
                      scale: solved ? 1 : 0.95,
                    }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                    drag={!solved}
                    dragSnapToOrigin={false}
                    className="absolute w-[calc(50%-2px)] h-[calc(50%-2px)] overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 shadow-xl bg-black rounded-sm"
                    style={{
                      top: `${row * 50}%`,
                      left: `${col * 50}%`,
                      zIndex: solved ? 1 : 10,
                    }}
                  >
                    <img
                      src={photos[1]}
                      alt={`Piece ${i}`}
                      className="absolute w-[200%] h-[200%] object-cover max-w-none pointer-events-none"
                      style={{
                        top: `${-row * 100}%`,
                        left: `${-col * 100}%`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
            
            {solved && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-[#3ecfb0]/10 backdrop-blur-sm rounded-lg border border-[#3ecfb0]/30 pointer-events-none z-20"
              >
                <span className="text-[#f0e6d0] text-2xl md:text-3xl font-black uppercase tracking-widest mix-blend-overlay drop-shadow-2xl">
                  Masterpiece
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
