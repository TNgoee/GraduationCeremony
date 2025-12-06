import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGuestbookEntries, useCreateGuestbookEntry } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { MessageSquarePlus, Loader2 } from "lucide-react";

export function Guestbook() {
  const { toast } = useToast();
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const { data: messages = [], isLoading } = useGuestbookEntries();
  const createMutation = useCreateGuestbookEntry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;

    try {
      await createMutation.mutateAsync({
        name: newName,
        message: newMessage,
        email: newEmail || undefined,
      });

      toast({
        title: "Message submitted!",
        description: "Thank you for your message ❤️",
      });

      setNewName("");
      setNewEmail("");
      setNewMessage("");
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">
            Guestbook
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary font-bold mt-2">
            Messages & Wishes
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-1">
            <div className="bg-muted/30 p-6 rounded-2xl border border-border sticky top-8">
              <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-secondary" />
                Leave a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />

                <Input
                  placeholder="Email (Optional)"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />

                <Textarea
                  placeholder="Your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[120px]"
                />

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={createMutation.isPending}
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Submit Message"
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Messages List */}
          <div className="lg:col-span-2">
            <ScrollArea className="h-[600px] pr-4">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  No messages yet. Be the first to write!
                </div>
              ) : (
                <div className="space-y-6">
                  {messages
                    .filter((m: any) => m.is_approved === 1)
                  .map((msg, idx) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="bg-white dark:bg-card p-6 rounded-2xl shadow-xs border border-border/50 flex gap-4"
                    >
                      <Avatar className="w-12 h-12 border-2 border-secondary/20">
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                          {msg.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-serif text-lg font-bold text-primary">
                            {msg.name}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(msg.createdAt).toLocaleDateString("en-US")}
                          </span>
                        </div>

                        <p className="text-muted-foreground leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </section>
  );
}
