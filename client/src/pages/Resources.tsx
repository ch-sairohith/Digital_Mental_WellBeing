import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Video, FileText, Headphones, Clock, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { auth } from "@/lib/firebase.ts";
import { logResourceViewed } from "@/lib/db.ts";

// Resource type definition
type Resource = {
  id: number;
  title: string;
  type: string;
  category: string;
  duration: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

// Resource Card Component - hooks must be in a component, not in map
function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const Icon = resource.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        className="group hover-elevate transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/30 h-full flex flex-col hover:scale-[1.02]"
      >
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <motion.div 
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform"
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
            >
              <Icon className="h-6 w-6 text-white" />
            </motion.div>
            <Badge variant="secondary" className="text-xs">
              {resource.type}
            </Badge>
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {resource.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {resource.description}
          </p>

          <div className="flex items-center justify-between pt-4 mt-auto border-t">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {resource.duration}
            </span>

            <Link
              href={`/resources/${resource.id}`}
              onClick={() => {
                const user = auth.currentUser;
                if (user) logResourceViewed(user.uid, resource.title);
              }}
            >
              <Button variant="ghost" size="sm" className="group-hover:text-primary group-hover:bg-primary/10">
                View →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const categories = [
  { name: "All", icon: BookOpen },
  { name: "Anxiety", icon: TrendingUp },
  { name: "Depression", icon: Headphones },
  { name: "Stress", icon: Clock },
  { name: "Sleep", icon: Video },
  { name: "Relationships", icon: FileText },
];

const resources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Student's Guide",
    type: "Article",
    category: "Anxiety",
    duration: "8 min read",
    icon: FileText,
    description: "Learn about anxiety triggers, symptoms, and practical coping strategies for campus life.",
  },
  {
    id: 2,
    title: "Breathing Exercises for Stress Relief",
    type: "Video",
    category: "Stress",
    duration: "12 min",
    icon: Video,
    description: "Follow along with guided breathing techniques to calm your mind during stressful moments.",
  },
  {
    id: 3,
    title: "Sleep Better: Tips for Students",
    type: "Audio",
    category: "Sleep",
    duration: "15 min",
    icon: Headphones,
    description: "Guided meditation and sleep hygiene tips to improve your rest and recovery.",
  },
  {
    id: 4,
    title: "Managing Academic Pressure",
    type: "Article",
    category: "Stress",
    duration: "10 min read",
    icon: FileText,
    description: "Strategies to balance coursework, exams, and self-care without burning out.",
  },
  {
    id: 5,
    title: "Building Healthy Relationships",
    type: "Video",
    category: "Relationships",
    duration: "18 min",
    icon: Video,
    description: "Understanding boundaries, communication, and maintaining connections in college.",
  },
  {
    id: 6,
    title: "Recognizing Depression Signs",
    type: "Article",
    category: "Depression",
    duration: "7 min read",
    icon: FileText,
    description: "Identify early warning signs and when to seek professional support.",
  },
  {
    id: 7,
    title: "Mindfulness Meditation for Beginners",
    type: "Audio",
    category: "Anxiety",
    duration: "10 min",
    icon: Headphones,
    description: "Start your mindfulness journey with simple, effective meditation practices.",
  },
  {
    id: 8,
    title: "Coping with Homesickness",
    type: "Video",
    category: "Depression",
    duration: "14 min",
    icon: Video,
    description: "Practical advice for dealing with being away from home and adjusting to campus life.",
  },
];

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Check for category in URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    if (categoryParam) {
      const decodedCategory = decodeURIComponent(categoryParam);
      // Validate category exists
      const validCategories = ["All", "Anxiety", "Depression", "Stress", "Sleep", "Relationships"];
      if (validCategories.includes(decodedCategory)) {
        setSelectedCategory(decodedCategory);
        // Scroll to category section after a brief delay
        setTimeout(() => {
          const categorySection = document.getElementById("category-section");
          if (categorySection) {
            categorySection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, [location]);

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Badge variant="secondary" className="mb-2">Resource Library</Badge>
              </motion.div>
              <motion.h1 
                className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Mental Health Resources
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Evidence-based articles, videos, and guides to support your mental wellness journey.
              </motion.p>

              <motion.div 
                className="relative max-w-xl mx-auto mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full text-base"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="category-section" className="container mx-auto px-4 py-12">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    className="px-4 py-2 cursor-pointer hover-elevate active-elevate-2 transition-all"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </Badge>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-20">
              <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <ChatBot />
    </div>
  );
}
