import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquarePlus } from "lucide-react";

// Mock data for guestbook
const INITIAL_MESSAGES = [
  {
    id: 1,
    name: "Minh Tuấn",
    message: "Chúc mừng tốt nghiệp nhé bạn tôi! Chúc bạn luôn thành công trên con đường sắp tới.",
    date: "2 giờ trước"
  },
  {
    id: 2,
    name: "Cô Hằng",
    message: "Rất tự hào về em. Mong em sẽ tiếp tục phát huy những gì đã học được.",
    date: "5 giờ trước"
  },
  {
    id: 3,
    name: "Lan Anh",
    message: "So proud of you! Can't wait to celebrate! 🎉",
    date: "1 ngày trước"
  }
];

export function Guestbook() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;

    const msg = {
      id: messages.length + 1,
      name: newName,
      message: newMessage,
      date: "Vừa xong"
    };

    setMessages([msg, ...messages]);
    setNewName("");
    setNewMessage("");
  };

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">Lưu bút</span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mt-2">Sổ Lời Chúc</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-6 rounded-2xl border border-border sticky top-8">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-secondary" />
                Gửi lời chúc
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input 
                    placeholder="Tên của bạn" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="bg-white dark:bg-card"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Lời chúc tốt đẹp..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-white dark:bg-card min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Gửi lời chúc
                </Button>
              </form>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="lg:col-span-2">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white dark:bg-card p-6 rounded-2xl shadow-xs border border-border/50 flex gap-4"
                  >
                    <Avatar className="w-12 h-12 border-2 border-secondary/20">
                      <AvatarFallback className="bg-primary/5 text-primary font-bold">
                        {msg.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-primary font-serif text-lg">{msg.name}</h4>
                        <span className="text-xs text-muted-foreground">{msg.date}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{msg.message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
}
