"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mail } from "lucide-react";

export default function Footer() {
  const [flashed, setFlashed] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("work@sarthakyadav.com");
    setFlashed(true);
    setTimeout(() => setFlashed(false), 500);
  };

  return (
    <footer className="relative w-full min-h-[80vh] bg-[#020608] overflow-hidden z-20 flex flex-col justify-end pt-32 pb-8">
      
      {/* Ocean Floor Illustration Background */}
      <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#010304] to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 z-0 opacity-40 pointer-events-none flex items-end justify-around">
        {/* Abstract Rocks */}
        <div className="w-40 h-24 bg-[#0a1114] rounded-t-[120px] blur-sm" />
        <div className="w-80 h-40 bg-[#060a0c] rounded-t-[150px] blur-md ml-12" />
        <div className="w-56 h-32 bg-[#0a1114] rounded-t-[100px] blur-sm" />
      </div>

      {/* Bioluminescent Glow */}
      <div className="absolute bottom-20 left-1/4 w-[500px] h-64 bg-[#3ecfb0] opacity-15 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-32 right-1/4 w-80 h-80 bg-[#3ecfb0] opacity-10 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Animated Fish (Abstract specs) */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`fish-${i}`}
          className="absolute w-3 h-1.5 bg-[#3ecfb0] rounded-full opacity-60 blur-[1px] z-0"
          initial={{ x: "-10vw", y: 100 + Math.random() * 150 }}
          animate={{ x: "110vw", y: 100 + Math.random() * 150 + (Math.random() - 0.5) * 80 }}
          transition={{
            duration: 20 + Math.random() * 25,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 15,
          }}
        />
      ))}

      {/* Flash Effect */}
      <AnimatePresence>
        {flashed && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 bg-white z-50 pointer-events-none mix-blend-screen"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 flex flex-col items-center text-center">
        
        <h3 className="text-[#f0e6d0] text-3xl md:text-5xl font-light italic tracking-widest mb-20 max-w-4xl leading-relaxed">
          "There's no end to the ocean, my curiosity, and my work."
        </h3>

        <button 
          onClick={handleCopyEmail}
          className="group relative flex flex-col items-center justify-center gap-6 cursor-pointer mb-32"
        >
          <div className="w-24 h-24 rounded-full border border-[#4a9aaa]/50 bg-[#0a1520] flex items-center justify-center text-[#3ecfb0] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#3ecfb0] group-hover:text-[#020608] group-hover:shadow-[0_0_50px_rgba(62,207,176,0.5)]">
            <Camera size={40} strokeWidth={1.5} />
          </div>
          <span className="text-[#c8b99a] text-sm md:text-base uppercase tracking-[0.3em] font-medium group-hover:text-[#f0e6d0] transition-colors">
            {flashed ? "Email Copied!" : "Wanna see yourself through my lens? Click here."}
          </span>
        </button>

        {/* Minimal Socials */}
        <div className="w-full flex justify-between items-center border-t border-[#f0e6d0]/10 pt-8 mt-12">
          <span className="text-[#c8b99a]/50 text-xs tracking-widest uppercase">© 2026 Sarthak Yadav</span>
          <div className="flex gap-8">
            {/* <a href="#" className="text-[#c8b99a]/50 hover:text-[#3ecfb0] transition-colors"><Instagram size={20} /></a> */}
            {/* <a href="#" className="text-[#c8b99a]/50 hover:text-[#3ecfb0] transition-colors"><Youtube size={20} /></a> */}
            <a href="#" className="text-[#c8b99a]/50 hover:text-[#3ecfb0] transition-colors"><Mail size={20} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
