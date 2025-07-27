// comp/MainContent.tsx
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Marcellus, Parisienne } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { CheckCircle2, MapPin, Info, Loader2, ChevronDown } from "lucide-react";

type InvitePhase =
  | "idle"
  | "lettersIn"
  | "lettersHold"
  | "lettersOut"
  | "envelopeIn"
  | "envelopeOpen"
  | "envelopeDrop"
  | "flowers";

export const parisienne = Parisienne({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
export const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

type MainContentProps = {
  onWelcomeStart: () => void;
};

type Milestone = {
  src: string;
  delay: number;
  title: string;
  date?: string;
};

const milestones: Milestone[] = [
  {
    src: "/images/1.jpeg",
    delay: 16.7,
    title: "We met & fell in love",
    date: "10.07.2017",
  },
  {
    src: "/images/2.jpeg",
    delay: 17.3,
    title: "Adventure time (lots of fishing!)",
    date: "07.07.2018",
  },
  {
    src: "/images/3.jpeg",
    delay: 18.6,
    title: "We proclaimed our love for the Lord together!",
    date: "12.21.2019",
  },
  {
    src: "/images/4.jpeg",
    delay: 20.0,
    title: "We moved to AZ & adopted Goosey",
    date: "08.24.2020",
  },
  {
    src: "/images/5.jpeg",
    delay: 22.0,
    title: "We got engaged!",
    date: "01.24.2023",
  },
  { src: "/images/6.jpeg", delay: 22.7, title: "More memories...", date: "" },
  { src: "/images/7.jpeg", delay: 24.0, title: "And more love", date: "" },
  {
    src: "/images/8.jpeg",
    delay: 25.3,
    title: "…which brought us here",
    date: "",
  },
];

const textParts = [
  { text: "And Everything", delay: 27.3 },
  { text: "Brought ", delay: 28.2 },
  { text: "Us", delay: 29.3 },
  { text: "To this Day", delay: 30.4 },
];

const finalImages = [
  { src: "/images/9.jpeg", delay: 32.0, y: -100, x: -100 },
  { src: "/images/10.jpeg", delay: 33.0, y: -100, x: 100 },
  { src: "/images/12.jpeg", delay: 34.0, y: 100, x: -100 },
  { src: "/images/11.jpeg", delay: 35.0, y: 100, x: 100 },
];

export default function MainContent({ onWelcomeStart }: MainContentProps) {
  const inviteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRefs = useRef<HTMLDivElement[]>([]);
  const finalRefs = useRef<HTMLDivElement[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  const [started, setStarted] = useState(false);
  const [showFlowers, setShowFlowers] = useState(false); // still here if you ever use it
  const [invitePhase, setInvitePhase] = useState<InvitePhase>("idle");
  type Panel = "attend" | "location" | "info" | null;

  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const [showActions, setShowActions] = useState(false);

  type RsvpPayload = {
    first: string;
    last: string;
    attending: boolean;
    response: "accept" | "decline";
  };
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState<RsvpPayload>({
    first: "",
    last: "",
    attending: true,
    response: "accept",
  });

  const lineControls = useAnimation();
  const [lineHeight, setLineHeight] = useState(0);

  const lettersInDone = useRef(0);

  const handleWelcomeStart = () => {
    onWelcomeStart();
    setStarted(true);
  };

  // Measure timeline height once it renders
  useLayoutEffect(() => {
    if (timelineRef.current) {
      setLineHeight(timelineRef.current.scrollHeight);
    }
  }, [started]);

  // Auto-scroll sequence
  useEffect(() => {
    if (!started) return;

    // milestones
    milestones.forEach((m, i) => {
      setTimeout(() => {
        imgRefs.current[i]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, m.delay * 1000);
    });

    // text section
    const textTime = milestones[milestones.length - 1].delay * 1000 + 500;
    setTimeout(() => {
      textRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, textTime);

    // final images
    finalImages.forEach((img, i) => {
      setTimeout(() => {
        finalRefs.current[i]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, img.delay * 1000);
    });

    // invite
    const inviteTime = finalImages[finalImages.length - 1].delay * 1000 + 500;
    setTimeout(() => {
      inviteRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setInvitePhase("lettersIn");
      setTimeout(() => {
        setInvitePhase((p) => (p === "lettersIn" ? "lettersHold" : p));
      }, 2000);
    }, inviteTime);
  }, [started]);

  // Grow the vertical line with same delays
  useEffect(() => {
    if (!started) return;
    milestones.forEach((m, i) => {
      const pct = (i + 1) / milestones.length;
      setTimeout(() => {
        lineControls.start({
          scaleY: pct,
          transition: { duration: 0.5, ease: "easeInOut" },
        });
      }, m.delay * 1000);
    });
  }, [started, lineControls]);

  // Letters phase transitions
  useEffect(() => {
    if (invitePhase !== "lettersHold") return;
    const t = setTimeout(() => setInvitePhase("lettersOut"), 600);
    return () => clearTimeout(t);
  }, [invitePhase]);

  useEffect(() => {
    if (invitePhase !== "lettersOut") return;
    const t = setTimeout(() => setInvitePhase("envelopeIn"), 800);
    return () => clearTimeout(t);
  }, [invitePhase]);

  useEffect(() => {
    if (invitePhase !== "envelopeIn") return;
    const t = setTimeout(() => setInvitePhase("envelopeOpen"), 1000);
    return () => clearTimeout(t);
  }, [invitePhase]);

  useEffect(() => {
    if (invitePhase !== "envelopeOpen") return;
    const t = setTimeout(() => setInvitePhase("envelopeDrop"), 1500);
    return () => clearTimeout(t);
  }, [invitePhase]);

  const handleLetterInComplete = () => {
    lettersInDone.current += 1;
    if (lettersInDone.current === 3) setInvitePhase("lettersHold");
  };

  return (
    <section className="relative p-8 bg-[#faeadf] bg-noise text-black min-h-screen">
      {/* Intro headings */}
      <div className="flex flex-col items-center gap-8">
        <motion.h1
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2 }}
          onAnimationStart={handleWelcomeStart}
          className={`${marcellus.className} text-[90px]`}
        >
          Welcome!
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 5 }}
          className={`${marcellus.className} text-[85px] text-center  flex flex-col`}
        >
          To the start of our new Journey<span>By Meti and Antia</span>
        </motion.h2>
        <motion.h2
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 2, delay: 10 }}
          className={`${marcellus.className} text-[85px]`}
        >
          But first let's go back to the beginning...
        </motion.h2>
      </div>

      {/* ======== VERTICAL TIMELINE ======== */}
      <div
        ref={timelineRef}
        className="relative mt-16 mx-auto w-full max-w-6xl"
      >
        {/* central growing line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-black/70 origin-top"
          style={{ height: lineHeight || "100%" }}
          initial={{ scaleY: 0 }}
          animate={lineControls}
        />

        {milestones.map((m, idx) => {
          const leftImage = idx % 2 === 0; // alternate sides
          return (
            <div
              key={idx}
              ref={(el) => {
                if (el) imgRefs.current[idx] = el;
              }}
              className="relative grid grid-cols-[1fr_40px_1fr] gap-x-10 items-center min-h-[520px] md:min-h-[560px]"
            >
              {/* LEFT CELL */}
              <div className="flex justify-end pr-4">
                {leftImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: m.delay,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="relative w-[340px] h-[420px] rounded-lg overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={m.src}
                      alt={`milestone ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: m.delay + 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="text-right flex flex-col gap-2 max-w-[320px]"
                  >
                    {m.date && (
                      <span
                        className={`${marcellus.className} text-sm tracking-wide`}
                      >
                        {m.date}
                      </span>
                    )}
                    <span
                      className={`${marcellus.className} text-lg leading-snug`}
                    >
                      {m.title}
                    </span>
                  </motion.div>
                )}
              </div>

              {/* CENTER DOT */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: m.delay, duration: 0.35, ease: "easeOut" }}
                className="relative justify-self-center w-5 h-5 bg-white border-2 border-gray-600 rounded-full z-10 shadow"
              />

              {/* RIGHT CELL */}
              <div className="flex justify-start pl-4">
                {!leftImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: m.delay,
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                    className="relative w-[340px] h-[420px] rounded-lg overflow-hidden shadow-2xl"
                  >
                    <Image
                      src={m.src}
                      alt={`milestone ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: m.delay + 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    className="text-left flex flex-col gap-2 max-w-[320px]"
                  >
                    {m.date && (
                      <span
                        className={`${marcellus.className} text-sm tracking-wide`}
                      >
                        {m.date}
                      </span>
                    )}
                    <span
                      className={`${marcellus.className} text-lg leading-snug`}
                    >
                      {m.title}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* ======== /VERTICAL TIMELINE ======== */}

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

      {/* INVITE SECTION (unchanged) */}
      <div
        ref={inviteRef}
        className="w-full h-screen relative flex flex-col min-h-screen items-center justify-center mt-62"
      >
        {/* LETTERS: M & A */}
        <AnimatePresence>
          {(invitePhase === "lettersIn" || invitePhase === "lettersHold") && (
            <motion.div
              key="seal"
              className="absolute flex items-center justify-center"
              style={{ width: 240, height: 240 }}
              initial={{ opacity: 0, scale: 4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className={`${parisienne.className} text-7xl absolute`}
                initial={{ opacity: 0, scale: 10, x: -150, y: -80 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: -500 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                onAnimationComplete={handleLetterInComplete}
              >
                M
              </motion.span>
              <motion.span
                className={`${parisienne.className} text-7xl absolute`}
                initial={{ opacity: 0, scale: 4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                &
              </motion.span>
              <motion.span
                className={`${parisienne.className} text-7xl absolute`}
                initial={{ opacity: 0, scale: 10, x: 150, y: 80 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, x: 500 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                A
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ENVELOPE + INVITATION */}
        <AnimatePresence>
          {(invitePhase === "envelopeIn" ||
            invitePhase === "envelopeOpen" ||
            invitePhase === "envelopeDrop") && (
            <motion.div
              key="envelope-sequence"
              className="relative mt-[550px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: "min(100%, 620px)",
                height: "380px",
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
            >
              {/* CLIPPED ENVELOPE CONTAINER */}
              <motion.div
                className="absolute inset-0 z-25 pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{
                  opacity:
                    invitePhase === "envelopeOpen" ||
                    invitePhase === "envelopeDrop"
                      ? 0
                      : 1,
                }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: 1.1 }}
              >
                {/* left triangle */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t-[170px] border-t-transparent  border-r-[230px] border-r-[#A4D4F2] border-b-[170px] border-b-transparent rotate-y-180" />

                {/* right triangle */}
                <div className="absolute top-0 right-0 w-0 h-0 border-t-[170px] border-t-transparent border-l-[230px] border-l-[#A4D4F2] border-b-[170px] border-b-transparent rotate-y-180" />

                <div
                  className="absolute bottom-10 left-0 right-0 h-[170px] bg-[#C4DFF0]"
                  style={{
                    clipPath:
                      "polygon(0% 100%, 230px 0%, calc(100% - 230px) 0%, 100% 100%)",
                    WebkitClipPath:
                      "polygon(0% 100%, 230px 0%, calc(100% - 230px) 0%, 100% 100%)",
                  }}
                />
              </motion.div>

              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[560px] h-[780px] bg-white rounded-md shadow-xl z-20 overflow-hidden"
                style={{ clipPath: "inset(0 49px 0 0)" }}
                initial={{ y: 220, opacity: 0, scale: 0.95 }}
                animate={{ y: -50, opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 1.1, ease: "easeInOut" }}
                onAnimationComplete={() => setShowActions(true)}
              >
                <Image
                  src="/invite1.png"
                  alt="Invitation"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* FLAP */}
              <motion.div
                className="absolute w-full h-full z-30"
                initial={{ rotateX: 0, opacity: 1 }}
                animate={{ rotateX: -180, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                style={{
                  transformOrigin: "top center",
                  backgroundColor: "#658ced",
                  clipPath: "polygon(0 0, 100% 0, 50% 70%)",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {showActions && (
          <motion.div
            className="w-full max-w-xl mx-auto  px-4 "
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-row gap-3 justify-center">
              <ActionButton
                label="Konfirmo Pjesemarrjen"
                Icon={CheckCircle2}
                open={openPanel === "attend"}
                onClick={() =>
                  setOpenPanel(openPanel === "attend" ? null : "attend")
                }
              />
              <ActionButton
                label="Adresa"
                Icon={MapPin}
                open={openPanel === "location"}
                onClick={() =>
                  setOpenPanel(openPanel === "location" ? null : "location")
                }
              />
              <ActionButton
                label="Historia Jone"
                Icon={Info}
                open={openPanel === "info"}
                onClick={() =>
                  setOpenPanel(openPanel === "info" ? null : "info")
                }
              />
            </div>

            {/* ACCORDIONS */}
            <Accordion open={openPanel === "attend"}>
              <form
                className="space-y-4 pt-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSending(true);
                  try {
                    const res = await fetch("/api/rsvp", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(form),
                    });
                    if (!res.ok) throw new Error("Email failed");
                    alert("Faleminderit! E morëm konfirmimin tuaj 🤍");
                    setForm({
                      first: "",
                      last: "",
                      attending: true,
                      response: "accept",
                    });
                    setOpenPanel(null);
                  } catch (err) {
                    alert("Diçka shkoi keq. Provo përsëri.");
                    console.error(err);
                  } finally {
                    setSending(false);
                  }
                }}
              >
                <div className="flex gap-3">
                  <input
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="Emer"
                    value={form.first}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, first: e.target.value }))
                    }
                    required
                  />
                  <input
                    className="flex-1 border rounded-md px-3 py-2"
                    placeholder="Mbiemer"
                    value={form.last}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, last: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <label className="text-nowrap rounded-md border-1 border-solid p-1.5">
                    Zgjidh statusin e pjesemarrjes
                  </label>
                  <select
                    className="w-full border rounded-md px-3 py-2"
                    value={"yes"}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        attending: e.target.value === "yes" ? true : false,
                      }))
                    }
                    required
                  >
                    <option className="rounded-md" value={"yes"}>
                      Pranoj me Kënaqësi
                    </option>
                    <option className="rounded-md" value={"no"}>
                      Refuzoj me Keqardhje
                    </option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 items-center w-full justify-between rounded-md border-1 border-solid p-2">
                  <h1>Orari</h1>
                  <h1> - </h1>
                  <h1>19:00</h1>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full px-4 py-2 rounded-md transition text-white 
    ${
      sending
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-black hover:invert hover:outline-1 duration-100 transition-all hover:cursor-pointer"
    }`}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Duke dërguar...
                    </span>
                  ) : (
                    "Konfirmo"
                  )}
                </button>
              </form>
            </Accordion>

            <Accordion open={openPanel === "location"}>
              <div className="pt-4">
                <div className="aspect-video w-full rounded-md overflow-hidden shadow">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2999.239184658987!2d19.6782281!3d41.2601278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135024319b1f1af5%3A0x66b322e123edc06e!2sVila%20Toscana!5e0!3m2!1sen!2str!4v1753218880765!5m2!1sen!2str"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </Accordion>

            <Accordion open={openPanel === "info"}>
              <div className="pt-4 text-gray-700">
                <p className="leading-relaxed">
                  Dress code, timeline, parking info or any note you want to
                  show your guests can go here. You can replace this text with
                  whatever you like.
                </p>
              </div>
            </Accordion>
          </motion.div>
        )}
      </div>
    </section>
  );
}

const Accordion: React.FC<{ open: boolean; children: React.ReactNode }> = ({
  open,
  children,
}) => (
  <motion.div
    layout
    initial={false}
    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
    transition={{ duration: 0.35, ease: "easeInOut" }}
    style={{ overflow: "hidden" }}
  >
    {children}
  </motion.div>
);

type BtnProps = {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  open: boolean;
  onClick: () => void;
};

const ActionButton: React.FC<BtnProps> = ({ label, Icon, open, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 flex-row min-w-fit rounded-full px-6 py-3 border border-gray-300 hover:bg-gray-100 transition shadow-sm"
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
    <ChevronDown
      className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
    />
  </button>
);
