"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// A mock vintage camera constructed from basic Three.js primitives
function VintageCamera() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.15;
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={group} scale={1.2}>
      {/* Camera Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 1.2]} />
        <meshStandardMaterial color="#222" roughness={0.8} metalness={0.2} />
      </mesh>
      
      {/* Leather/Grip texture areas (simulated with dark gray/black) */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[2.8, 1.8, 1.2]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      
      {/* Silver trim top */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3.05, 0.25, 1.25]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.3} metalness={0.8} />
      </mesh>
      
      {/* Silver trim bottom */}
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[3.05, 0.25, 1.25]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main Lens Mount */}
      <mesh position={[0, 0, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.2, 32]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Main Lens Barrel */}
      <mesh position={[0, 0, 0.9]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
        <meshStandardMaterial color="#111" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Lens Glass */}
      <mesh position={[0, 0, 1.21]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#050505" roughness={0} metalness={1} envMapIntensity={2} />
      </mesh>
      
      {/* Flash / Viewfinder block top */}
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[1, 0.4, 0.8]} />
        <meshStandardMaterial color="#d4d4d4" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Viewfinder Glass Front */}
      <mesh position={[0, 1.4, 0.41]}>
        <planeGeometry args={[0.4, 0.2]} />
        <meshStandardMaterial color="#050505" roughness={0} metalness={1} />
      </mesh>

      {/* Shutter Button */}
      <mesh position={[1.2, 1.25, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
        <meshStandardMaterial color="#a0a0a0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Winding Dial */}
      <mesh position={[0.6, 1.25, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
        <meshStandardMaterial color="#333" roughness={0.6} metalness={0.5} />
      </mesh>
      
      {/* ISO/Film Dial */}
      <mesh position={[-1.1, 1.25, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.15, 16]} />
        <meshStandardMaterial color="#222" roughness={0.6} metalness={0.5} />
      </mesh>
    </group>
  );
}

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background color deepens from #0d1a1f to #050d12
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    ["#0d1a1f", "#081116", "#050d12"]
  );

  // Reflected light from hero dims as you enter
  const lightOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative w-full min-h-[120vh] py-32 overflow-hidden flex items-center justify-center z-20"
    >
      {/* Reflected light from hero (dimming effect) */}
      <motion.div
        style={{ opacity: lightOpacity }}
        className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-[#0d1a1f] via-[#0d1a1f]/50 to-transparent pointer-events-none z-10"
      />

      {/* Film grain overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: grainSvg }}
      />

      {/* Container - center aligned, max width */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Text content */}
        <div className="flex flex-col space-y-8 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="text-[#f0e6d0] text-[4rem] md:text-[5rem] lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85] mb-2 flex flex-col">
              <span className="font-light italic text-[#4a9aaa] text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] pr-2 lowercase">the</span>
              <span>Director</span>
            </h2>
            <div className="w-16 h-1 bg-[#4a9aaa] mt-8 mb-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-6 text-[#c8b99a] text-lg md:text-xl font-medium leading-relaxed max-w-lg"
          >
            <p>
              Filmmaker. Traveler. Guitarist. A man of quiet complexity who observes the world in cinematic frames.
            </p>
            <p>
              I believe that every journey has a rhythm, every shadow holds a story, and every chord resonates with the unspoken.
            </p>
            <p>
              My work is an exploration of the spaces between moments—the raw, the moody, and the aesthetically profound.
            </p>
          </motion.div>
        </div>

        {/* Right Column: 3D Camera */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="h-[400px] md:h-[600px] lg:h-[700px] w-full relative order-1 md:order-2 cursor-grab active:cursor-grabbing"
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={45} />
            <ambientLight intensity={0.6} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#f0e6d0" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#4a9aaa" />
            <Float
              speed={2.5} 
              rotationIntensity={1} 
              floatIntensity={1.5} 
            >
              <VintageCamera />
            </Float>
            <Environment preset="city" />
          </Canvas>
        </motion.div>
        
      </div>
    </motion.section>
  );
}
