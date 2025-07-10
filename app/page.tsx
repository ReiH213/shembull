// app/page.tsx (or pages/index.tsx if not using App Router)
"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import SvgIcon from "@/comp/RIngIcon";
import MainContent, { parisienne } from "@/comp/MainContent";

export default function Home() {
  // User hasn't clicked "Play Invitation" yet?
  const [animationDone, setAnimationDone] = useState(false);
  // After they click the button, we show the main content
  const [started, setStarted] = useState(false);
  // Ref to our hidden audio element
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * Fired when MainContent starts its first animation
   * Unmutes, resets, and plays audio
   */
  const handleWelcomeStart = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Play silently (muted) to satisfy browser autoplay rules
    audio.play().catch(() => {});
    // Then unmute and restart from 0
    audio.muted = false;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return (
    <>
      {/* Rings + "Play Invitation" button screen */}
      {!started ? (
        <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
          <div className="relative w-64 h-64">
            {/* Left ring animating in */}
            <motion.div
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
              initial={{ x: -200, rotate: 0 }}
              animate={{ x: 74, rotate: 420 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onAnimationComplete={() => setAnimationDone(true)}
            >
              <SvgIcon width={64} height={64} className="invert" />
            </motion.div>

            {/* Right ring animating in */}
            <motion.div
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              initial={{ x: 200, rotate: 0 }}
              animate={{ x: -84, rotate: -390 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <SvgIcon width={64} height={64} className="invert" />
            </motion.div>
          </div>

          {/* After rings finish, keep them displayed and show text & button */}
          {animationDone && (
            <div className="flex flex-col items-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className={`${parisienne.className} text-6xl mt-4  tracking-widest`}
              >
                Patience is a virtue
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
                onClick={() => setStarted(true)}
                className="mt-6 px-6 py-2 bg-white text-black rounded-full uppercase tracking-wide hover:bg-gray-200"
              >
                Play Invitation
              </motion.button>
            </div>
          )}
        </div>
      ) : (
        /* Show main invite and start music */
        <MainContent onWelcomeStart={handleWelcomeStart} />
      )}

      {/* Always mount the audio so audioRef.current is never null */}
      <audio ref={audioRef} src="/music/theme.mp3" preload="auto" muted />
    </>
  );
}
