import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập tên của bạn"),
  status: z.enum(["yes", "no", "maybe"], {
    required_error: "Vui lòng chọn trạng thái tham dự",
  }),
  guests: z.string().min(1, "Vui lòng chọn số lượng khách"),
  message: z.string().optional(),
});

export function RSVPForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "yes",
      guests: "1",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Đã gửi xác nhận!",
        description: "Cảm ơn bạn đã phản hồi. Hẹn gặp bạn tại buổi lễ!",
      });
    }, 1500);
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-muted/30 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-card rounded-2xl shadow-xl overflow-hidden border border-border"
        >
          <div className="bg-primary p-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">RSVP</h2>
            <p className="text-white/80">Vui lòng xác nhận tham dự trước ngày 01/06/2025</p>
          </div>
          
          <div className="p-8 md:p-12">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Cảm ơn bạn!</h3>
                <p className="text-muted-foreground">Phản hồi của bạn đã được ghi nhận.</p>
                <Button 
                  variant="outline" 
                  className="mt-8"
                  onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}
                >
                  Gửi phản hồi khác
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Họ và Tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên của bạn" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base">Bạn có tham dự không?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-muted/50 p-4 rounded-lg border border-transparent data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 transition-all cursor-pointer">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Chắc chắn tham dự
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-muted/50 p-4 rounded-lg border border-transparent data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 transition-all cursor-pointer">
                              <FormControl>
                                <RadioGroupItem value="maybe" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Có thể tham dự
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0 bg-muted/50 p-4 rounded-lg border border-transparent data-[state=checked]:border-primary data-[state=checked]:bg-primary/5 transition-all cursor-pointer">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Rất tiếc, mình bận
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Số lượng người tham dự</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Chọn số lượng" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 người (Chỉ mình tôi)</SelectItem>
                            <SelectItem value="2">2 người</SelectItem>
                            <SelectItem value="3">3 người</SelectItem>
                            <SelectItem value="4">4 người</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Lời nhắn gửi (Tùy chọn)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Gửi lời chúc hoặc ghi chú về ăn uống..." 
                            className="resize-none min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Đang gửi...
                      </>
                    ) : (
                      "Gửi Xác Nhận"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
