"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VIDEOS = [
  { id: 1, src: "/videos/vid1.mp4", fallback: "/yadav.mp4", title: "Cinematic Reel 01" },
  { id: 2, src: "/videos/vid2.mp4", fallback: "/yadav.mp4", title: "Travel Diary" },
  { id: 3, src: "/videos/vid3.mp4", fallback: "/yadav.mp4", title: "Moments in Time" },
];

function VideoItem({ video, index }: { video: any; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95]);

  // Autoplay when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(() => {});
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.6 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto h-[60vh] md:h-[80vh] my-16 rounded-xl overflow-hidden group cursor-pointer border border-transparent transition-all duration-700 hover:border-[#3ecfb0]/30 hover:shadow-[0_0_60px_rgba(62,207,176,0.15)]"
    >
      <motion.div style={{ scale }} className="w-full h-full origin-center">
        <video
          ref={videoRef}
          src={video.src}
          onError={(e) => {
            (e.target as HTMLVideoElement).src = video.fallback;
          }}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d12] via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />
      
      {/* Controls */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
        <h3 className="text-[#f0e6d0] text-3xl md:text-5xl font-light uppercase tracking-widest drop-shadow-xl">{video.title}</h3>
        <div className="flex gap-4">
          <button 
            onClick={(e) => { e.stopPropagation(); togglePlay(); }} 
            className="w-14 h-14 rounded-full border border-[#c8b99a]/50 flex items-center justify-center text-[#c8b99a] hover:bg-[#3ecfb0] hover:text-[#050d12] hover:border-[#3ecfb0] transition-colors backdrop-blur-md shadow-lg"
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#050d12] py-40 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center md:text-left">
        <h2 className="text-[#f0e6d0] text-[4rem] md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] mb-4">
          <span className="font-light italic text-[#3ecfb0] pr-4 lowercase">The</span>
          <span>Work</span>
        </h2>
        <p className="text-[#c8b99a] text-xl md:text-2xl font-medium tracking-wide">Windows into another world.</p>
      </div>
      <div className="flex flex-col items-center px-6 gap-8">
        {VIDEOS.map((video, idx) => (
          <VideoItem key={video.id} video={video} index={idx} />
        ))}
      </div>
    </section>
  );
}
