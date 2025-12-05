import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Mock audio ref - in a real app this would point to the file
  // const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // if (audioRef.current) {
    //   if (isPlaying) audioRef.current.pause();
    //   else audioRef.current.play();
    // }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white dark:bg-card p-4 rounded-xl shadow-2xl border border-border/50 w-64 mb-2"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">Graduation Celebration</p>
                <p className="text-xs text-muted-foreground truncate">Piano & Strings</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsMuted(!isMuted)}>
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              
              <div className="flex-1 h-1 bg-secondary/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-secondary"
                  animate={{ width: isPlaying ? "100%" : "0%" }}
                  transition={{ 
                    duration: isPlaying ? 30 : 0, 
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear"
                  }}
                />
              </div>
              
              <span className="text-xs font-mono text-muted-foreground">2:14</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={togglePlay}
        onMouseEnter={() => setIsExpanded(true)}
        className={`rounded-full h-12 w-12 shadow-lg transition-all duration-300 ${isPlaying ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'bg-white text-foreground hover:bg-gray-50'}`}
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-1" />
        )}
      </Button>
    </div>
  );
}
