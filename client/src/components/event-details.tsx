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
                  <h3 className="text-white font-serif text-2xl font-bold">Nguyễn Văn A</h3>
                  <p className="text-white/90 font-sans">Cử nhân Khoa học Máy tính</p>
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
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Thời gian & Địa điểm</span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold leading-tight">
                Thông Tin <br/> Buổi Lễ
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sự hiện diện của bạn là niềm vinh hạnh lớn nhất đối với tôi và gia đình trong ngày trọng đại này.
              </p>
            </div>

            <div className="grid gap-8">
              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Ngày tổ chức</h4>
                  <p className="text-muted-foreground text-lg">Chủ Nhật, 15 Tháng 6, 2025</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Thời gian</h4>
                  <p className="text-muted-foreground text-lg">08:00 Sáng - Đón khách</p>
                  <p className="text-muted-foreground text-lg">09:00 Sáng - Khai mạc buổi lễ</p>
                </div>
              </div>

              <div className="flex items-start gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border/50 hover:border-secondary/50 transition-colors shadow-xs hover:shadow-md group">
                <div className="p-3 bg-secondary/10 text-secondary rounded-full group-hover:bg-secondary group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-primary mb-1">Địa điểm</h4>
                  <p className="text-muted-foreground text-lg">Hội trường A, Đại học Quốc Gia</p>
                  <p className="text-muted-foreground">Quận Cầu Giấy, Hà Nội</p>
                  <a href="#" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium mt-2 text-sm">
                    Xem bản đồ <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
