import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much will you pay for my junk car?",
    answer: "The amount depends on your car's year, make, model, and condition. Most cars we buy range from $250 to $2,500. Get an instant estimate online, but call us for the best offer - we often pay more than our online calculator suggests!",
  },
  {
    question: "What cars do you accept?",
    answer: "We buy all cars, trucks, vans, and SUVs in any condition! Running or not, wrecked, flooded, or just old - we'll make you an offer. Even if it hasn't moved in years, we want it.",
  },
  {
    question: "Is towing really free?",
    answer: "Yes! We provide 100% free towing anywhere in Rhode Island. No hidden fees, no surprises. We come to you, pick up your car, and pay you on the spot.",
  },
  {
    question: "How fast can you pick up my car?",
    answer: "Most pickups happen within 24-48 hours. In many cases, we can come the same day you call! Just let us know when works best for you.",
  },
  {
    question: "Do I need the title?",
    answer: "Ideally yes, but we can work with you even if you don't have it. Give us a call and we'll explain your options based on your specific situation.",
  },
];

export default function FAQ() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-faq-subtitle">
              Got questions? We've got answers.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border rounded-lg px-6"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline" data-testid={`faq-question-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
