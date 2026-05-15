"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FilmRollBorder() {
  return (
    <>
      {/* Left Border */}
      <div className="fixed top-0 left-0 w-[40px] h-screen bg-[#0a0a0a] z-[100] flex overflow-hidden pointer-events-none border-r border-[#1a1a1a]">
        <motion.div
          className="flex flex-col w-full"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex justify-center items-center my-4 h-6">
              <div className="w-4 h-6 bg-[#e8b06a] rounded-[2px] opacity-70" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right Border */}
      <div className="fixed top-0 right-0 w-[40px] h-screen bg-[#0a0a0a] z-[100] flex overflow-hidden pointer-events-none border-l border-[#1a1a1a]">
        <motion.div
          className="flex flex-col w-full"
          animate={{ y: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex justify-center items-center my-4 h-6">
              <div className="w-4 h-6 bg-[#e8b06a] rounded-[2px] opacity-70" />
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
