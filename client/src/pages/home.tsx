import { Hero } from "@/components/hero";
import { EventDetails } from "@/components/event-details";
import { RSVPForm } from "@/components/rsvp-form";
import { Guestbook } from "@/components/guestbook";
import { Gallery } from "@/components/gallery";

import { motion, useScroll, useSpring } from "framer-motion";

import { Navbar } from "@/components/navbar";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-secondary selection:text-secondary-foreground">
      <Navbar />
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-50"
        style={{ scaleX }}
      />

      <main>
        <Hero />
        <EventDetails />
        <Gallery />
        <RSVPForm />
        <Guestbook />
      </main>
      


      <footer className="py-12 bg-primary text-primary-foreground text-center">
  <div className="max-w-4xl mx-auto px-4">
    <h2 className="font-script text-4xl mb-4 text-secondary">Thank You</h2>
    <p className="opacity-70 font-serif">
      We look forward to welcoming you to my graduation ceremony.
    </p>
    <div className="mt-8 text-sm opacity-50">
      © 2026 Graduation Event.
    </div>
  </div>
</footer>

    </div>
  );
}
