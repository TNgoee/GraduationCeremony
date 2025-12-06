import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import portraitImage from "@assets/generated_images/graduate_portrait.png";

export function EventDetails() {
  return (
    <section className="py-24 px-4 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-secondary/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
            <div className="relative rounded-xl overflow-hidden shadow-2xl aspect-[4/5]">
              <img 
                src={portraitImage} 
                alt="Graduate Portrait" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div>
                  <h3 className="text-white font-serif text-2xl font-bold">Tran Thi Thao Nguyen</h3>
                  <p className="text-white/90 font-sans">Bachelor of Information Technology</p>
                </div>
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
                  <p className="text-muted-foreground text-lg">Sunday, June 15th, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Time</h4>
                  <p className="text-muted-foreground text-lg">08:00 AM – Guest Reception</p>
                  <p className="text-muted-foreground text-lg">09:00 AM – Ceremony Opening</p>
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
