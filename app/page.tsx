"use client"

import FilmClapLoader from "@/components/FilmClapLoader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WorkSection from "@/components/WorkSection";
import StillShots from "@/components/StillShots";
import BeyondTheLens from "@/components/BeyondTheLens";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [loaderVisible, setLoaderVisible] = useState(true);
  return (
    <>
      <FilmClapLoader
        visible={loaderVisible}
        onComplete={() => {
          setLoaderDone(true);
          // Small delay to let exit animation finish
          setTimeout(() => setLoaderVisible(false), 650);
        }}
      />
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <StillShots />
        <BeyondTheLens />
      </main>
      <Footer />
    </>
  );
}