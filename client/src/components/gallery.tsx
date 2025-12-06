import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import campusImg from "@assets/generated_images/university_campus_architecture.png";
import groupImg from "@assets/generated_images/group_of_graduates_celebrating.png";
import portraitImg from "@assets/generated_images/graduate_portrait.png";
import heroImg from "@assets/generated_images/graduation_hero_image_with_confetti.png";

const PHOTOS = [
  { src: heroImg, alt: "Ceremony", span: "col-span-2 row-span-2" },
  { src: campusImg, alt: "Campus", span: "col-span-1 row-span-1" },
  { src: portraitImg, alt: "Portrait", span: "col-span-1 row-span-1" },
  { src: groupImg, alt: "Friends", span: "col-span-2 row-span-1" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      stiffness: 50,
      damping: 20
    }
  }
};

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="py-24 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
          <span className="text-secondary font-bold uppercase text-sm">Memories</span>
<h2 className="text-4xl md:text-5xl font-serif font-bold mt-2">Photo Gallery</h2>

          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]"
          >
            {PHOTOS.map((photo, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className={`relative overflow-hidden rounded-xl shadow-md group cursor-pointer ${photo.span}`}
                onClick={() => setSelectedImage(photo.src)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* ===== Lightbox Preview ===== */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
