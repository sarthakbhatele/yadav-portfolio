"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, useTransform } from "framer-motion";

export default function HeroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedFrames, setLoadedFrames] = useState(0);
  const [totalFrames, setTotalFrames] = useState(240);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const fadeOverlayOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  useEffect(() => {
    if (isMobile && videoRef.current) {
      videoRef.current.muted = true; // Force mute to bypass autoplay restrictions
      videoRef.current.play().catch(console.error);
    }
  }, [isMobile]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === null || isMobile) return; // Skip frame loading if mobile

    const currentTotalFrames = 240;
    const frameDir = "frames_mp";
    
    setTotalFrames(currentTotalFrames);

    let loadCount = 0;
    imagesRef.current = new Array(currentTotalFrames).fill(null);
    setLoadedFrames(0);

    const loadFrame = (i: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        const paddedIndex = i.toString().padStart(4, "0");
        img.src = `/${frameDir}/frame_${paddedIndex}.jpg`;
        
        img.onload = () => {
          loadCount++;
          setLoadedFrames(loadCount);
          imagesRef.current[i - 1] = img;
          if (i === 1) drawFrame(img);
          resolve();
        };
        
        img.onerror = () => resolve(); // Ignore failures, just resolve
      });
    };

    const loadAll = async () => {
      // 1. Load the first 10 frames sequentially (prioritize initial render)
      for (let i = 1; i <= Math.min(10, currentTotalFrames); i++) {
        await loadFrame(i);
      }
      
      // 2. Load the rest in small batches of 5 to not choke the browser network
      for (let i = 11; i <= currentTotalFrames; i += 5) {
        const batch = [];
        for (let j = 0; j < 5 && i + j <= currentTotalFrames; j++) {
          batch.push(loadFrame(i + j));
        }
        await Promise.all(batch);
      }
    };

    loadAll();
  }, [isMobile]);

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || isMobile) return;
    const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: false });
    if (!ctx) return;

    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    // Bias toward top: only 10% of overflow is above (vs 50% centered), hides bottom watermark
    const centerShift_y = (canvas.height - img.height * ratio) * 0.1;

    ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    if (isMobile === null || isMobile) return;
    let rafId: number;
    const resizeCanvas = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          const frameIndex = Math.min(totalFrames - 1, Math.floor(scrollYProgress.get() * totalFrames));
          let img = imagesRef.current[frameIndex];
          if (!img || !img.complete) {
            for (let i = frameIndex - 1; i >= 0; i--) {
              if (imagesRef.current[i] && imagesRef.current[i].complete) { img = imagesRef.current[i]; break; }
            }
          }
          if (img && img.complete) drawFrame(img);
        }
      });
    };
    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();
    return () => { window.removeEventListener("resize", resizeCanvas); cancelAnimationFrame(rafId); };
  }, [scrollYProgress, totalFrames, isMobile]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isMobile === null || isMobile) return;
    const frameIndex = Math.floor(latest * (totalFrames - 1));
    let img = imagesRef.current[frameIndex];
    
    // Robust Fallback: If exact frame isn't loaded yet, find the closest previously loaded frame
    if (!img || !img.complete) {
      for (let i = frameIndex - 1; i >= 0; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete) {
          img = imagesRef.current[i];
          break;
        }
      }
    }

    if (img && img.complete) {
      requestAnimationFrame(() => drawFrame(img));
    }
  });

  return (
    <section ref={containerRef} className="relative w-full bg-[#1a1208]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dark gradient vignette over the video for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/60 via-transparent to-[#1a1208]/80 z-10 pointer-events-none" />
        
        {isMobile !== null && isMobile ? (
          <video 
            ref={videoRef}
            src="/yadav.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-90" 
          />
        ) : (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover opacity-90" />
        )}

        {/* Warm amber tint overlay */}
        <div className="absolute inset-0 bg-[#c47d2e]/20 z-10 pointer-events-none" />
        
        {/* Smooth transition overlay fading into next section's background (#0d0d0d) */}
        <motion.div 
          style={{ opacity: fadeOverlayOpacity }} 
          className="absolute inset-0 bg-[#0d1a1f] z-10 pointer-events-none" 
        />

        {/* Loading - Only render on PC */}
        {isMobile === false && loadedFrames < 10 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1208] z-20">
            <div className="w-40 h-px bg-[#e8b06a]/20 mb-4 overflow-hidden">
              <div
                className="h-full bg-[#e8b06a] transition-all duration-300"
                style={{ width: `${Math.floor((loadedFrames / totalFrames) * 100)}%` }}
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#c8b99a]/50 uppercase">
              Loading {Math.floor((loadedFrames / totalFrames) * 100)}%
            </span>
          </div>
        )}
      </div>

      <div className="relative z-10 w-full -mt-[100vh] pointer-events-none">
        {/* ── SECTION 1 ── */}
        <div className="h-screen flex flex-col justify-end md:justify-end pb-48 md:pb-20 px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-start md:items-end text-left md:text-right"
          >
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.4em] text-[#e8b06a] uppercase mb-4 md:mb-6 border-l-2 border-[#e8b06a] pl-3 md:border-none md:pl-0">
              Filmmaker · Videographer · Editor
            </span>
            <h1 className="text-[5.5rem] sm:text-[7rem] md:text-[clamp(4rem,14vw,12rem)] tracking-tighter leading-[0.8] text-[#f0e6d0] flex flex-col items-start md:items-end">
              <span className="font-light italic pr-2">Sarthak</span>
              <span className="font-black uppercase">Yadav</span>
            </h1>
          </motion.div>
        </div>

        {/* ── SECTION 2 ── */}
        <div className="h-screen flex flex-col justify-center px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-start max-w-3xl"
          >
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.4em] text-[#e8b06a] uppercase mb-4 md:mb-6 border-l-2 border-[#e8b06a] pl-3 md:border-none md:pl-0">
              02 — Focus
            </span>
            <h2 className="text-[4rem] sm:text-[6rem] md:text-[clamp(3rem,10vw,8rem)] tracking-tighter leading-[0.85] text-[#f0e6d0] mb-6 flex flex-col items-start">
              <span className="font-light italic pl-1">Capture</span>
              <span className="font-black uppercase">Stories</span>
            </h2>
            <p className="text-lg md:text-xl text-[#c8b99a] font-medium leading-relaxed max-w-sm md:max-w-lg">
              Raw cinematic. Aesthetic and moody. Storytelling-driven.
            </p>
          </motion.div>
        </div>

        {/* ── SECTION 3 ── */}
        <div className="h-screen flex flex-col justify-end md:justify-center items-start md:items-end pb-48 md:pb-0 px-6 md:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            className="flex flex-col items-start md:items-end text-left md:text-right max-w-2xl"
          >
            <span className="font-mono text-[11px] md:text-[12px] tracking-[0.4em] text-[#e8b06a] uppercase mb-4 md:mb-6 border-l-2 border-[#e8b06a] pl-3 md:border-none md:pl-0">
              03 — Ethos
            </span>
            <h2 className="text-[4.5rem] sm:text-[6rem] md:text-[clamp(3rem,10vw,8rem)] tracking-tighter leading-[0.85] text-[#f0e6d0] mb-6 flex flex-col items-start md:items-end">
              <span className="font-light italic pr-1">Find</span>
              <span className="font-black uppercase">Frames</span>
            </h2>
            <p className="text-lg md:text-xl text-[#c8b99a] font-medium leading-relaxed max-w-sm md:max-w-full">
              Some stories are captured. Some are felt.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
