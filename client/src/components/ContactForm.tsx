import { FORMSPREE_ENDPOINT } from "@/config/contact";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function ContactForm() {
  const { toast } = useToast();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        try {
          const year = Number(formData.get("year") || 0);
          const condition = String(formData.get("condition") || "poor");
          const make = String(formData.get("make") || "");
          const model = String(formData.get("model") || "");
          const classify = (mk: string, md: string): "small" | "suv" => {
            const s = `${mk} ${md}`.toLowerCase();
            const suv = ["suv","cr-v","rav4","highlander","tahoe","explorer","escape","pilot","rogue","cx-","sorento","sportage","x5","glc","outback","forester","santa fe","pathfinder","grand cherokee"];
            return suv.some((k) => s.includes(k)) ? "suv" : "small";
          };
          const cfg = { small: { min: 200, max: 300 }, suv: { min: 400, max: 600 } } as const;
          const type = classify(make, model);
          const span = cfg[type].max - cfg[type].min;
          const yearScore = Math.max(0, Math.min(1, (year - 1985) / (2020 - 1985)));
          const conditionScore = condition === "excellent" ? 1 : condition === "good" ? 0.8 : condition === "fair" ? 0.5 : 0.2;
          const price = Math.round(((cfg[type].min + span * ((yearScore + conditionScore) / 2)) / 10)) * 10;
          const payload = {
            name: String(formData.get("name") || ""),
            email: String(formData.get("email") || ""),
            phone: String(formData.get("phone") || ""),
            year,
            make,
            model,
            condition,
            estimatedPrice: price,
          };
          await apiRequest("POST", "/api/lead", payload);
        } catch {}
        setStatus("success");
        formEl.reset();
        toast({ title: "Message sent", description: "Thanks! We'll contact you shortly." });
      } else {
        setStatus("error");
        toast({ title: "Submission failed", description: "Please try again or call us." });
      }
    } catch {
      setStatus("error");
      toast({ title: "Network error", description: "Check connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block space-y-2">
          <span className="font-medium">Your Name</span>
          <Input type="text" name="name" required />
        </label>
        <label className="block space-y-2">
          <span className="font-medium">Phone</span>
          <Input type="tel" name="phone" required inputMode="tel" pattern="^\\d{10,15}$" />
        </label>
        <label className="block space-y-2 sm:col-span-2">
          <span className="font-medium">Email</span>
          <Input type="email" name="email" />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block space-y-2">
          <span className="font-medium">Year</span>
          <Input type="text" name="year" required pattern="^\\d{4}$" />
        </label>
        <label className="block space-y-2">
          <span className="font-medium">Make</span>
          <Input type="text" name="make" required />
        </label>
        <label className="block space-y-2">
          <span className="font-medium">Model</span>
          <Input type="text" name="model" required />
        </label>
      </div>

      <label className="block space-y-2">
        <span className="font-medium">Condition</span>
        <select name="condition" className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" required>
          <option value="excellent">Excellent - Runs Great</option>
          <option value="good">Good - Minor Issues</option>
          <option value="fair">Fair - Major Issues</option>
          <option value="poor">Poor - Doesn't Run</option>
        </select>
      </label>

      <label className="block space-y-2">
        <span className="font-medium">Message</span>
        <Textarea name="message" required />
      </label>

      <Button type="submit" size="lg" className="w-full" disabled={submitting}>{submitting ? "Sending..." : "Send"}</Button>

      {status === "success" && (
        <Alert className="mt-4">
          <AlertTitle>Thanks for reaching out!</AlertTitle>
          <AlertDescription>We received your message and will get back to you soon.</AlertDescription>
        </Alert>
      )}
      {status === "error" && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>Please try again or call our number shown above.</AlertDescription>
        </Alert>
      )}
    </form>
  );
}