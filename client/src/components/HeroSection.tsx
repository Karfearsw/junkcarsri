import { Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Tow_truck_picking_up_junk_car_ca8fff96.png";
import { PHONE_NUMBER, PHONE_LINK } from "@/config/contact";

export default function HeroSection() {
  const phoneNumber = PHONE_NUMBER;
  const phoneLink = PHONE_LINK;

  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-calculator");
    quoteSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-background to-muted/30">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 lg:opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />

      <div className="container mx-auto px-4 py-12 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full" data-testid="text-urgency-badge">
                Limited Spots Today - Call Now!
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight" data-testid="text-hero-headline">
              Turn Your Junk Car Into{" "}
              <span className="text-primary">Cash Today</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl" data-testid="text-hero-subheadline">
              Get paid fast for any car, any condition. Free towing across Rhode Island. No hassle, no hidden fees. Same-day payment guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={phoneLink} className="flex-1 sm:flex-initial">
                <Button 
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 text-lg font-semibold"
                  data-testid="button-call-now-hero"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {phoneNumber}
                </Button>
              </a>
              
              <Button 
                onClick={scrollToQuote}
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold"
                data-testid="button-instant-quote-hero"
              >
                Get Instant Quote
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              {[
                "24/7 Service",
                "Free Towing",
                "Licensed & Insured",
                "Same Day Payment"
              ].map((item) => (
                <div key={item} className="flex items-center gap-2" data-testid={`trust-indicator-${item.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block relative">
            <img 
              src={heroImage} 
              alt="Tow truck picking up junk car"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
