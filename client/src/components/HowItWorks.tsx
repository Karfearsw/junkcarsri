import { Phone, Truck, Banknote, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Phone,
    number: 1,
    title: "Call or Get Quote Online",
    description: "Reach out by phone or fill out our quick form. We'll ask a few simple questions about your car.",
  },
  {
    icon: Truck,
    number: 2,
    title: "We Pick Up Your Car",
    description: "Schedule a convenient time. We'll come to you with free towing - anywhere in Rhode Island.",
  },
  {
    icon: Banknote,
    number: 3,
    title: "Get Paid Instantly",
    description: "Receive payment on the spot. Cash or check - your choice. No waiting, no hassle.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3" data-testid="text-how-it-works-title">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-how-it-works-subtitle">
            Three simple steps to turn your junk car into cash
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={index} className="relative">
                <div className="text-center space-y-4" data-testid={`step-${step.number}`}>
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center relative z-10">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold" data-testid={`text-step-title-${step.number}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-step-description-${step.number}`}>
                    {step.description}
                  </p>
                </div>

                {!isLast && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border">
                    <ArrowRight className="absolute -right-2 -top-3 h-6 w-6 text-primary" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
