import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

export function useScrollAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return { ref, isInView };
}

export function ScrollAnimationWrapper({ 
  children, 
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  rotate = false
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale" | "rotate";
  scale?: boolean;
  rotate?: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getInitialState = () => {
    const base = {
      opacity: 0,
    };
    
    switch (direction) {
      case "up": return { ...base, y: 50, scale: scale ? 0.9 : 1 };
      case "down": return { ...base, y: -50, scale: scale ? 0.9 : 1 };
      case "left": return { ...base, x: 50, scale: scale ? 0.9 : 1 };
      case "right": return { ...base, x: -50, scale: scale ? 0.9 : 1 };
      case "fade": return { ...base, scale: scale ? 0.9 : 1 };
      case "scale": return { ...base, scale: 0.8 };
      case "rotate": return { ...base, rotate: -10, scale: scale ? 0.9 : 1 };
      default: return { ...base, y: 0, scale: 1 };
    }
  };

  const getAnimateState = () => {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
    };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isInView ? getAnimateState() : getInitialState()}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

