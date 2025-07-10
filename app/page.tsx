"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MainContent from "@/comp/MainContent";

export default function Home() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Called by MainContent when "Welcome!" starts animating
  const handleWelcomeStart = () => {
    const audio = audioRef.current!;
    // ensure it’s loaded & play silently first
    audio.play().catch(() => {});
    // then unmute and restart so user actually hears it
    audio.muted = false;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return (
    <>
      {!started ? (
        <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
          <Image
            src="/rings.svg"
            alt="Loading rings"
            width={80}
            height={80}
            className="invert"
          />
          <p className="mt-4 uppercase tracking-widest">Patience is a virtue</p>
          <button
            onClick={() => setStarted(true)}
            className="mt-6 px-6 py-2 bg-white text-black rounded-full uppercase tracking-wide hover:bg-gray-200"
          >
            Play Invitation
          </button>
        </div>
      ) : (
        // once started, render the main invite and hand over our callback
        <MainContent onWelcomeStart={handleWelcomeStart} />
      )}

      {/* hidden, muted audio that we’ll unmute when animation fires */}
      <audio ref={audioRef} src="/music/theme.mp3" preload="auto" muted />
    </>
  );
}
