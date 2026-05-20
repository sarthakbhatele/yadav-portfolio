// "use client";
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const IMAGES = [
//   "https://picsum.photos/seed/puzzle1/800/800",
//   "https://picsum.photos/seed/puzzle2/800/800",
//   "https://picsum.photos/seed/puzzle3/800/800",
//   "https://picsum.photos/seed/puzzle4/800/800",
// ];

// export default function StillShots() {
//   const [photos, setPhotos] = useState<string[]>([]);
//   const [solved, setSolved] = useState(false);
//   const [timeElapsed, setTimeElapsed] = useState(0);

//   useEffect(() => {
//     const shuffled = [...IMAGES].sort(() => 0.5 - Math.random());
//     setPhotos(shuffled.slice(0, 2));

//     const interval = setInterval(() => {
//       setTimeElapsed(prev => prev + 1);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSolve = () => setSolved(true);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s.toString().padStart(2, "0")}`;
//   };

//   if (photos.length === 0) return null;

//   return (
//     <section className="relative w-full min-h-screen bg-[#0a1520] py-32 overflow-hidden z-20 flex items-center">
//       <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">

//         {/* Left Side: Original Photo */}
//         <div className="relative w-full aspect-square bg-[#050d12] rounded-xl overflow-hidden shadow-2xl border border-white/5 p-4 flex flex-col group">
//           <div className="absolute inset-0 flex flex-col p-8 z-10 pointer-events-none">
//             <h2 className="text-[#f0e6d0] text-3xl md:text-5xl font-black uppercase tracking-widest mb-2 drop-shadow-lg">Still Shots</h2>
//             <p className="text-[#c8b99a] text-lg font-light italic drop-shadow-md">The Reference</p>
//           </div>
//           <div className="absolute inset-0 bg-gradient-to-b from-[#0a1520]/80 to-transparent z-0 pointer-events-none" />
//           <img src={photos[0]} alt="Original" className="w-full h-full object-cover rounded-lg opacity-80 group-hover:scale-105 transition-transform duration-700" />
//         </div>

//         {/* Right Side: Puzzle */}
//         <div className="relative w-full aspect-square bg-[#050d12]/50 rounded-xl border border-[#3ecfb0]/20 flex flex-col items-center justify-center p-8 overflow-hidden shadow-[0_0_50px_rgba(62,207,176,0.05)]">
//           <div className="flex justify-between w-full mb-6 z-10">
//             <span className="text-[#c8b99a] font-mono tracking-widest uppercase text-sm bg-[#050d12] px-4 py-2 rounded-full border border-white/10">
//               {solved ? `Solved in ${formatTime(timeElapsed)}` : `Time: ${formatTime(timeElapsed)}`}
//             </span>
//             {!solved && (
//               <button onClick={handleSolve} className="text-[#3ecfb0] text-sm uppercase tracking-widest hover:text-[#050d12] transition-colors bg-[#050d12] hover:bg-[#3ecfb0] px-4 py-2 rounded-full border border-[#3ecfb0]/50 hover:border-[#3ecfb0] shadow-[0_0_15px_rgba(62,207,176,0.2)]">
//                 Auto-Solve
//               </button>
//             )}
//           </div>

//           <div className="relative w-full aspect-square max-w-[400px]">
//             {/* Background grid */}
//             <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 opacity-20 border border-[#3ecfb0]/50 p-1">
//               <div className="border border-dashed border-[#3ecfb0]" />
//               <div className="border border-dashed border-[#3ecfb0]" />
//               <div className="border border-dashed border-[#3ecfb0]" />
//               <div className="border border-dashed border-[#3ecfb0]" />
//             </div>

//             {/* Puzzle Pieces */}
//             <div className="absolute inset-0 p-1">
//               {[0, 1, 2, 3].map((i) => {
//                 const row = Math.floor(i / 2);
//                 const col = i % 2;
//                 const initialX = solved ? 0 : (Math.random() - 0.5) * 150;
//                 const initialY = solved ? 0 : (Math.random() - 0.5) * 150;
//                 const initialRot = solved ? 0 : (Math.random() - 0.5) * 60;

//                 return (
//                   <motion.div
//                     key={i}
//                     animate={{
//                       x: solved ? 0 : initialX,
//                       y: solved ? 0 : initialY,
//                       rotate: solved ? 0 : initialRot,
//                       scale: solved ? 1 : 0.95,
//                     }}
//                     transition={{ type: "spring", stiffness: 80, damping: 15 }}
//                     drag={!solved}
//                     dragSnapToOrigin={false}
//                     className="absolute w-[calc(50%-2px)] h-[calc(50%-2px)] overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 shadow-xl bg-black rounded-sm"
//                     style={{
//                       top: `${row * 50}%`,
//                       left: `${col * 50}%`,
//                       zIndex: solved ? 1 : 10,
//                     }}
//                   >
//                     <img
//                       src={photos[1]}
//                       alt={`Piece ${i}`}
//                       className="absolute w-[200%] h-[200%] object-cover max-w-none pointer-events-none"
//                       style={{
//                         top: `${-row * 100}%`,
//                         left: `${-col * 100}%`,
//                       }}
//                     />
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {solved && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="absolute inset-0 flex items-center justify-center bg-[#3ecfb0]/10 backdrop-blur-sm rounded-lg border border-[#3ecfb0]/30 pointer-events-none z-20"
//               >
//                 <span className="text-[#f0e6d0] text-2xl md:text-3xl font-black uppercase tracking-widest mix-blend-overlay drop-shadow-2xl">
//                   Masterpiece
//                 </span>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// v2
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "next-sanity";

// ── Sanity client ─────────────────────────────────────────────────────────────
const client = createClient({
  projectId: "lbhxsnfr",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ── Types ─────────────────────────────────────────────────────────────────────
interface CloudinaryAsset {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

interface ImageDocument {
  _id: string;
  title: string;
  description?: string;
  order: number;
  image: CloudinaryAsset;
}

// ── Sliding Puzzle Logic ──────────────────────────────────────────────────────
const GRID = 3;
const TOTAL = GRID * GRID;
const SOLVED_STATE = Array.from({ length: TOTAL }, (_, i) => i);

function isSolved(tiles: number[]): boolean {
  return tiles.every((t, i) => t === i);
}

function getNeighbors(index: number): number[] {
  const neighbors: number[] = [];
  const row = Math.floor(index / GRID);
  const col = index % GRID;
  if (row > 0) neighbors.push(index - GRID);
  if (row < GRID - 1) neighbors.push(index + GRID);
  if (col > 0) neighbors.push(index - 1);
  if (col < GRID - 1) neighbors.push(index + 1);
  return neighbors;
}

function shuffle(tiles: number[]): number[] {
  const arr = [...tiles];
  let emptyIdx = arr.indexOf(TOTAL - 1);
  for (let i = 0; i < 200; i++) {
    const neighbors = getNeighbors(emptyIdx);
    const swapIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
    [arr[emptyIdx], arr[swapIdx]] = [arr[swapIdx], arr[emptyIdx]];
    emptyIdx = swapIdx;
  }
  return arr;
}

// ── SlidingPuzzle ─────────────────────────────────────────────────────────────
interface SlidingPuzzleProps {
  imageUrl: string;
  imageTitle: string;
  onSolved: (time: number) => void;
}

function SlidingPuzzle({ imageUrl, imageTitle, onSolved }: SlidingPuzzleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [tiles, setTiles] = useState<number[]>(() => shuffle(SOLVED_STATE));
  const [moves, setMoves] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [solved, setSolved] = useState<boolean>(false);
  const [solvedTime, setSolvedTime] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false); // ← key state

  // IntersectionObserver — start timer only when puzzle is in view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // only trigger once
          }
        });
      },
      { threshold: 0.5 } // 50% of puzzle visible before starting
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Timer — only runs when visible and not solved
  useEffect(() => {
    if (!isVisible || solved) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isVisible, solved]);

  const handleTileClick = useCallback(
    (clickedIdx: number) => {
      if (solved) return;
      const emptyIdx = tiles.indexOf(TOTAL - 1);
      const neighbors = getNeighbors(emptyIdx);
      if (!neighbors.includes(clickedIdx)) return;

      setTiles((prev) => {
        const next = [...prev];
        [next[emptyIdx], next[clickedIdx]] = [next[clickedIdx], next[emptyIdx]];
        if (isSolved(next)) {
          setSolved(true);
          setSolvedTime(timeElapsed);
          onSolved(timeElapsed);
        }
        return next;
      });
      setMoves((m) => m + 1);
    },
    [tiles, solved, timeElapsed, onSolved]
  );

  const handleAutoSolve = useCallback(() => {
    setTiles(SOLVED_STATE);
    setSolved(true);
    setSolvedTime(timeElapsed);
    onSolved(timeElapsed);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [timeElapsed, onSolved]);

  const handleReset = useCallback(() => {
    setTiles(shuffle(SOLVED_STATE));
    setMoves(0);
    setTimeElapsed(0);
    setSolved(false);
    setSolvedTime(0);
  }, []);

  const formatTime = (s: number): string => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const tileSize = 100 / GRID;

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 w-full">
      {/* Stats bar */}
      <div className="flex justify-between w-full max-w-[420px] px-1">
        <span className="font-mono text-xs tracking-widest text-[#c8b99a] uppercase">
          {solved
            ? `✓ Solved in ${formatTime(solvedTime)}`
            : isVisible
              ? `⏱ ${formatTime(timeElapsed)}`
              : `⏱ 0:00`}
        </span>
        <span className="font-mono text-xs tracking-widest text-[#3ecfb0] uppercase">
          {moves} moves
        </span>
      </div>

      {/* Puzzle grid */}
      <div
        className="relative rounded-lg overflow-hidden border border-[#3ecfb0]/20 shadow-[0_0_40px_rgba(62,207,176,0.08)]"
        style={{ width: "min(420px, 90vw)", height: "min(420px, 90vw)" }}
      >
        {tiles.map((tileValue, position) => {
          const isEmpty = tileValue === TOTAL - 1;
          const tileRow = Math.floor(tileValue / GRID);
          const tileCol = tileValue % GRID;
          const posRow = Math.floor(position / GRID);
          const posCol = position % GRID;
          const isMovable = getNeighbors(tiles.indexOf(TOTAL - 1)).includes(position);

          if (isEmpty) {
            return (
              <div
                key="empty"
                className="absolute bg-[#050d12] border border-[#3ecfb0]/10"
                style={{
                  width: `${tileSize}%`,
                  height: `${tileSize}%`,
                  top: `${posRow * tileSize}%`,
                  left: `${posCol * tileSize}%`,
                }}
              />
            );
          }

          return (
            <motion.div
              key={tileValue}
              layout
              animate={{
                top: `${posRow * tileSize}%`,
                left: `${posCol * tileSize}%`,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              onClick={() => handleTileClick(position)}
              className={`absolute overflow-hidden border border-[#050d12]/60 ${solved
                ? "cursor-default"
                : isMovable
                  ? "cursor-pointer hover:brightness-110 hover:border-[#3ecfb0]/40"
                  : "cursor-not-allowed"
                }`}
              style={{
                width: `${tileSize}%`,
                height: `${tileSize}%`,
              }}
            >
              <div
                className="absolute"
                style={{
                  width: `${GRID * 100}%`,
                  height: `${GRID * 100}%`,
                  top: `${-tileRow * 100}%`,
                  left: `${-tileCol * 100}%`,
                }}
              >
                <Image
                  src={imageUrl}
                  alt={imageTitle}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="420px"
                  priority={false}
                />
              </div>
              {isMovable && !solved && (
                <div className="absolute inset-0 bg-[#3ecfb0]/5 pointer-events-none" />
              )}
            </motion.div>
          );
        })}

        {/* Solved overlay */}
        <AnimatePresence>
          {solved && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-[#050d12]/70 backdrop-blur-sm z-20 pointer-events-none"
            >
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="text-[#3ecfb0] text-4xl font-black uppercase tracking-widest"
              >
                Solved
              </motion.span>
              <span className="text-[#c8b99a] font-mono text-sm mt-2 tracking-widest">
                {moves} moves · {formatTime(solvedTime)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-3">
        {!solved && (
          <button
            type="button"
            onClick={handleAutoSolve}
            className="text-[#3ecfb0] text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#3ecfb0]/40 hover:bg-[#3ecfb0] hover:text-[#050d12] transition-colors"
          >
            Auto-solve
          </button>
        )}
        <button
          type="button"
          onClick={handleReset}
          className="text-[#c8b99a] text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[#c8b99a]/30 hover:bg-[#c8b99a]/10 transition-colors"
        >
          Shuffle again
        </button>
      </div>
    </div>
  );
}

// ── StillShots ────────────────────────────────────────────────────────────────
export default function StillShots() {
  const [images, setImages] = useState<ImageDocument[]>([]);
  const [puzzleImageIndex, setPuzzleImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [solvedInfo, setSolvedInfo] = useState<{ solved: boolean; time: number }>({
    solved: false,
    time: 0,
  });
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchImages = async (): Promise<void> => {
      try {
        const data = await client.fetch<ImageDocument[]>(
          `*[_type == "imageItem" && featured == true] | order(order asc) {
            _id,
            title,
            description,
            order,
            image {
              secure_url,
              public_id,
              width,
              height
            }
          }`
        );
        setImages(data);
        if (data.length > 0) {
          setPuzzleImageIndex(Math.floor(Math.random() * data.length));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleSolved = useCallback((time: number) => {
    setSolvedInfo({ solved: true, time });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // auto-dismiss after 3s
  }, []);

  if (loading) {
    return (
      <section className="relative w-full min-h-screen bg-[#0a1520] flex items-center justify-center">
        <p className="text-[#c8b99a] font-mono text-sm tracking-widest animate-pulse uppercase">
          Loading...
        </p>
      </section>
    );
  }

  if (images.length === 0) return null;

  const puzzleImage = images[puzzleImageIndex];

  return (
    <section className="relative w-full bg-[#0a1520] py-32 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center md:text-left">
        <h2 className="text-[#f0e6d0] text-[4rem] md:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] mb-4">
          <span className="font-light italic text-[#3ecfb0] pr-4 lowercase">Still</span>
          <span>Shots</span>
        </h2>
        <p className="text-[#c8b99a] text-xl font-medium tracking-wide">
          Moments frozen in time.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
        {images.map((img, idx) => {
          const isPuzzleImage = img._id === puzzleImage._id;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={img._id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-10 md:gap-16 items-center`}
            >
              {/* Photo */}
              <div className="w-full md:w-1/2 relative aspect-square rounded-xl overflow-hidden border border-white/5 shadow-2xl group">
                <Image
                  src={img.image.secure_url}
                  alt={img.title}
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1520]/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[#3ecfb0] text-xs uppercase tracking-widest font-mono mb-1">
                    {String(idx + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-[#f0e6d0] text-2xl font-black uppercase tracking-widest">
                    {img.title}
                  </h3>
                  {img.description && (
                    <p className="text-[#c8b99a] text-sm mt-1 max-w-xs">{img.description}</p>
                  )}
                </div>
              </div>

              {/* Right side */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                {isPuzzleImage ? (
                  <div className="w-full flex flex-col items-center gap-4">
                    <div className="text-center mb-2">
                      <span className="text-[#3ecfb0] font-mono text-xs uppercase tracking-widest">
                        Can you solve it?
                      </span>
                      <p className="text-[#c8b99a] text-sm mt-1">
                        Slide the tiles to reconstruct the shot
                      </p>
                    </div>
                    <SlidingPuzzle
                      imageUrl={img.image.secure_url}
                      imageTitle={img.title}
                      onSolved={handleSolved}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 px-4 md:px-8">
                    <div className="w-12 h-px bg-[#3ecfb0]" />
                    <h3 className="text-[#f0e6d0] text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                      {img.title}
                    </h3>
                    {img.description && (
                      <p className="text-[#c8b99a] text-lg leading-relaxed font-light">
                        {img.description}
                      </p>
                    )}
                    <span className="text-[#3ecfb0]/50 font-mono text-xs uppercase tracking-widest">
                      Still · {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Solved toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 right-8 z-50 bg-[#050d12] border border-[#3ecfb0]/40 rounded-xl px-6 py-4 shadow-[0_0_30px_rgba(62,207,176,0.2)]"
          >
            <p className="text-[#3ecfb0] font-mono text-sm uppercase tracking-widest">
              🎞 Puzzle solved!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}