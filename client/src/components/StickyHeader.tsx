import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHONE_NUMBER, PHONE_LINK } from "@/config/contact";

export default function StickyHeader() {
  const phoneNumber = PHONE_NUMBER;
  const phoneLink = PHONE_LINK;

  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-calculator");
    quoteSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/faviconri.png?v=1"
            alt="Junk Car Cash RI logo"
            className="h-8 w-auto lg:h-10 object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-sm lg:text-base leading-tight">Pawtucket</span>
            <span className="text-xs text-muted-foreground leading-tight">Cash for Cars</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a 
            href={phoneLink} 
            className="hidden md:flex items-center gap-2 text-lg lg:text-xl font-semibold text-primary hover-elevate active-elevate-2 px-3 py-2 rounded-md"
            data-testid="link-phone-header"
          >
            <Phone className="h-5 w-5" />
            {phoneNumber}
          </a>
          
          <Button 
            onClick={scrollToQuote}
            size="default"
            className="font-semibold"
            data-testid="button-get-quote-header"
          >
            Get Quote
          </Button>

          <a href={phoneLink} className="md:hidden" data-testid="button-call-mobile">
            <Button size="icon" variant="default">
              <Phone className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
