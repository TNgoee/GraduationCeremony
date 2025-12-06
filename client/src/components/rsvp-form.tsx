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
import { useCreateRsvp } from "@/hooks/use-api";
import { Loader2, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  status: z.enum(["yes", "no", "maybe"], {
    required_error: "Please select your attendance status",
  }),
  guests: z.string().min(1, "Please select the number of guests"),
  dietaryRestrictions: z.string().optional(),
  specialRequests: z.string().optional(),
});

export function RSVPForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const createRsvpMutation = useCreateRsvp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      status: "yes",
      guests: "1",
      dietaryRestrictions: "",
      specialRequests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createRsvpMutation.mutateAsync({
        name: values.name,
        email: values.email,
        phone: values.phone,
        numberOfGuests: parseInt(values.guests),
        dietaryRestrictions: values.dietaryRestrictions,
        specialRequests: values.specialRequests,
      });

      setIsSuccess(true);
      toast({
        title: "Confirmation sent!",
        description: "Thank you for your response. See you at the ceremony!",
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
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
            <p className="text-white/80">Please confirm your attendance before June 1, 2025</p>
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
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Thank you!</h3>
                <p className="text-muted-foreground">Your response has been saved successfully.</p>
                <Button 
                  variant="outline" 
                  className="mt-8"
                  onClick={() => {
                    setIsSuccess(false);
                    form.reset();
                  }}
                >
                  Submit another response
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" type="email" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="0123456789" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Attendance Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base">Will you attend?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col sm:flex-row gap-4"
                          >
                            <FormItem className="flex items-center space-x-3 bg-muted/50 p-4 rounded-lg border hover:border-primary transition-all cursor-pointer">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Definitely attending
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 bg-muted/50 p-4 rounded-lg border hover:border-primary transition-all cursor-pointer">
                              <FormControl>
                                <RadioGroupItem value="maybe" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Maybe
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 bg-muted/50 p-4 rounded-lg border hover:border-primary transition-all cursor-pointer">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                Unfortunately, I can’t attend
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Guests */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">How many people will come?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select number" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 person (Just me)</SelectItem>
                            <SelectItem value="2">2 people</SelectItem>
                            <SelectItem value="3">3 people</SelectItem>
                            <SelectItem value="4">4 people</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Special Requests */}
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base">Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Leave a note or message..." 
                            className="resize-none min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit */}
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    disabled={createRsvpMutation.isPending}
                  >
                    {createRsvpMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Confirm Attendance
                      </>
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
