import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const phoneNumber = "(401) 555-CASH";
  const phoneLink = "tel:4015552274";
  const email = "fanningleanna@gmail.com";

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4" data-testid="text-footer-brand">
              Pawtucket Cash for Cars
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Rhode Island's trusted junk car buyer. Fast, fair, and hassle-free service since day one.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Licensed</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Insured</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">24/7 Service</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <a 
                href={phoneLink} 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-phone-footer"
              >
                <Phone className="h-4 w-4" />
                {phoneNumber}
              </a>
              <a 
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-email-footer"
              >
                <Mail className="h-4 w-4" />
                {email}
              </a>
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Serving all of Rhode Island</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Service Areas</h3>
            <p className="text-sm text-muted-foreground mb-2">
              We serve all cities and towns across Rhode Island:
            </p>
            <p className="text-xs text-muted-foreground">
              Pawtucket, Providence, Warwick, Cranston, Newport, Woonsocket, and everywhere in between.
            </p>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p data-testid="text-footer-copyright">
            © {new Date().getFullYear()} Pawtucket Cash for Cars. All rights reserved.
          </p>
          <p className="text-xs" data-testid="text-footer-powered">
            Site powered by AI - get your quote in seconds or call now!
          </p>
        </div>
      </div>
    </footer>
  );
}
