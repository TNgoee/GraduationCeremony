
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import portraitImage from "@assets/generated_images/22.jpg";
import portraitImage2 from "@assets/generated_images/34.jpg"; // ← thêm hình thứ 2 vào đây
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
const images = [portraitImage, portraitImage2];

const slides = [
  {
    id: 1,
    image: portraitImage,
    name: "Tran Thi Thao Nguyen",
    major: "Bachelor of Information Technology",
  },
  {
    id: 2,
    image: portraitImage2,
    name: "Nguyen Quoc Trung",           // Tên khác cho ảnh thứ 2
    major: "Bachelor of Information Technology",     // Có thể để tiếng Việt hoặc thêm chi tiết
  },
];
export function EventDetails() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
// Auto slide
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4500); // 4.5 giây

    return () => clearInterval(timer);
  }, [isHovered]);

  const goToIndex = (index: number) => setCurrentIndex(index);
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const currentSlide = slides[currentIndex];

  // Variants cho hiệu ứng chuyển ảnh đẹp
   // Variants cho hiệu ứng chuyển ảnh đẹp
  const imageVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 1.08,
      x: direction > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1] as const,   // ← thêm "as const" ở đây
      },
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 0.92,
      x: direction > 0 ? -40 : 40,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,   // ← thêm "as const" ở đây
      },
    }),
  };
  return (
    <section className="py-24 px-4 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
        {/* Image Side - Carousel đẹp hơn */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePosition({ x: 0, y: 0 });
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left - rect.width / 2) * 0.02;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.02;
              setMousePosition({ x, y });
            }}
          >
            <div className="absolute -inset-4 bg-secondary/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-black">
              <AnimatePresence custom={currentIndex} mode="wait">
                <motion.img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  custom={currentIndex}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  }}
                />
              </AnimatePresence>

              {/* Overlay gradient + text (thay đổi theo ảnh) */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent flex items-end p-8 transition-opacity duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0.85 }}
              >
                <div className="text-white">
                  <motion.h3 
                    key={currentSlide.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-3xl font-bold"
                  >
                    {currentSlide.name}
                  </motion.h3>
                  <motion.p 
                    key={currentSlide.major}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-sans text-lg text-white/90 mt-1"
                  >
                    {currentSlide.major}
                  </motion.p>
                </div>
              </motion.div>

              {/* Nút Prev / Next */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
              >
                →
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? "bg-white scale-125 shadow-lg" 
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Time & Location</span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold leading-tight">
                Event <br/> Information
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Your presence is the greatest honor to me and my family on this special day.
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Event Date</h4>
                 <p className="text-muted-foreground text-lg">Tuesday, April 7th, 2026</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Time</h4>
                  <p className="text-muted-foreground text-lg">12:00 PM – Photo Session</p>
  <p className="text-muted-foreground text-lg">1:30 PM – Graduation Ceremony</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Location</h4>
                  <p className="text-muted-foreground text-lg">HUFLIT University – Hoc Mon Campus</p>
                  <p className="text-muted-foreground">Hoc Mon District, Ho Chi Minh City</p>
                 <div className="map-container mt-4">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.053201091173!2d106.59847431526016!3d10.865332192283643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b088de30f3b%3A0xd2140740d360f705!2sHUFLIT!5e0!3m2!1sen!2s!4v1701850324385!5m2!1sen!2s"
    width="100%"
    height="450"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="rounded-lg"
  ></iframe>
</div>


                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
