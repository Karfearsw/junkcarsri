import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, DollarSign } from "lucide-react";
import { PHONE_NUMBER, PHONE_LINK, FORMSPREE_ENDPOINT } from "@/config/contact";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const currentYear = new Date().getFullYear();
const quoteFormSchema = z.object({
  year: z
    .string()
    .regex(/^\d{4}$/, "Enter 4-digit year")
    .refine((v) => {
      const y = parseInt(v, 10);
      return y >= 1980 && y <= currentYear + 1;
    }, "Enter a realistic year"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  condition: z
    .string()
    .refine((v) => ["excellent", "good", "fair", "poor"].includes(v), "Select condition"),
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((d) => d.length >= 10 && d.length <= 15, "Enter valid phone number"),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

export default function QuoteCalculator() {
  const [quote, setQuote] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      year: "",
      make: "",
      model: "",
      condition: "",
      name: "",
      phone: "",
      email: "",
    },
  });

  const classifyVehicle = (make: string, model: string): "small" | "suv" => {
    const s = `${make} ${model}`.toLowerCase();
    const suvKeywords = [
      "suv","cr-v","rav4","highlander","tahoe","explorer","escape","pilot","rogue","cx-",
      "sorento","sportage","x5","glc","outback","forester","santa fe","pathfinder","grand cherokee"
    ];
    return suvKeywords.some((k) => s.includes(k)) ? "suv" : "small";
  };

  const pricingConfig = {
    small: { min: 200, max: 300 },
    suv: { min: 400, max: 600 },
  } as const;

  const calculateQuote = (data: QuoteFormData): number => {
  const type = classifyVehicle(data.make, data.model);
    const { min, max } = pricingConfig[type];
    const span = max - min;
    const yearNum = parseInt(data.year, 10) || 0;
    const yearScore = Math.max(0, Math.min(1, (yearNum - 1985) / (2020 - 1985)));
    const conditionScore =
      data.condition === "excellent" ? 1 :
      data.condition === "good" ? 0.8 :
      data.condition === "fair" ? 0.5 : 0.2;
    const score = (yearScore + conditionScore) / 2;
    const price = min + span * score;
    return Math.round(price / 10) * 10;
  };

  const onSubmit = async (data: QuoteFormData) => {
    const calculatedQuote = calculateQuote(data);
    setSubmitting(true);

    // Log to local database (non-blocking)
    try {
      await apiRequest("POST", "/api/lead", { ...data, estimatedPrice: calculatedQuote });
    } catch (e) {
      console.warn("Lead logging failed (likely preview server without API)", e);
    }

    // Always attempt Formspree submission
    try {
      const form = new FormData();
      form.append("subject", "New Quote Submission");
      form.append("name", data.name);
      form.append("email", data.email ?? "");
      form.append("phone", data.phone);
      form.append("year", String(data.year));
      form.append("make", data.make);
      form.append("model", data.model);
      form.append("condition", data.condition);
      form.append("estimatedPrice", String(calculatedQuote));
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: form,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        toast({ title: "Quote submitted", description: "We’ll follow up soon." });
      } else {
        toast({ title: "Submission failed", description: "Please try again or call us." });
      }
    } catch (e) {
      console.error(e);
      toast({ title: "Network error", description: "Check connection and try again." });
    }
    setQuote(calculatedQuote);
    setShowForm(false);
    setSubmitting(false);
  };

  const resetForm = () => {
    form.reset();
    setQuote(null);
    setShowForm(true);
  };

  const phoneNumber = PHONE_NUMBER;
  const phoneLink = PHONE_LINK;

  return (
    <section id="quote-calculator" className="py-12 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl lg:text-4xl font-bold" data-testid="text-quote-title">
                Get Your Free Instant Quote
              </CardTitle>
              <CardDescription className="text-base" data-testid="text-quote-description">
                Takes less than 60 seconds. No obligation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showForm ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="2015" 
                                {...field} 
                                data-testid="input-year"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="make"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Make</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Toyota" 
                                {...field} 
                                data-testid="input-make"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Camry" 
                              {...field} 
                              data-testid="input-model"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-condition">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="excellent">Excellent - Runs Great</SelectItem>
                              <SelectItem value="good">Good - Minor Issues</SelectItem>
                              <SelectItem value="fair">Fair - Major Issues</SelectItem>
                              <SelectItem value="poor">Poor - Doesn't Run</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="border-t pt-6 space-y-4">
                      <p className="text-sm font-medium text-center">Get your quote sent instantly</p>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Smith" 
                                {...field} 
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="(401) 555-1234" 
                                type="tel"
                                {...field} 
                                data-testid="input-phone"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="john@example.com" 
                                type="email"
                                {...field} 
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full h-14 text-lg font-semibold"
                      data-testid="button-submit-quote"
                      disabled={submitting}
                    >
                      <DollarSign className="mr-2 h-5 w-5" />
                      {submitting ? "Submitting..." : "Get My Instant Quote"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <div className="text-center space-y-6 py-8">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground" data-testid="text-estimated-value">Estimated Value</p>
                    <div className="text-5xl lg:text-6xl font-bold text-primary" data-testid="text-quote-amount">
                      ${quote}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                    <p className="font-semibold text-lg" data-testid="text-better-offer">
                      But wait! Call now for a BETTER offer!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Our online calculator gives conservative estimates. When you call, our experts often find your car is worth more. Don't leave money on the table!
                    </p>
                    <a href={phoneLink}>
                      <Button 
                        size="lg"
                        className="w-full h-14 text-lg font-semibold mt-4"
                        data-testid="button-call-for-better-offer"
                      >
                        <Phone className="mr-2 h-5 w-5" />
                        Call {phoneNumber} for Best Price
                      </Button>
                    </a>
                  </div>

                  <Button 
                    variant="outline"
                    onClick={resetForm}
                    data-testid="button-get-another-quote"
                  >
                    Get Another Quote
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
