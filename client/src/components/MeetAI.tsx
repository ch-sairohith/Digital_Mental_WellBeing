import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles, Shield, Clock } from "lucide-react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function MeetAI() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="w-full py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 -z-10" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge variant="secondary" className="mb-2">Meet Your AI Assistant</Badge>
            </motion.div>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="font-accent text-3xl md:text-4xl lg:text-5xl font-bold" data-testid="text-meet-ai-title">
                Your Compassionate AI Companion
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI assistant is trained to understand student mental health challenges with empathy and care.
                It's like talking to a friend who's always there to listen, never judges, and offers helpful guidance.
              </p>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { icon: Sparkles, title: "Smart & Understanding", desc: "Recognizes emotional cues and responds with appropriate support" },
                { icon: Shield, title: "Private & Secure", desc: "Your conversations are encrypted and completely confidential" },
                { icon: Clock, title: "Always Available", desc: "24/7 support whenever you need someone to talk to" }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-card hover-elevate transition-all"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>


          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl blur-3xl -z-10 animate-pulse-slow" />
            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 shadow-2xl">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">MindEase AI</h3>
                      <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-sm">Hello! I'm here to support you. How are you feeling today?</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                        <p className="text-sm">I've been feeling stressed about exams...</p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                        <p className="text-sm">I understand exam stress can be overwhelming. Let's talk about some coping strategies that might help...</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex gap-2">
                      <div className="flex-1 bg-muted rounded-full px-4 py-2 text-sm text-muted-foreground">
                        Type your message...
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
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
