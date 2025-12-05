import { motion } from "framer-motion";
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

export function Gallery() {
  return (
    <section className="py-24 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">Kỷ niệm</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mt-2">Album Ảnh</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[300px]">
          {PHOTOS.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-xl shadow-md group ${photo.span}`}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
