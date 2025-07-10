// comp/MainContent.tsx
import { motion, AnimatePresence } from "framer-motion";
import { Parisienne } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import SvgIcon from "./FlowerIcon";
import RoseIcon from "./RoseIcon";
import FreesiaIcon from "./FreesiaIcon";

export const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type MainContentProps = {
  onWelcomeStart: () => void;
};

// Initial image sequence and delays
const images = [
  { src: "/images/1.jpeg", delay: 16.7 },
  { src: "/images/2.jpeg", delay: 17.3 },
  { src: "/images/3.jpeg", delay: 18.6 },
  { src: "/images/4.jpeg", delay: 20.0 },
  { src: "/images/5.jpeg", delay: 22.0 },
  { src: "/images/6.jpeg", delay: 22.7 },
  { src: "/images/7.jpeg", delay: 24.0 },
  { src: "/images/8.jpeg", delay: 25.3 },
];

// Text reveal parts and delays
const textParts = [
  { text: "And Everything", delay: 27.3 },
  { text: "Brought ", delay: 28.2 },
  { text: "Us", delay: 29.3 },
  { text: "To this Day", delay: 30.4 },
];

// Final images and delays
const finalImages = [
  { src: "/images/1.jpeg", delay: 32.0, y: -100, x: -100 },
  { src: "/images/1.jpeg", delay: 33.0, y: -100, x: 100 },
  { src: "/images/1.jpeg", delay: 34.0, y: 100, x: -100 },
  { src: "/images/1.jpeg", delay: 35.0, y: 100, x: 100 },
];

export default function MainContent({ onWelcomeStart }: MainContentProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const inviteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const finalRefs = useRef<HTMLDivElement[]>([]);
  const [started, setStarted] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false);
  const [segments, setSegments] = useState<
    {
      x: number;
      y: number;
      length: number;
      angle: number;
      delay: number;
    }[]
  >([]);

  const ICON_SIZE = 54;

  const handleWelcomeStart = () => {
    onWelcomeStart();
    setStarted(true);
  };

  // Compute branch segments once initial images are in place
  useLayoutEffect(() => {
    if (!started || !gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const segs: typeof segments = [];
    images.slice(1).forEach((_, i) => {
      const el1 = imgRefs.current[i];
      const el2 = imgRefs.current[i + 1];
      if (el1 && el2) {
        const r1 = el1.getBoundingClientRect();
        const r2 = el2.getBoundingClientRect();
        const x1 = r1.left + r1.width / 2 - rect.left;
        const y1 = r1.top + r1.height / 2 - rect.top;
        const x2 = r2.left + r2.width / 2 - rect.left;
        const y2 = r2.top + r2.height / 2 - rect.top;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.hypot(dx, dy);
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        segs.push({ x: x1, y: y1, length, angle, delay: images[i + 1].delay });
      }
    });
    setSegments(segs);
  }, [started]);

  // Auto-scroll through initial images, text, then final images
  useEffect(() => {
    if (!started) return;
    // Initial images
    images.forEach((img, i) => {
      setTimeout(() => {
        imgRefs.current[i]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, img.delay * 1000);
    });
    // Scroll to text after last initial image
    const textTime = images[images.length - 1].delay * 1000 + 500;
    setTimeout(() => {
      textRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, textTime);
    // Final images
    finalImages.forEach((img, i) => {
      setTimeout(() => {
        finalRefs.current[i]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, img.delay * 1000);
    });
    const inviteTime = finalImages[finalImages.length - 1].delay * 1000 + 500;
    setTimeout(() => {
      inviteRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, inviteTime);
    const timer = setTimeout(() => {
      setShowFlowers(true);
    }, (finalImages[finalImages.length - 1].delay + 1) * 1000);
    return () => clearTimeout(timer);
  }, [started]);

  return (
    <section className="relative p-8 bg-black text-white min-h-screen">
      {/* Intro headings */}
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
          className={`${parisienne.className} text-[85px] text-center  flex flex-col`}
        >
          To the start of our new Journey<span>By Meti and Antia</span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 10 }}
          className={`${parisienne.className} text-[85px]`}
        >
          But first let's go back to the beginning...
        </motion.h2>
      </div>

      {/* Initial image grid and branch animations */}
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
              (_, j) => (
                <SvgIcon
                  key={j}
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  className={`flex-none text-white ${
                    j % 2 ? "rotate-210" : "rotate-40"
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

      {/* Text reveal section */}
      <div
        ref={textRef}
        className="mt-44 flex justify-center space-x-8 relative"
      >
        {textParts.map((part, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: part.delay, duration: 1, ease: "easeInOut" }}
            className={`${parisienne.className} text-[90px] tracking-wide`}
          >
            {part.text}
          </motion.span>
        ))}
      </div>

      {/* Final images reveal section */}
      <div className="mt-16 mx-auto w-full max-w-6xl grid grid-cols-2 gap-12">
        {finalImages.map((img, idx) => (
          <motion.div
            key={idx}
            ref={(el) => {
              if (el) finalRefs.current[idx] = el;
            }}
            initial={{ opacity: 0, y: img.y, x: img.x }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: img.delay, duration: 1, ease: "easeInOut" }}
            className=" rounded-lg overflow-hidden shadow-2xl"
            style={{
              gridColumnStart: idx % 2 === 0 ? 1 : 2,
              gridRowStart: Math.floor(idx / 2) + 1,
            }}
          >
            <Image
              src={img.src}
              alt={`Final image ${idx + 1}`}
              width={800}
              height={800}
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div
        ref={inviteRef}
        className="min-h-screen flex flex-col items-center justify-center relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: finalImages[finalImages.length - 1].delay + 1,
            duration: 1,
          }}
          className="relative bg-white rounded-3xl p-12 shadow-2xl max-w-md text-center text-gray-800 z-10"
        >
          {/* Invitation content */}
          <h3 className="uppercase tracking-widest text-sm text-gray-500">
            We would love for you to come at the wedding of
          </h3>
          <h1 className="mt-4 text-4xl font-serif text-gray-800">
            Meti <span className="italic">&</span> Antia
          </h1>
          <p className="mt-4 text-sm text-gray-600">September 20th </p>
          <p className="mt-2 text-xs text-gray-500">Vlore,Albania</p>
          <p className="mt-6 text-xs font-semibold text-gray-700 uppercase">
            RSVP
          </p>
        </motion.div>

        {/* Animated Flower Frame */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: "32rem", height: "26rem" }}>
            <AnimatePresence>
              {showFlowers && (
                <>
                  {/* Bottom Flowers */}
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={`bottom-${i}`}
                      className="absolute"
                      style={{
                        bottom: -ICON_SIZE,
                        left: `${(i * 100) / 9}%`,
                        transform: "translateX(-50%)",
                      }}
                      initial={{ y: 100, opacity: 0, scale: 0 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: 0.1 * i,
                        duration: 0.8,
                        ease: "backOut",
                      }}
                    >
                      <FreesiaIcon
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                        className={`text-white mb-4 ${
                          i % 2 !== 0 ? "rotate-90" : "rotate-270 rotate-y-180 "
                        } ${i === 9 && "rotate-90 "} ${
                          i === 0 && "rotate-y-180 rotate-270 "
                        }`}
                      />
                    </motion.div>
                  ))}

                  {/* Side Flowers - Grow Upwards */}
                  {[...Array(8)].map((_, i) => (
                    <React.Fragment key={`sides-${i}`}>
                      {/* Left Side */}
                      <motion.div
                        className="absolute"
                        style={{
                          left: -ICON_SIZE,
                          bottom: `${(i * 100) / 7}%`,
                        }}
                        initial={{ x: -50, opacity: 0, scale: 0 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.8 + 0.05 * i,
                          duration: 0.6,
                          ease: "backOut",
                        }}
                      >
                        <FreesiaIcon
                          width={ICON_SIZE}
                          height={ICON_SIZE}
                          className={`text-white ${
                            i % 2 !== 0 ? "rotate-0" : "rotate-x-180"
                          }`}
                        />
                      </motion.div>

                      {/* Right Side */}
                      <motion.div
                        className="absolute"
                        style={{
                          right: -ICON_SIZE,
                          bottom: `${(i * 100) / 7}%`,
                        }}
                        initial={{ x: 50, opacity: 0, scale: 0 }}
                        animate={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{
                          delay: 0.8 + 0.05 * i,
                          duration: 0.6,
                          ease: "backOut",
                        }}
                      >
                        <FreesiaIcon
                          width={ICON_SIZE}
                          height={ICON_SIZE}
                          className={`text-white ${
                            i % 2 !== 0 ? "rotate-180" : "rotate-y-180"
                          } ${i === 7 && "rotate-460 -mb-1.5"}`}
                        />
                      </motion.div>
                    </React.Fragment>
                  ))}

                  {/* Top Flowers */}
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={`top-${i}`}
                      className="absolute"
                      style={{
                        top: -ICON_SIZE,
                        left: `${(i * 100) / 9}%`,
                        transform: "translateX(-50%)",
                      }}
                      initial={{ y: -100, opacity: 0, scale: 0 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.1 + 0.1 * i,
                        duration: 0.8,
                        ease: "backOut",
                      }}
                    >
                      <FreesiaIcon
                        width={ICON_SIZE}
                        height={ICON_SIZE}
                        className={`text-white  ${
                          i % 2 !== 0
                            ? " rotate-90 rotate-y-180 -mt-1.5"
                            : "rotate-265 -mt-1.5"
                        } ${i === 9 && "rotate-y-360 mt-0.5 hidden"} ${
                          i === 0 && "rotate-270 -mt-1.5"
                        }`}
                      />
                    </motion.div>
                  ))}

                  {/* Corner Flowers */}
                  {/* {[
                    { position: "bottom-left", rotate: "-45deg" },
                    { position: "bottom-right", rotate: "45deg" },
                    { position: "top-left", rotate: "-135deg" },
                    { position: "top-right", rotate: "135deg" },
                  ].map((corner, i) => (
                    <motion.div
                      key={corner.position}
                      className={`absolute ${corner.position.replace(
                        "-",
                        "-"
                      )}`}
                      style={{
                        [corner.position.split("-")[0]]: -ICON_SIZE * 0.7,
                        [corner.position.split("-")[1]]: -ICON_SIZE * 0.7,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: 1.4 + i * 0.1,
                        duration: 0.5,
                        ease: "backOut",
                      }}
                    >
                      <FreesiaIcon
                        width={ICON_SIZE * 1.2}
                        height={ICON_SIZE * 1.2}
                        className="text-rose-400"
                        style={{ transform: `rotate(${corner.rotate})` }}
                      />
                    </motion.div>
                  ))} */}
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
