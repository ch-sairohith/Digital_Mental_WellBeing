import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Calendar, BookOpen, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    icon: MessageCircle,
    title: "Start a Conversation",
    description: "Chat with our AI assistant anytime. Share what's on your mind in a safe, judgment-free space.",
    step: "01",
  },
  {
    icon: Calendar,
    title: "Book Professional Help",
    description: "Connect with licensed counsellors when you need deeper support. Choose your time and specialist.",
    step: "02",
  },
  {
    icon: BookOpen,
    title: "Explore Resources",
    description: "Access our library of videos, articles, and guides on mental wellness tailored for students.",
    step: "03",
  },
  {
    icon: TrendingUp,
    title: "Track Your Progress",
    description: "Log your moods daily and visualize your journey. Understand patterns and celebrate growth.",
    step: "04",
  },
];

export function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-2">How It Works</Badge>
          <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-how-it-works-title">
            Simple Steps to Better Mental Health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting support shouldn't be complicated. Here's how MindEase works for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const cardRef = useRef(null);
            const cardInView = useInView(cardRef, { once: true, margin: "-50px" });
            
            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, y: 50, scale: 0.9, rotate: index % 2 === 0 ? -2 : 2 }}
                animate={cardInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card
                  className="relative overflow-hidden group hover-elevate transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20 h-full"
                  data-testid={`card-step-${index + 1}`}
                >
                  <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5 -mr-4 -mt-4">
                    {step.step}
                  </div>
                  <CardContent className="pt-8 pb-6 space-y-4 relative">
                    <motion.div 
                      className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="font-accent text-xl font-semibold" data-testid={`text-step-title-${index + 1}`}>
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed" data-testid={`text-step-description-${index + 1}`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Badge({ children, variant, className }: { children: React.ReactNode; variant?: string; className?: string }) {
  return (
    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium bg-secondary text-secondary-foreground ${className}`}>
      {children}
    </span>
  );
}
