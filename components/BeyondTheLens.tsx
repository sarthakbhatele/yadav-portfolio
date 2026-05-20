"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BeyondTheLens() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#3d2810] to-[#1e3040] py-32 overflow-hidden z-20 flex items-center">
      <div className="absolute inset-0 bg-[url('/images/grain.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 h-[80vh]">
        
        {/* Left Side: Guitar */}
        <div className="flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#e8b06a]/20 p-8 md:p-16 relative overflow-hidden group h-full">
          <div className="absolute inset-0 bg-[#3d2810]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
          
          <h2 className="text-[#f0e6d0] text-[4rem] lg:text-[5rem] font-black uppercase tracking-tighter leading-none mb-8 z-10 relative">
            <span className="font-light italic text-[#e8b06a] text-[3rem] lg:text-[4rem] pr-2 lowercase">the</span>
            Strings
          </h2>
          <p className="text-[#c8b99a] text-xl md:text-2xl font-medium leading-relaxed max-w-sm z-10 relative drop-shadow-md">
            Some stories don&apos;t need a frame. They need four chords.
          </p>
          
          {/* Animated Sound Waves */}
          <div className="absolute bottom-16 left-16 right-16 h-32 flex items-center justify-center gap-2 opacity-40 z-0">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 bg-[#e8b06a] rounded-full"
                animate={{ height: ["10%", "100%", "10%"] }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random(),
                }}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Travel */}
        <div className="flex flex-col justify-center p-8 md:p-16 relative overflow-hidden group h-full">
          <div className="absolute inset-0 bg-[#1e3040]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen" />
          
          <h2 className="text-[#f0e6d0] text-[4rem] lg:text-[5rem] font-black uppercase tracking-tighter leading-none mb-8 z-10 relative flex flex-col items-end text-right">
            <span>The</span>
            <span className="font-light italic text-[#3ecfb0] text-[3rem] lg:text-[4rem] lowercase mt-[-10px]">Journey</span>
          </h2>
          <p className="text-[#c8b99a] text-xl md:text-2xl font-medium leading-relaxed max-w-sm ml-auto text-right z-10 relative drop-shadow-md">
            Every place is a frame waiting to be shot.
          </p>

          {/* Film Strip Animation */}
          <div className="absolute top-16 left-0 right-0 h-40 flex gap-4 overflow-hidden opacity-30 rotate-[-5deg] scale-110 z-0 pointer-events-none">
             <motion.div
                className="flex gap-4 shrink-0"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30, repeat: Infinity }}
             >
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-56 h-40 bg-[#0a0a0a] border-[4px] border-[#111] shrink-0 relative flex flex-col justify-between p-1 shadow-2xl">
                    <div className="w-full flex justify-between px-1">
                      {[...Array(5)].map((_, j) => <div key={`t${j}`} className="w-2 h-3 bg-white/30 rounded-sm" />)}
                    </div>
                    <div className="absolute inset-y-4 inset-x-2 bg-[#222] rounded-sm overflow-hidden border border-white/5">
                       <img src={`https://picsum.photos/seed/${i + 20}/200/150`} alt="" className="w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity" />
                    </div>
                    <div className="w-full flex justify-between px-1">
                      {[...Array(5)].map((_, j) => <div key={`b${j}`} className="w-2 h-3 bg-white/30 rounded-sm" />)}
                    </div>
                  </div>
                ))}
             </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
