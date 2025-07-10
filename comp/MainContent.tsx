// comp/MainContent.tsx
import { motion } from "framer-motion";
import { Parisienne } from "next/font/google";
import Image from "next/image";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import SvgIcon from "./FlowerIcon";

const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type MainContentProps = {
  onWelcomeStart: () => void;
};

const images = [
  { src: "/images/1.jpeg", delay: 16.7 },
  { src: "/images/2.jpeg", delay: 17.3 },
  { src: "/images/3.jpeg", delay: 18.6 },
  { src: "/images/4.jpeg", delay: 20.0 },
  { src: "/images/5.jpeg", delay: 22.0 },
  { src: "/images/3.jpeg", delay: 22.7 },
  { src: "/images/4.jpeg", delay: 24.0 },
  { src: "/images/5.jpeg", delay: 25.3 },
];

export default function MainContent({ onWelcomeStart }: MainContentProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const [started, setStarted] = useState(false);
  const [segments, setSegments] = useState<
    {
      x: number;
      y: number;
      length: number;
      angle: number;
      delay: number;
    }[]
  >([]);

  const ICON_SIZE = 44;

  const handleWelcomeStart = () => {
    onWelcomeStart();
    setStarted(true);
  };

  useLayoutEffect(() => {
    if (!started || !gridRef.current) return;
    const containerRect = gridRef.current.getBoundingClientRect();
    const segs: typeof segments = [];
    images.slice(1).forEach((_, i) => {
      const el1 = imgRefs.current[i];
      const el2 = imgRefs.current[i + 1];
      if (el1 && el2) {
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        const startX = r1.left + r1.width / 2 - containerRect.left;
        const startY = r1.top + r1.height / 2 - containerRect.top;
        const endX = r2.left + r2.width / 2 - containerRect.left;
        const endY = r2.top + r2.height / 2 - containerRect.top;
        const dx = endX - startX;
        const dy = endY - startY;
        const length = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        segs.push({
          x: startX,
          y: startY,
          length,
          angle,
          delay: images[i + 1].delay,
        });
      }
    });
    setSegments(segs);
  }, [started]);

  useEffect(() => {
    if (!started) return;
    images.forEach((img, idx) => {
      setTimeout(() => {
        imgRefs.current[idx]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, img.delay * 1000);
    });
  }, [started]);

  return (
    <section className="relative p-8 bg-black text-white min-h-screen">
      {/* Headings */}
      <div className="flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2 }}
          onAnimationStart={handleWelcomeStart}
          className={`${parisienne.className} text-[90px]`}
        >
          Welcome!
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 5 }}
          className={`${parisienne.className} text-[85px]`}
        >
          To the start of our new Journey
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 10 }}
          className={`${parisienne.className} text-[85px]`}
        >
          By Antia and Meti
        </motion.h2>
      </div>

      {/* Grid + connectors */}
      <div
        ref={gridRef}
        className="relative mt-16 mx-auto w-full max-w-4xl grid grid-cols-2 gap-y-12 gap-x-12"
      >
        {segments.map((seg, i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: seg.length }}
            transition={{ delay: seg.delay, duration: 0.8, ease: "easeInOut" }}
            className="absolute flex overflow-hidden origin-left"
            style={{
              top: seg.y - ICON_SIZE / 2,
              left: seg.x - ICON_SIZE / 2,
              height: ICON_SIZE,
              transform: `rotate(${seg.angle}deg)`,
              transformOrigin: "0 50%",
            }}
          >
            {Array.from({ length: Math.ceil(seg.length / ICON_SIZE) }).map(
              (_, idx) => (
                <SvgIcon
                  key={idx}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  className={`flex-none text-white ${
                    idx % 2 !== 0 ? "rotate-210" : "rotate-40"
                  }`}
                />
              )
            )}
          </motion.div>
        ))}

        {images.map((img, idx) => (
          <motion.div
            key={idx}
            ref={(el) => {
              if (el) imgRefs.current[idx] = el;
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "easeInOut", duration: 0.8, delay: img.delay }}
            className="relative w-96 h-96 rounded-lg overflow-hidden shadow-2xl"
            style={{
              gridColumnStart: idx % 2 === 0 ? 1 : 2,
              gridRowStart: idx + 1,
            }}
          >
            <Image
              src={img.src}
              alt={`Invitation image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
