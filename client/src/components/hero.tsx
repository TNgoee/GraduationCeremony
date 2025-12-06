import { motion } from "framer-motion";
import heroImage from "@assets/generated_images/graduation_hero_image_with_confetti.png";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Graduation Ceremony" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="font-script text-3xl md:text-5xl text-secondary mb-4 block">
            You Are Cordially Invited
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold mb-6 tracking-tight leading-none">
            Graduation Ceremony
          </h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] w-12 md:w-24 bg-secondary/80" />
            <span className="font-sans text-xl md:text-2xl tracking-widest uppercase text-white/90">
              Class of 2026
            </span>
            <div className="h-[1px] w-12 md:w-24 bg-secondary/80" />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-sans text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed"
          >
            A milestone marking years of dedication and passion. 
            <br className="hidden md:block" />
            Join us as we celebrate this special moment together.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12"
        >
          <a 
            href="#rsvp"
            className="inline-block px-8 py-4 bg-secondary text-secondary-foreground font-serif text-lg font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Confirm Attendance
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
        </svg>
      </motion.div>
    </section>
  );
}
