import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Star, Heart, GraduationCap, MapPin, Calendar, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const EVENTS = [
  {
  year: "2023",
  subtitle: "The Beginning",
  title: "First Encounter",
  description: "Our first meeting wasn’t planned. While searching for a web programming group, we unexpectedly ended up on the same team — with Trung stepping in as the group leader. What started as teamwork slowly became familiarity, marking the beginning of something more than just a project.",
  icon: MapPin,
},

  {
    year: "2024",
    subtitle: "Blossoming",
    title: "First Date",
    description: "September 2nd — a national holiday, full of life and celebration.After flying back from Malaysia, Trung took me out that day. The city was lively, streets filled with people and flags, and we spent our time together at the Ho Chi Minh Museum. Amid the festive atmosphere and shared excitement, something quietly began — that day marked the moment we started getting to know each other, right there, in the middle of it all.",
    icon: Heart,
  },
  {
    year: "2025",
    subtitle: "Adventure",
    title: "Traveling Together",
    description: "From the open sea of Vung Tau to quiet moments by the shore, we shared our first trips side by side. With salty air, gentle waves, and endless conversations, we didn’t just travel to a new place — we learned more about each other. Every journey became a small chapter in our growing collection of memories",
    icon: Calendar,
  },
  {
    year: "2025",
    subtitle: "Harmony",
    title: "Finding Our Rhythm",
    description: "Through the stress of exams and the joy of small victories, we learned to be each other's anchor. Like a favorite song, we found a rhythm that just worked.",
    icon: Music,
  },
  {
    year: "2026",
    subtitle: "Milestone",
    title: "Graduation",
    description: "Standing side by side, wearing our gowns, looking ahead at the future. We didn't just earn a degree; we earned a partnership that will last a lifetime.",
    icon: GraduationCap,
  },
  {
    year: "Future",
    subtitle: "Awaiting",
    title: "The Next Chapter",
    description: "The story doesn't end here. It's only just beginning. With dreams in our pockets and hand in hand, we are ready for whatever comes next.",
    icon: Star,
  }
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-amber-100 selection:text-amber-900" ref={containerRef}>
      <Navbar />

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply" 
             style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")` }} />
        <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-amber-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-rose-100/40 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      </div>

      <main className="relative z-10">
        {/* Header Section */}
        <section className="h-[60vh] flex flex-col items-center justify-center text-center px-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="font-mono text-xs md:text-sm text-amber-700 tracking-[0.3em] uppercase mb-6 block">
              The Story of Us
            </span>
            <h1 className="text-6xl md:text-8xl font-serif text-stone-800 mb-8 tracking-tight">
              Our Journey
            </h1>
            <div className="w-px h-24 bg-gradient-to-b from-stone-300 via-amber-400 to-stone-300 mx-auto" />
          </motion.div>
        </section>

        {/* Timeline Section */}
        <div className="container max-w-5xl mx-auto px-4 pb-40 relative">
          
          {/* Central Progress Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-stone-200 transform md:-translate-x-1/2">
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300" 
            />
          </div>

          <div className="space-y-24 md:space-y-40">
            {EVENTS.map((event, index) => (
              <TimelineItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-24 text-center relative z-10 border-t border-stone-200/50 bg-white/50 backdrop-blur-sm">
         <div className="font-serif italic text-2xl mb-4 text-stone-800">Jung & Nguyen</div>
         <div className="font-mono text-xs text-stone-400 tracking-widest">Graduation. 2026</div>
      </footer>
    </div>
  );
}

function TimelineItem({ event, index }: { event: any; index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={cn(
      "relative flex items-center md:items-start gap-8 md:gap-0",
      isEven ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      
      {/* Date/Marker Node (Mobile: Left, Desktop: Center) */}
      <div className="absolute left-4 md:left-1/2 w-4 md:w-16 h-4 md:h-16 flex items-center justify-center transform md:-translate-x-1/2">
         {/* Desktop Icon Circle */}
         <div className="hidden md:flex w-12 h-12 rounded-full bg-white border border-stone-100 shadow-md items-center justify-center relative z-10 group">
            <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-amber-600 transition-colors duration-500 group-hover:bg-amber-50">
               <event.icon size={18} strokeWidth={1.5} />
            </div>
         </div>
         {/* Mobile Dot */}
         <div className="md:hidden w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white shadow-sm" />
      </div>

      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className={cn(
          "w-full pl-12 md:pl-0 md:w-1/2",
          isEven ? "md:pr-24" : "md:pl-24" // Spacing from center Line
        )}
      >
        <div className={cn(
            "group",
            isEven ? "md:text-right" : "md:text-left"
        )}>
          {/* Date Label */}
          <div className={cn(
            "flex items-center gap-3 mb-3",
            isEven ? "md:justify-end" : "md:justify-start"
          )}>
            <span className="font-mono text-sm text-amber-600 font-medium tracking-widest">{event.year}</span>
            <div className="h-px w-8 bg-amber-200" />
            <span className="font-serif text-xs text-stone-400 italic uppercase tracking-wider">{event.subtitle}</span>
          </div>

          {/* Card Content */}
          <div className="relative p-6 md:p-8 bg-white rounded-lg border border-stone-100 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1">
            <h3 className="text-2xl md:text-3xl font-serif text-stone-800 mb-4">{event.title}</h3>
            <p className="text-stone-500 font-light leading-relaxed">
              {event.description}
            </p>
            
            {/* Decoration */}
            <div className={cn(
                "absolute top-4 w-2 h-2 rounded-full bg-amber-400/20",
                isEven ? "right-4" : "left-4"
            )} />
          </div>
        </div>
      </motion.div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}
