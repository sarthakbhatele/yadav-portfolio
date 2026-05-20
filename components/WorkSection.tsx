// v2
"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { createClient } from "next-sanity";

// ── Sanity client ────────────────────────────────────────────────────────────
const client = createClient({
  projectId: "lbhxsnfr",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// ── Types ────────────────────────────────────────────────────────────────────
interface CloudinaryAsset {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
  width: number;
  height: number;
  duration: number | null;
}

interface VideoDocument {
  _id: string;
  title: string;
  description?: string;
  order: number;
  video: CloudinaryAsset;
}

// ── Cloudinary URL helpers ───────────────────────────────────────────────────
function getThumbnailUrl(secureUrl: string): string {
  return secureUrl.replace("/upload/", "/upload/so_0,q_auto,f_jpg,w_1280/");
}

function getPreviewUrl(secureUrl: string): string {
  return secureUrl.replace("/upload/", "/upload/du_3,q_auto:low,w_1280/");
}

// ── Types ────────────────────────────────────────────────────────────────────
type HoverState = "idle" | "preview" | "playing";

interface VideoItemProps {
  video: VideoDocument;
  index: number;
}

// ── VideoItem ────────────────────────────────────────────────────────────────
function VideoItem({ video, index }: VideoItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hoverState, setHoverState] = useState<HoverState>("idle");
  const [previewLoaded, setPreviewLoaded] = useState<boolean>(false);

  const thumbnailUrl = getThumbnailUrl(video.video.secure_url);
  const previewUrl = getPreviewUrl(video.video.secure_url);
  const fullUrl = video.video.secure_url;

  // Click btn toggles play/pause (fallback)
  const handleClick = useCallback(() => {
    setHoverState((prev) => (prev === "playing" ? "preview" : "playing"));
  }, []);

  // Hover → auto-play with sound (full video)
  const handleMouseEnter = useCallback(() => {
    setHoverState("playing");
  }, []);

  // Leave → mute + pause, back to idle
  const handleMouseLeave = useCallback(() => {
    setHoverState("idle");
  }, []);

  // Control playback & sound based on hoverState
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (hoverState === "playing") {
      vid.muted = false;
      vid.play().catch(() => {
        // Autoplay with sound blocked → fall back to muted
        vid.muted = true;
        vid.play().catch(() => { });
      });
    } else if (hoverState === "preview") {
      vid.muted = true;
      vid.play().catch(() => { });
    } else {
      // idle
      vid.pause();
      vid.muted = true;
      vid.currentTime = 0;
    }
  }, [hoverState, previewLoaded]);

  const isPlaying = hoverState === "playing";
  const showVideo = hoverState === "preview" || hoverState === "playing";
  // On hover we jump straight to full video with sound; preview state kept for btn fallback path
  const currentSrc = isPlaying ? fullUrl : previewUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex-shrink-0 w-[80vw] max-w-[900px] h-[65vh] rounded-2xl overflow-hidden group cursor-pointer border border-white/5 transition-all duration-700 hover:border-[#3ecfb0]/40 hover:shadow-[0_0_80px_rgba(62,207,176,0.18)]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbnailUrl}
        alt={video.title}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showVideo ? "opacity-0" : "opacity-100"
          }`}
        loading="lazy"
      />

      {/* Video */}
      {showVideo && (
        <video
          ref={videoRef}
          key={currentSrc}
          src={currentSrc}
          loop
          playsInline
          onCanPlay={() => setPreviewLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d12] via-[#050d12]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

      {/* Info + controls */}
      <div className="absolute bottom-7 left-7 right-7 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <div>
          <p className="text-[#3ecfb0] text-xs uppercase tracking-widest mb-2 font-medium">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="text-[#f0e6d0] text-2xl md:text-4xl font-light uppercase tracking-widest drop-shadow-xl">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-[#c8b99a] text-sm mt-2 max-w-sm">{video.description}</p>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="w-12 h-12 rounded-full border border-[#c8b99a]/50 flex items-center justify-center text-[#c8b99a] hover:bg-[#3ecfb0] hover:text-[#050d12] hover:border-[#3ecfb0] transition-colors backdrop-blur-md shadow-lg flex-shrink-0 ml-4"
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>
      </div>

      {/* Sound-on badge */}
      {hoverState === "playing" && (
        <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-[#3ecfb0]/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3ecfb0] animate-pulse" />
          <span className="text-[#3ecfb0] text-xs uppercase tracking-widest">Live</span>
        </div>
      )}
    </motion.div>
  );
}

// ── WorkSection ──────────────────────────────────────────────────────────────
export default function WorkSection() {
  const [videos, setVideos] = useState<VideoDocument[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ── Horizontal scroll setup ──────────────────────────────────────────────
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // We'll compute translateX dynamically once strip width is known
  const [stripWidth, setStripWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (stripRef.current) {
        setStripWidth(stripRef.current.scrollWidth);
        setViewportWidth(window.innerWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [videos]);

  // Translate from 0 → -(totalScrollable) as scrollYProgress goes 0 → 1
  const maxTranslate = stripWidth - viewportWidth;
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -Math.max(maxTranslate, 0)]
  );

  // ── Fetch ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchVideos = async (): Promise<void> => {
      try {
        const data = await client.fetch<VideoDocument[]>(
          `*[_type == "videoItem" && featured == true] | order(order asc) {
            _id,
            title,
            description,
            order,
            video {
              secure_url,
              public_id,
              resource_type,
              format,
              width,
              height,
              duration
            }
          }`
        );
        setVideos(data);
      } catch (err) {
        setError("Failed to load videos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Section height: tall enough to give scroll room for all cards
  // Each card is ~80vw wide; we add generous scroll room
  const scrollHeight = `${Math.max(videos.length * 100, 300)}vh`;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050d12] z-20"
      style={{ height: scrollHeight }}
    >
      {/* Sticky viewport — stays in view while section scrolls */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Header */}
        <div className="px-8 md:px-16 pt-16 pb-8 flex-shrink-0">
          <h2 className="text-[#f0e6d0] text-[3rem] md:text-[5rem] font-black uppercase tracking-tighter leading-[0.85] mb-2">
            <span className="font-light italic text-[#3ecfb0] pr-3 lowercase">The</span>
            <span>Work</span>
          </h2>
          <p className="text-[#c8b99a] text-lg md:text-xl font-medium tracking-wide">
            Windows into another world.
          </p>
        </div>

        {/* Horizontal strip */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={stripRef}
            style={{ translateX }}
            className="flex flex-row items-center gap-8 pl-8 md:pl-16 pr-8 md:pr-16 h-full"
          >
            {loading && (
              <p className="text-[#c8b99a] text-lg tracking-widest animate-pulse flex-shrink-0 pl-8">
                Loading...
              </p>
            )}

            {error && (
              <p className="text-red-400 text-lg flex-shrink-0">{error}</p>
            )}

            {!loading && !error && videos.length === 0 && (
              <p className="text-[#c8b99a] text-lg tracking-widest flex-shrink-0">
                No videos yet.
              </p>
            )}

            {!loading &&
              !error &&
              videos.map((video, idx) => (
                <VideoItem key={video._id} video={video} index={idx} />
              ))}
          </motion.div>
        </div>

        {/* Scroll hint — fades out once user starts scrolling */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-8 right-10 flex items-center gap-3 text-[#c8b99a]/60"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <svg width="32" height="10" viewBox="0 0 32 10" fill="none">
            <path d="M0 5h30M26 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-[#3ecfb0]/60 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </section>
  );
}