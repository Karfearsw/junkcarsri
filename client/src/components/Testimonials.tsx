import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Mike Sullivan",
    location: "Pawtucket, RI",
    rating: 3,
    quote: "Called on Monday, had cash in my hand by Tuesday afternoon. Way easier than I expected! They even towed my car for free from my backyard.",
  },
  {
    name: "Sarah Rodriguez",
    location: "Providence, RI",
    rating: 3,
    quote: "Honest people, fair price. My old Honda was just sitting there taking up space. One call and it was gone - plus I got $800! Highly recommend.",
  },
  {
    name: "Robert Chen",
    location: "Warwick, RI",
    rating: 3,
    quote: "Best decision I made all year. They gave me more than the scrap yard offered, picked it up the same day, and were super friendly. A+ service!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3" data-testid="text-testimonials-title">
            Happy Sellers Across Rhode Island
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-testimonials-subtitle">
            Join hundreds of satisfied customers who turned their junk into cash
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} data-testid={`testimonial-card-${index}`}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-sm leading-relaxed" data-testid={`text-testimonial-quote-${index}`}>
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <Avatar>
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm" data-testid={`text-testimonial-name-${index}`}>
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`text-testimonial-location-${index}`}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
