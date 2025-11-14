import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyHeader() {
  const phoneNumber = "(401) 555-CASH";
  const phoneLink = "tel:4015552274";

  const scrollToQuote = () => {
    const quoteSection = document.getElementById("quote-calculator");
    quoteSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm lg:text-base">PC</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm lg:text-base leading-tight">Pawtucket</span>
              <span className="text-xs text-muted-foreground leading-tight">Cash for Cars</span>
            </div>
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
