import { Heart, Instagram, Twitter, Facebook } from "lucide-react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer ref={footerRef} className="w-full border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" fill="currentColor" />
              <span className="font-accent text-xl font-bold">MindEase Campus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your Mental Health, Our Priority
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Twitter, name: "twitter" },
                { Icon: Instagram, name: "instagram" },
                { Icon: Facebook, name: "facebook" }
              ].map(({ Icon, name }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="hover-elevate active-elevate-2 p-2 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-social-${name}`}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/privacy", label: "Privacy Policy", testId: "link-footer-privacy" },
                { href: "/terms", label: "Terms of Service", testId: "link-footer-terms" },
                { href: "/faq", label: "FAQ", testId: "link-footer-faq" },
                { href: "/crisis", label: "Crisis Resources", testId: "link-footer-crisis" }
              ].map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Link href={link.href}>
                    <a className="text-sm text-muted-foreground hover-elevate active-elevate-2 inline-block px-2 py-1 rounded-lg" data-testid={link.testId}>
                      {link.label}
                    </a>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-semibold text-lg">Get Help Now</h3>
            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Crisis Hotline:</strong>
                <br />
                988 Suicide & Crisis Lifeline
              </p>
              <p className="text-muted-foreground">
                <strong className="text-foreground">Text Support:</strong>
                <br />
                Text HOME to 741741
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t pt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MindEase Campus. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            This platform is not a substitute for professional mental health care. If you're in crisis, please contact emergency services.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
