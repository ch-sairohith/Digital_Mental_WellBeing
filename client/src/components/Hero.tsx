import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Gamepad2, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@assets/generated_images/Hero_supportive_students_illustration_d02ef8d9.png";

export function Hero() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleBoredClick = () => {
    toast({
      title: "We got you covered! 📚",
      description: "Taking you to some resources...",
      duration: 2000,
    });
    setTimeout(() => setLocation("/resources"), 1500);
  };

  const handleStressedClick = () => {
    toast({
      title: "We got you covered! 🎮",
      description: "Redirecting you to fun activities...",
      duration: 2000,
    });
    setTimeout(() => setLocation("/games"), 1500);
  };

  return (
    <section className="relative w-full overflow-hidden pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/30 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-2 border border-primary/20" data-testid="badge-tagline">
                🌱 Mental Health Support
              </Badge>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="font-accent text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent" data-testid="text-hero-title">
                Your Mental Health, Our Priority
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed" data-testid="text-hero-subtitle">
                AI-guided help, just when you need it. Anonymous. Secure. Stigma-free.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="rounded-full text-base transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={handleBoredClick}
                data-testid="button-bored"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Bored?
              </Button>
              <Button
                size="lg"
                className="rounded-full text-base transition-all hover:scale-105 shadow-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600"
                onClick={handleStressedClick}
                data-testid="button-stressed"
              >
                <Gamepad2 className="mr-2 h-5 w-5" />
                Stressed?
              </Button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {["100% Confidential", "Available 24/7", "Expert-Backed"].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl -z-10" />
            <motion.img
              src={heroImage}
              alt="Diverse students supporting each other in a warm, inclusive environment"
              className="w-full h-auto rounded-3xl shadow-2xl"
              data-testid="img-hero"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
