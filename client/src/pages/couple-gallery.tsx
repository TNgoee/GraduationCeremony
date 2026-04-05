import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";

import groupImg from "@assets/generated_images/36.jpg";
import portraitImg from "@assets/generated_images/34.jpg";
import heroImg from "@assets/generated_images/32.jpg";
import ngoImg from "@assets/generated_images/39.jpg";
import z1Img from "@assets/generated_images/1.jpg";
import z2Img from "@assets/generated_images/8.jpg";
import z3Img from "@assets/generated_images/2.jpg";
import z4Img from "@assets/generated_images/4.jpg";
import z5Img from "@assets/generated_images/5.jpg";
import z6Img from "@assets/generated_images/6.jpg";
import z7Img from "@assets/generated_images/3.jpg";
import z8Img from "@assets/generated_images/7.jpg";

import z9Img from "@assets/generated_images/9.jpg";
import z10Img from "@assets/generated_images/10.jpg";
import z11Img from "@assets/generated_images/11.jpg";
import z12Img from "@assets/generated_images/12.jpg";
import z13Img from "@assets/generated_images/13.jpg";
import z14Img from "@assets/generated_images/14.jpg";
import z15Img from "@assets/generated_images/15.jpg";
import z16Img from "@assets/generated_images/16.jpg";

import z17Img from "@assets/generated_images/29.jpg";
import { cn } from "@/lib/utils";

// --- Components ---

function ChapterNavigation() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "school", "hongkong", "graduation"];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapters = [
    { id: "hero", label: "Intro" },
    { id: "school", label: "School Days" },
    { id: "hongkong", label: "SaiGon" },
    { id: "graduation", label: "Graduation" },
  ];

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-end gap-4">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => document.getElementById(chapter.id)?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center gap-3"
        >
          <span className={cn(
            "text-xs font-mono tracking-widest uppercase transition-all duration-300 opacity-0 group-hover:opacity-100",
            activeSection === chapter.id ? "text-amber-500 opacity-100 font-bold" : "text-gray-400"
          )}>
            {chapter.label}
          </span>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full transition-all duration-300 border border-current",
            activeSection === chapter.id ? "bg-amber-500 border-amber-500 scale-125" : "bg-transparent border-gray-400 group-hover:border-gray-600"
          )} />
        </button>
      ))}
      <div className="absolute right-[5px] top-0 bottom-0 w-px bg-gray-200 -z-10" />
    </div>
  );
}

function Hero() {
  return (
    <section id="hero" className="h-screen flex flex-col items-center justify-center bg-stone-50 text-stone-900 px-4 relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-200/20 rounded-full blur-[100px]" />
            <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] bg-rose-200/20 rounded-full blur-[100px]" />
        </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center z-10"
      >
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium tracking-tighter leading-none mb-6">
          CHERISHED<br/>
          <span className="italic font-light text-amber-700/80">MOMENTS</span>
        </h1>
        <div className="w-px h-24 bg-gradient-to-b from-stone-300 to-transparent mx-auto mt-8" />
      </motion.div>
    </section>
  );
}
// --- Reusable Animation Component ---
const RevealSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function SchoolSection() {
  const images = [z1Img, z2Img, z3Img, z4Img, z5Img, z6Img, z7Img, z8Img];

  return (
    <section id="school" className="min-h-screen bg-[#FDFBF7] py-24 px-4 md:px-20 relative overflow-hidden">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.4] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }} />

      {/* Abstract Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-sky-100/30 rounded-full blur-[80px]" 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-orange-100/30 rounded-full blur-[60px]" 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <RevealSection className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 relative">
          <div className="inline-block">
             <span className="font-mono text-xs text-sky-900/60 uppercase tracking-widest mb-4 block">Chapter I</span>
             <h2 className="text-5xl md:text-6xl font-serif text-slate-800 mb-6 tracking-tight">School Days</h2>
             <div className="w-12 h-1 bg-sky-200 mx-auto mb-6" />
             <p className="font-serif text-slate-500 text-lg md:text-xl max-w-lg mx-auto leading-relaxed italic">
               "It all started with a simple question: ‘Do you still need a teammate?’ — and somehow, that moment turned into something more."
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Left Column - 4 cols */}
            <div className="md:col-span-4 flex flex-col gap-10 relative">
                <motion.div 
                    className="relative aspect-[4/5] bg-white p-4 shadow-xl rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-out z-10"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-32 h-6 bg-sky-100/50 backdrop-blur-sm z-20 opacity-60" />
                    <div className="w-full h-full overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
                        <img src={images[0]} className="w-full h-full object-cover" alt="School Memory 1" />
                    </div>
                    <div className="absolute bottom-0 right-0 p-4">
                        <span className="font-handwriting text-slate-400 text-lg">2026</span>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="aspect-square w-3/4 self-end bg-white p-3 shadow-lg relative rotate-3 hover:rotate-0 transition-transform duration-500 z-0"
                >
                     <img src={images[1]} className="w-full h-full object-cover sepia-[30%]" alt="School Memory 2" />
                     <div className="absolute -top-6 -left-2 transform -rotate-12 font-handwriting text-2xl text-slate-400">Class</div>
                </motion.div>

                {/* New Image 6 */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="aspect-[3/4] w-2/3 bg-white p-3 shadow-lg relative -rotate-2 hover:rotate-0 transition-transform duration-500"
                >
                     <img src={images[5]} className="w-full h-full object-cover grayscale-[10%]" alt="School Memory 6" />
                </motion.div>
            </div>

            {/* Middle Column - 4 cols */}
            <div className="md:col-span-4 flex flex-col gap-8 pt-12 md:pt-0">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="aspect-[3/4] bg-white p-3 shadow-lg relative -rotate-1 hover:rotate-0 transition-transform duration-500"
                >
                     <img src={images[2]} className="w-full h-full object-cover grayscale-[20%]" alt="School Memory 3" />
                     <div className="absolute -bottom-10 right-0 font-serif text-5xl text-sky-900/10 z-0 select-none">YOUTH</div>
                </motion.div>
                
                 <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-sky-50 p-6 rounded-lg rotate-1 shadow-inner"
                >
                    <p className="font-serif italic text-slate-600 text-center text-sm">
                        "The best days of our lives, hidden in ordinary moments."
                    </p>
                </motion.div>

                {/* New Image 7 */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="aspect-square w-full bg-white p-3 shadow-lg relative rotate-2 hover:rotate-0 transition-transform duration-500"
                >
                     <img src={images[6]} className="w-full h-full object-cover" alt="School Memory 7" />
                 </motion.div>
            </div>

            {/* Right Column - 4 cols */}
            <div className="md:col-span-4 flex flex-col gap-10 pt-24 md:pt-8">
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="aspect-square w-full bg-white p-3 shadow-lg relative rotate-6 hover:rotate-0 transition-transform duration-500"
                >
                     <img src={images[3]} className="w-full h-full object-cover" alt="School Memory 4" />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="aspect-[4/3] bg-white p-3 shadow-xl relative -rotate-3 hover:rotate-0 transition-transform duration-500"
                >
                     <img src={images[4]} className="w-full h-full object-cover grayscale-[50%]" alt="School Memory 5" />
                     <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-400/20" />
                </motion.div>

                 {/* New Image 8 */}
                 <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="aspect-[3/5] w-2/3 self-end bg-white p-3 shadow-xl relative rotate-2 hover:rotate-0 transition-transform duration-500"
                >
                     <img src={images[7]} className="w-full h-full object-cover sepia-[10%]" alt="School Memory 8" />
                </motion.div>
            </div>
        </div>
      </RevealSection>
    </section>
  );
}

function HongKongSection() {
  const images = [z9Img, z10Img, z11Img, z12Img, z13Img, z14Img, z15Img, z16Img]; // Duplicated for longer reel

  return (
    <section id="hongkong" className="relative h-screen bg-black overflow-hidden flex flex-col justify-center">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" />
      </div>

      {/* Header with cinematic bars */}
      <div className="relative z-30 mb-8">
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8" />
        <div className="px-8 md:px-20 mb-4 flex items-baseline justify-between">
          <motion.h5 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif tracking-tight text-white"
          >
            SaiGon 2026
          </motion.h5>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-end gap-1"
          >
            <span className="font-mono text-[10px] md:text-xs text-amber-400/80 tracking-[0.2em]">
              CINEMATIC
            </span>
            <div className="flex gap-2 text-[8px] md:text-[10px] text-neutral-500 font-mono">
              <span>MOOD</span>
              <span>•</span>
              <span>NEON</span>
              <span>•</span>
              <span>NIGHT</span>
            </div>
          </motion.div>
        </div>
        <div className="h-px bg-gradient-to-r from-amber-500/20 via-amber-500/5 to-transparent mx-8 md:mx-20" />
      </div>
      
      {/* Film strip perforations */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[60vh] flex flex-col justify-around opacity-10 pointer-events-none z-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-3 h-2 bg-white rounded-sm ml-1" />
        ))}
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[60vh] flex flex-col justify-around opacity-10 pointer-events-none z-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="w-3 h-2 bg-white rounded-sm mr-1" />
        ))}
      </div>

      {/* Image carousel */}
      <div className="w-full relative overflow-hidden z-10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ 
            duration: 30, 
            ease: "linear", 
            repeat: Infinity 
          }}
          className="flex gap-6 md:gap-16 pl-8 md:pl-20 pr-8 md:pr-20 py-12 w-fit"
        >
          {images.map((img, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 w-[85vw] md:w-[45vw] aspect-[2.35/1] relative group"
            >
              {/* Film frame border */}
              <div className="absolute inset-0 border-2 border-neutral-800 rounded-sm z-10 pointer-events-none group-hover:border-amber-500/30 transition-colors duration-500" />
              
              {/* Image container */}
              <div className="w-full h-full bg-neutral-950 overflow-hidden rounded-sm relative">
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent pointer-events-none z-20 animate-scanline" />
                
                <img 
                  src={img} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 saturate-90 group-hover:saturate-100 transition-all duration-700" 
                  alt={`Hong Kong frame ${i + 1}`} 
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
                
                {/* Frame number */}
                <div className="absolute bottom-2 right-2 font-mono text-[10px] text-amber-400/60 tracking-wider z-10">
                  {String((i % 4) + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Light leak effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-transparent to-rose-500/0 group-hover:from-amber-500/10 group-hover:to-rose-500/10 transition-all duration-700 pointer-events-none rounded-sm" />
            </motion.div>
          ))}
          
          {/* End marker */}
          <div className="flex-shrink-0 w-[20vw] flex items-center justify-center">
             <div className="text-neutral-700 font-mono text-xs tracking-widest rotate-90">
              REEL CONST
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom cinematic bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/5 to-transparent mx-8 md:mx-20" />
        <div className="h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mt-8" />
      </div>

      <style>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
      `}</style>
    </section>
  );
}

function GraduationHero() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.98, 1, 1, 0.98]);

  return (
    <section id="graduation" ref={scrollRef} className="relative h-screen overflow-hidden flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Parallax background image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />
        <img 
          src={z17Img} 
          className="w-full h-full object-cover" 
          alt="Graduation" 
        />
      </motion.div>

      {/* Elegant corner decorations */}
     

      {/* Subtle light particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-30 text-center text-white px-4 max-w-6xl"
      >
        {/* Academic seal/emblem */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="inline-block mb-8"
        >
         
        </motion.div>

        {/* Elegant divider top */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400/50" />
          <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z" />
          </svg>
          <div className="h-px w-24 md:w-40 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-400/50" />
        </motion.div>

        {/* Subtitle */}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="block font-serif text-sm md:text-base tracking-[0.4em] mb-6 uppercase text-amber-400/90 font-light"
        >
          The Next Chapter
        </motion.span>

        {/* Main title - Couple focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-4 tracking-tight leading-tight">
            Our Graduation
          </h1>
          <div className="flex items-center justify-center gap-4 text-2xl md:text-4xl font-serif text-amber-400/80">
            <span className="font-light italic">Trung</span>
            <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
            <span className="font-light italic">Nguyen</span>
          </div>
        </motion.div>

        {/* Elegant divider bottom */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-amber-400/50 to-amber-400/50" />
          <svg className="w-3 h-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2L14.5,9.5L22,12L14.5,14.5L12,22L9.5,14.5L2,12L9.5,9.5L12,2Z" />
          </svg>
          <div className="h-px w-24 md:w-40 bg-gradient-to-l from-transparent via-amber-400/50 to-amber-400/50" />
        </motion.div>

        {/* Year and class */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <p className="font-serif text-base md:text-lg text-white/80 tracking-wider">
              
          </p>
          <div className="flex items-center justify-center gap-3 text-sm text-amber-400/60 font-light">
            <span>●</span>
            <span className="tracking-widest">MILESTONE</span>
            <span>●</span>
            <span className="tracking-widest">ACHIEVEMENT</span>
            <span>●</span>
            <span className="tracking-widest">BEGINNING</span>
            <span>●</span>
          </div>
        </motion.div>

        {/* Inspirational quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
          className="mt-12 text-sm md:text-base text-white/50 font-light italic max-w-3xl mx-auto leading-relaxed"
        >
          "We came as students, we leave as graduates — the future is unknown, but this moment is ours."
        </motion.p>

        {/* Laurel wreath decoration at bottom */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center"
        >
         
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ 
          opacity: { delay: 2, duration: 0.5 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-[0.3em] font-light">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

function GraduationContent() {
  const images = [heroImg, groupImg, ngoImg, portraitImg];

  return (
    <section className="bg-gradient-to-b from-white via-stone-50 to-white py-32 px-4 md:px-20 relative overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Subtle corner decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700">
          <path d="M20,20 Q30,15 40,20 Q50,25 60,20" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="25" cy="18" r="2" fill="currentColor"/>
          <circle cx="40" cy="17" r="2" fill="currentColor"/>
          <circle cx="55" cy="18" r="2" fill="currentColor"/>
        </svg>
      </div>

      <div className="absolute bottom-20 right-10 w-32 h-32 opacity-10 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-700">
          <path d="M20,20 Q30,15 40,20 Q50,25 60,20" stroke="currentColor" strokeWidth="1" fill="none"/>
          <circle cx="25" cy="18" r="2" fill="currentColor"/>
          <circle cx="40" cy="17" r="2" fill="currentColor"/>
          <circle cx="55" cy="18" r="2" fill="currentColor"/>
        </svg>
      </div>

      <RevealSection className="max-w-7xl mx-auto relative z-10">
        {/* Main content section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          {/* Text content */}
          <div className="relative">
            {/* Decorative quote mark */}
            <div className="absolute -top-8 -left-4 text-8xl font-serif text-amber-400/10 leading-none">
              "
            </div>

            {/* Section label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-gradient-to-r from-amber-600 to-transparent" />
              <span className="text-xs tracking-[0.3em] text-amber-700 font-light uppercase">
                Our Journey
              </span>
            </div>

            {/* Main heading */}
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight text-stone-900 relative">
              The Moment We've
              <br />
              <span className="text-amber-700">Been Waiting For</span>
              
              {/* Subtle underline decoration */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-2 left-0 w-32 h-px bg-gradient-to-r from-amber-600 to-transparent"
              />
            </h3>

            {/* Description text */}
            <div className="space-y-4 mb-10">
              <p className="text-stone-600 font-light leading-relaxed text-base md:text-lg">
                The moment we have been waiting for all along.
               From countless days of working side by side, sharing pressure, laughter, and quiet exhaustion, something beautiful slowly began to grow between us.
              </p>
              <p className="text-stone-500 font-light leading-relaxed italic">
              And now, this graduation is more than an ending — it marks the beginning of a new chapter.
              A chapter where we move forward together, carrying our dreams, our memories, and the hope of a brighter future ahead.
              </p>
            </div>

            {/* Signature-like elements */}
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-px bg-stone-900" />
              </div>
              <div className="text-sm text-stone-400 font-light flex items-center gap-3">
                <span className="tracking-wider">Trung</span>
                <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
                <span className="tracking-wider">Nguyen</span>
              </div>
            </div>

            {/* Achievement badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              <div className="px-4 py-2 border border-stone-200 rounded-full text-xs tracking-wider text-stone-600">
                  K28 
              </div>
              <div className="px-4 py-2 border border-amber-200 bg-amber-50 rounded-full text-xs tracking-wider text-amber-700">
                MILESTONE ACHIEVED
              </div>
            </motion.div>
          </div>

          {/* Main feature image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative group"
          >
            {/* Decorative frame corners */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-amber-400/40 z-10" />
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-amber-400/40 z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-amber-400/40 z-10" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-amber-400/40 z-10" />

            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/20 via-transparent to-stone-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />

            {/* Image container */}
            <div className="aspect-[3/4] bg-stone-100 overflow-hidden shadow-2xl relative">
              <img 
                src={images[0]} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Graduation Main" 
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Glass reflection effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100"
                animate={{
                  background: [
                    'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                    'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 100%)',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Image caption */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-stone-400 tracking-wider font-light italic">
                A milestone worth celebrating
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Divider with ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-20"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-stone-300 to-stone-300" />
          <svg className="w-8 h-8 text-amber-600/40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="8" fill="currentColor"/>
            <circle cx="30" cy="50" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="70" cy="50" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="50" cy="30" r="4" fill="currentColor" opacity="0.6"/>
            <circle cx="50" cy="70" r="4" fill="currentColor" opacity="0.6"/>
          </svg>
          <div className="h-px w-32 bg-gradient-to-l from-transparent via-stone-300 to-stone-300" />
        </motion.div>

        {/* Gallery section */}
        <div className="relative">
          {/* Gallery title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h4 className="text-2xl md:text-3xl font-serif text-stone-800 mb-3">
              Cherished Moments
            </h4>
            <p className="text-sm text-stone-400 tracking-widest font-light">
              CAPTURED IN TIME
            </p>
          </motion.div>

          {/* Image grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {images.slice(1).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`group relative ${i === 1 ? "md:-mt-16" : ""}`}
              >
                {/* Image number badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center z-20 border-2 border-amber-100">
                  <span className="text-xs font-serif text-amber-700">0{i + 2}</span>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-12 h-12 z-10">
                  <svg viewBox="0 0 50 50" className="w-full h-full text-amber-400/20">
                    <path d="M0,0 L15,0 M0,0 L0,15" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="3" cy="3" r="1.5" fill="currentColor"/>
                  </svg>
                </div>

                {/* Image container */}
                <div className="relative overflow-hidden bg-stone-100 shadow-xl">
                  <div className="aspect-[4/5]">
                    <img 
                      src={img} 
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105" 
                      alt={`Graduation moment ${i + 2}`} 
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                      whileHover={{
                        translateX: '200%',
                        transition: { duration: 0.8, ease: "easeInOut" }
                      }}
                    />
                  </div>

                  {/* Hover caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white text-sm font-light tracking-wide">
                      {i === 0 && "Friends Forever"}
                      {i === 1 && "Proud Achievement"}
                      {i === 2 && "Beautiful Memory"}
                    </p>
                  </div>
                </div>

                {/* Floating particles on hover */}
                {[...Array(3)].map((_, j) => (
                  <motion.div
                    key={j}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100"
                    style={{
                      left: `${30 + j * 20}%`,
                      top: `${40 + j * 10}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: j * 0.3
                    }}
                  />
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom quote section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center max-w-3xl mx-auto"
        >
          <div className="relative py-12 px-8 bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-lg border border-stone-200/50 shadow-lg">
            {/* Quote marks */}
            <div className="absolute top-4 left-4 text-5xl text-amber-400/20 font-serif leading-none">"</div>
            <div className="absolute bottom-4 right-4 text-5xl text-amber-400/20 font-serif leading-none rotate-180">"</div>

            <p className="text-lg md:text-xl font-serif text-stone-700 italic mb-4 relative z-10 leading-relaxed">
              Every ending is a new beginning. Together, we close this chapter and eagerly turn the page to what comes next.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-amber-600/30" />
              <span className="text-xs tracking-[0.3em] text-amber-700 font-light">WITH LOVE & PRIDE</span>
              <div className="w-12 h-px bg-amber-600/30" />
            </div>
          </div>
        </motion.div>
      </RevealSection>
    </section>
  );
}
export default function CoupleGallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <ChapterNavigation />
      <Hero />
      <SchoolSection />
      <HongKongSection />
      <GraduationHero />
      <GraduationContent />
      
      <footer className="py-24 bg-white text-center border-t border-gray-100">
         <div className="font-serif italic text-2xl mb-4">Trung & Nguyen</div>
         <div className="font-mono text-xs text-gray-400">Graduation. 2026</div>
      </footer>
    </div>
  );
}
