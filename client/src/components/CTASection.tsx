import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_LINK } from "@/config/contact";

export default function CTASection() {
  const phoneNumber = PHONE_NUMBER;
  const phoneLink = PHONE_LINK;

  return (
    <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl lg:text-5xl font-bold" data-testid="text-cta-headline">
            Ready to Get Cash for Your Junk Car?
          </h2>
          <p className="text-lg lg:text-xl opacity-90" data-testid="text-cta-subheadline">
            Don't let your old car sit there losing value. Call now and turn it into cash today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href={phoneLink}>
              <Button 
                size="lg"
                variant="secondary"
                className="h-14 px-8 text-lg font-semibold w-full sm:w-auto"
                data-testid="button-call-now-cta"
              >
                <Phone className="mr-2 h-5 w-5" />
                {phoneNumber}
              </Button>
            </a>
          </div>

          <p className="text-sm opacity-75" data-testid="text-cta-urgency">
            Limited pickup spots available today - call now!
          </p>
        </div>
      </div>
    </section>
  );
}
