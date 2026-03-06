import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { href: "/", label: "Home" },
    { href: "/couple-gallery", label: "Gallery" },
    // { href: "/timeline", label: "Journey" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-500",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-stone-100 shadow-sm py-3" 
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Branding */}
        <Link href="/">
          <a className="group">
            <h1 className={cn(
               "font-serif text-xl md:text-2xl tracking-tight transition-colors duration-300",
               isScrolled ? "text-stone-800" : "text-stone-800/90" // Adjusted for visibility
            )}>
              Trung <span className="text-amber-600 font-light italic">&</span> Nguyen
            </h1>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-1 md:gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className="relative group px-3 py-2">
                <span className={cn(
                  "text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300",
                  location === link.href 
                    ? (isScrolled ? "text-amber-600 font-medium" : "text-amber-700 font-medium")
                    : (isScrolled ? "text-stone-500 hover:text-stone-900" : "text-stone-600 hover:text-stone-900")
                )}>
                  {link.label}
                </span>
                
                {/* Active Indicator */}
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-amber-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Hover Line */}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-px bg-stone-400 transition-all duration-300 group-hover:w-full",
                  location === link.href && "w-0" // Hide hover line if active
                )} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
