import { Hero } from "@/components/hero";
import { EventDetails } from "@/components/event-details";
import { RSVPForm } from "@/components/rsvp-form";
import { Guestbook } from "@/components/guestbook";
import { Gallery } from "@/components/gallery";
import { Navbar } from "@/components/navbar";
import { motion, useScroll, useSpring, Transition } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: EASE, delay } as Transition,
  viewport: { once: true, amount: 0.3 },
});

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
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
        {/* <RSVPForm />
        <Guestbook /> */}

        {/* Thank You Section */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-2xl mx-auto">

            {/* Eyebrow */}
            <motion.div
              {...fadeUp(0)}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-gray-300" />
              <span className="text-xs tracking-widest text-gray-400 uppercase font-medium">
                With gratitude
              </span>
              <div className="h-px w-12 bg-gray-300" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              {...fadeUp(0.1)}
              className="text-3xl font-medium text-gray-900 mb-4 leading-snug"
            >
              A Special Thank You
            </motion.h2>

            {/* Accent divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 } as Transition}
              viewport={{ once: true, amount: 0.3 }}
              className="w-9 h-0.5 bg-pink-400 mx-auto mb-8 origin-left"
            />

            {/* Body */}
            <motion.p
              {...fadeUp(0.3)}
              className="text-lg text-gray-700 leading-relaxed mb-5"
            >
              Thank you to everyone taking the time to celebrate this special milestone
              with me. Whether you'll be there in person or cheering from afar — your
              presence and kind words truly mean the world to me.
            </motion.p>

            <motion.p
              {...fadeUp(0.4)}
              className="text-base text-gray-500 leading-relaxed mb-10"
            >
              I'm deeply grateful for all the love, support, and beautiful messages.
              This moment wouldn't feel the same without you.
            </motion.p>

            {/* Signature pill */}
            <motion.div
              {...fadeUp(0.5)}
              className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-6 py-2.5"
            >
              <svg
                className="w-3.5 h-3.5 fill-pink-400 animate-pulse"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-sm font-medium text-gray-500">With all my love</span>
            </motion.div>

          </div>
        </section>
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