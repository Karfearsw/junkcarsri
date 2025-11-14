import { Clock, Truck, Shield, DollarSign } from "lucide-react";

const trustItems = [
  {
    icon: Clock,
    title: "24/7 Service",
    description: "We're always available when you need us most",
  },
  {
    icon: Truck,
    title: "Free Towing",
    description: "No hidden fees - we tow your car for free",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully certified and trusted by Rhode Island",
  },
  {
    icon: DollarSign,
    title: "Same Day Payment",
    description: "Get paid immediately - cash or check",
  },
];

export default function TrustSignals() {
  return (
    <section className="py-12 lg:py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="text-center space-y-3"
                data-testid={`trust-signal-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="mx-auto w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-7 w-7 lg:h-8 lg:w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-base lg:text-lg" data-testid={`text-trust-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground mt-1" data-testid={`text-trust-description-${index}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
