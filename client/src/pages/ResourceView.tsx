import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  FileText,
  Video,
  Headphones,
  BookOpen,
  Play,
  Download,
  Share2,
  Bookmark,
  Check,
  Volume2,
  StopCircle
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

// Resource data - matching the structure from Resources.tsx
const resources = [
  {
    id: 1,
    title: "Understanding Anxiety: A Student's Guide",
    type: "Article",
    category: "Anxiety",
    duration: "8 min read",
    icon: FileText,
    description: "Learn about anxiety triggers, symptoms, and practical coping strategies for campus life.",
    content: `Anxiety is a common experience for students navigating the challenges of campus life. This comprehensive guide explores the various triggers and symptoms of anxiety, providing practical strategies to manage and overcome these feelings.

## What is Anxiety?

Anxiety is your body's natural response to stress. It's a feeling of fear or apprehension about what's to come. For students, this might manifest as worry about exams, social situations, or future career prospects.

## Common Triggers for Students

- Academic pressure and deadlines
- Social situations and making friends
- Financial concerns
- Future career uncertainty
- Homesickness
- Relationship challenges

## Recognizing Symptoms

Physical symptoms may include:
- Rapid heartbeat
- Sweating or trembling
- Fatigue or restlessness
- Difficulty concentrating
- Sleep disturbances

## Coping Strategies

1. **Breathing Exercises**: Practice deep breathing techniques when you feel anxious
2. **Time Management**: Create a realistic schedule to reduce academic pressure
3. **Physical Activity**: Regular exercise can significantly reduce anxiety levels
4. **Mindfulness**: Practice meditation or mindfulness exercises
5. **Seek Support**: Don't hesitate to reach out to campus counseling services

Remember, it's okay to ask for help. Your mental health is just as important as your academic success.`,
    author: "Dr. Sarah Johnson",
    publishedDate: "March 15, 2024",
    tags: ["Anxiety", "Student Life", "Coping Strategies"]
  },
  {
    id: 2,
    title: "Breathing Exercises for Stress Relief",
    type: "Document",
    category: "Stress",
    duration: "12 min",
    icon: FileText,
    description: "Follow along with guided breathing techniques to calm your mind during stressful moments.",
    content: `This guided video session will walk you through several proven breathing techniques designed to help you manage stress and anxiety effectively.

## Techniques Covered

### 1. Box Breathing
A simple technique used by athletes and professionals to maintain calm under pressure.

### 2. 4-7-8 Breathing
A powerful technique that can help you fall asleep faster and reduce anxiety.

### 3. Diaphragmatic Breathing
Deep belly breathing that activates your body's relaxation response.

## When to Use These Techniques

- Before exams or presentations
- During moments of panic or overwhelm
- When you can't sleep
- Anytime you feel stressed or anxious

Follow along with the video and practice these techniques regularly for best results.`,
    author: "Mindfulness Coach Emma Chen",
    publishedDate: "February 28, 2024",
    tags: ["Stress Relief", "Breathing", "Meditation"]
  },
  {
    id: 3,
    title: "Sleep Better: Tips for Students",
    type: "Document",
    category: "Sleep",
    duration: "15 min",
    icon: FileText,
    description: "Guided meditation and sleep hygiene tips to improve your rest and recovery.",
    content: `Quality sleep is essential for academic success and overall well-being. This audio guide combines sleep hygiene tips with a calming meditation to help you achieve better rest.

## Sleep Hygiene Tips

1. **Consistent Schedule**: Go to bed and wake up at the same time every day
2. **Create a Routine**: Develop a relaxing pre-sleep routine
3. **Limit Screen Time**: Avoid screens at least an hour before bed
4. **Comfortable Environment**: Keep your room cool, dark, and quiet
5. **Avoid Caffeine**: Limit caffeine intake, especially in the afternoon

## Guided Meditation Included

The audio includes a 10-minute guided meditation designed to help you:
- Release physical tension
- Quiet your mind
- Drift into peaceful sleep

Listen to this audio as you prepare for bed, and make it part of your nightly routine for best results.`,
    author: "Sleep Specialist Dr. Michael Park",
    publishedDate: "March 1, 2024",
    tags: ["Sleep", "Meditation", "Wellness"]
  },
  {
    id: 4,
    title: "Managing Academic Pressure",
    type: "Article",
    category: "Stress",
    duration: "10 min read",
    icon: FileText,
    description: "Strategies to balance coursework, exams, and self-care without burning out.",
    content: `Academic pressure is a reality for most students, but it doesn't have to overwhelm you. This article provides practical strategies to manage your workload while maintaining your mental health.

## Understanding Academic Pressure

Academic pressure comes from various sources:
- High expectations from yourself or others
- Heavy course loads
- Competitive environments
- Fear of failure
- Time constraints

## Effective Strategies

### 1. Prioritize and Plan
- Use a planner or digital calendar
- Break large tasks into smaller, manageable steps
- Set realistic goals and deadlines

### 2. Practice Self-Care
- Maintain regular sleep schedules
- Eat nutritious meals
- Exercise regularly
- Take breaks when needed

### 3. Seek Support
- Form study groups
- Utilize office hours
- Access campus resources
- Talk to counselors when overwhelmed

### 4. Develop Healthy Study Habits
- Find your optimal study environment
- Use active learning techniques
- Avoid cramming
- Take regular breaks

Remember, your worth is not determined by your grades. Balance is key to long-term success.`,
    author: "Academic Counselor Lisa Thompson",
    publishedDate: "February 20, 2024",
    tags: ["Academic Success", "Stress Management", "Time Management"]
  },
  {
    id: 5,
    title: "Building Healthy Relationships",
    type: "Document",
    category: "Relationships",
    duration: "18 min",
    icon: FileText,
    description: "Understanding boundaries, communication, and maintaining connections in college.",
    content: `College is a time of significant social growth. This video guide helps you navigate relationships, set healthy boundaries, and build meaningful connections.

## Topics Covered

### Communication Skills
- Active listening techniques
- Expressing needs clearly
- Handling conflicts constructively

### Setting Boundaries
- Recognizing your limits
- Saying no without guilt
- Respecting others' boundaries

### Building Connections
- Making friends in new environments
- Maintaining long-distance relationships
- Building professional networks

### Red Flags to Watch For
- Unhealthy relationship patterns
- Signs of toxic friendships
- When to seek help

This comprehensive guide will help you build the social skills necessary for healthy relationships throughout your life.`,
    author: "Relationship Counselor Dr. James Wilson",
    publishedDate: "March 10, 2024",
    tags: ["Relationships", "Communication", "Boundaries"]
  },
  {
    id: 6,
    title: "Recognizing Depression Signs",
    type: "Article",
    category: "Depression",
    duration: "7 min read",
    icon: FileText,
    description: "Identify early warning signs and when to seek professional support.",
    content: `Depression is more than just feeling sad. It's a serious mental health condition that affects millions of students. Early recognition and treatment are crucial for recovery.

## Warning Signs

### Emotional Symptoms
- Persistent sadness or emptiness
- Loss of interest in activities you once enjoyed
- Feelings of hopelessness or worthlessness
- Irritability or frustration
- Difficulty concentrating or making decisions

### Physical Symptoms
- Changes in sleep patterns (too much or too little)
- Changes in appetite or weight
- Fatigue or loss of energy
- Unexplained aches and pains

### Behavioral Changes
- Withdrawing from friends and activities
- Neglecting responsibilities
- Substance use
- Thoughts of self-harm or suicide

## When to Seek Help

If you experience several of these symptoms for more than two weeks, it's important to seek professional help. Depression is treatable, and you don't have to face it alone.

## Getting Support

- Campus counseling services
- Mental health hotlines
- Trusted friends or family
- Healthcare providers

Remember, seeking help is a sign of strength, not weakness.`,
    author: "Clinical Psychologist Dr. Amanda Rodriguez",
    publishedDate: "February 15, 2024",
    tags: ["Depression", "Mental Health", "Support"]
  },
  {
    id: 7,
    title: "Mindfulness Meditation for Beginners",
    type: "Document",
    category: "Anxiety",
    duration: "10 min",
    icon: FileText,
    description: "Start your mindfulness journey with simple, effective meditation practices.",
    content: `Mindfulness meditation is a powerful tool for managing anxiety and improving overall well-being. This beginner-friendly audio guide introduces you to the practice.

## What is Mindfulness?

Mindfulness is the practice of being fully present in the moment, aware of where we are and what we're doing, without being overly reactive or overwhelmed.

## Benefits

- Reduces anxiety and stress
- Improves focus and concentration
- Enhances emotional regulation
- Promotes better sleep
- Increases self-awareness

## Getting Started

This audio guide includes:
- A gentle introduction to meditation
- Basic breathing techniques
- Body scan practice
- Tips for maintaining a regular practice

## Practice Tips

1. Start with just 5-10 minutes daily
2. Find a quiet, comfortable space
3. Be patient with yourself
4. Consistency is more important than duration
5. Use guided meditations when starting out

Begin your mindfulness journey today and experience the transformative power of present-moment awareness.`,
    author: "Mindfulness Instructor David Kim",
    publishedDate: "March 5, 2024",
    tags: ["Mindfulness", "Meditation", "Anxiety Relief"]
  },
  {
    id: 8,
    title: "Coping with Homesickness",
    type: "Document",
    category: "Depression",
    duration: "14 min",
    icon: FileText,
    description: "Practical advice for dealing with being away from home and adjusting to campus life.",
    content: `Homesickness is a common experience for students, especially those living away from home for the first time. This video provides practical strategies to help you adjust and thrive.

## Understanding Homesickness

Homesickness is a normal emotional response to being separated from familiar people and places. It can affect anyone, regardless of age or experience.

## Common Feelings

- Longing for home and family
- Sadness or loneliness
- Anxiety about being away
- Difficulty adjusting to new routines
- Feeling disconnected

## Coping Strategies

### 1. Stay Connected
- Schedule regular calls or video chats with family
- Share your experiences with loved ones
- Send photos and updates

### 2. Build New Connections
- Join clubs or organizations
- Attend campus events
- Make friends in your dorm or classes
- Find a mentor or advisor

### 3. Create Comfort
- Bring familiar items from home
- Establish new routines
- Explore your new environment
- Find places that feel like "home"

### 4. Practice Self-Care
- Maintain healthy habits
- Get enough sleep
- Eat well
- Exercise regularly

### 5. Give It Time
- Adjustment takes time
- Be patient with yourself
- Focus on the positive aspects
- Celebrate small victories

Remember, homesickness usually decreases over time as you build new connections and routines.`,
    author: "Student Support Counselor Maria Garcia",
    publishedDate: "February 25, 2024",
    tags: ["Homesickness", "Adjustment", "Student Life"]
  },
];

export default function ResourceView() {
  const [, params] = useRoute("/resources/:id");
  const resourceId = params?.id ? parseInt(params.id, 10) : undefined;
  const resource = resourceId ? resources.find(r => r.id === resourceId) : undefined;
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const user = auth.currentUser;
  const contentRef = useRef<HTMLElement>(null);
  const [isReading, setIsReading] = useState(false);
  const [readingParagraph, setReadingParagraph] = useState<number | null>(null);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  // Unified text cleaner for both speech and display to ensure index matching
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/^#+\s+/, '') // Remove headers
      .replace(/^\-\s+/, '') // Remove list bullets
      .replace(/^\d+\.\s+/, '') // Remove numbered lists
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '') // Remove asterisks
      .trim();
  };

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    updateVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;

    return () => {
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setReadingParagraph(null);
      setHighlightedWordIndex(null);
      return;
    }

    if (!resource) return;

    // Scroll to content
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setIsReading(true);
    const renderParagraphs = resource.content.split('\n');

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    const utterances: SpeechSynthesisUtterance[] = [];

    renderParagraphs.forEach((text, index) => {
      if (!text.trim()) return;

      const cleanText = cleanMarkdown(text);
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Select a female voice if available
      const femaleVoice = voices.find(v =>
        v.name.includes('Female') ||
        v.name.includes('Zira') ||
        v.name.includes('Google US English') ||
        v.name.includes('Samantha')
      );

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      // Voice Modulation based on text type
      if (text.trim().startsWith('#')) {
        // Headers: Deeper, slower, more authoritative
        utterance.pitch = 0.9;
        utterance.rate = 0.85;
        utterance.volume = 1.1;
      } else if (text.trim().startsWith('-') || /^\d+\./.test(text.trim())) {
        // Lists: Slightly faster, distinct
        utterance.pitch = 1.05;
        utterance.rate = 0.95;
      } else {
        // Body text: Engaging, normal
        utterance.pitch = 1.1; // Slightly higher for engagement
        utterance.rate = 0.9;
      }

      utterance.onstart = () => {
        setReadingParagraph(index);
        setHighlightedWordIndex(null);
      };

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          // Calculate word index based on charIndex
          const words = cleanText.split(/\s+/);
          let currentLength = 0;
          let foundIndex = -1;

          for (let i = 0; i < words.length; i++) {
            if (currentLength <= event.charIndex && event.charIndex < currentLength + words[i].length + 1) {
              foundIndex = i;
              break;
            }
            currentLength += words[i].length + 1;
          }

          if (foundIndex !== -1) {
            setHighlightedWordIndex(foundIndex);
          }
        }
      };

      utterances.push(utterance);
    });

    if (utterances.length > 0) {
      utterances[utterances.length - 1].onend = () => {
        setIsReading(false);
        setReadingParagraph(null);
        setHighlightedWordIndex(null);
      };

      utterances.forEach(u => window.speechSynthesis.speak(u));
    } else {
      setIsReading(false);
    }
  };

  useEffect(() => {
    const checkSaved = async () => {
      if (!user || !resource) return;
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const savedResources = userDoc.data()?.savedResources || [];
        setIsSaved(savedResources.includes(resource.id));
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };
    checkSaved();
  }, [user, resource]);

  const handleSaveForLater = async () => {
    if (!user || !resource) {
      toast({
        title: "Please login",
        description: "You need to be logged in to save resources.",
        variant: "destructive",
      });
      return;
    }
    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const savedResources = userDoc.data()?.savedResources || [];
      if (isSaved) {
        const updated = savedResources.filter((id: number) => id !== resource.id);
        await updateDoc(doc(db, "users", user.uid), { savedResources: updated });
        setIsSaved(false);
        toast({
          title: "Removed",
          description: "Resource removed from your saved items in profile.",
        });
      } else {
        await updateDoc(doc(db, "users", user.uid), {
          savedResources: [...savedResources, resource.id]
        });
        setIsSaved(true);
        toast({
          title: "Saved Successfully! ✓",
          description: "Your file has been saved successfully in your profile. Feel free to check it out!",
        });
      }
    } catch (error) {
      console.error("Error saving resource:", error);
      toast({
        title: "Error",
        description: "Failed to save resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: resource?.title,
          text: resource?.description,
          url: window.location.href,
        });
        toast({
          title: "Shared",
          description: "Resource shared successfully!",
        });
      } catch (error: any) {
        if (error.name !== "AbortError") {
          // Fallback to clipboard
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Resource link copied to clipboard!",
    });
  };

  const handleDownloadPDF = async () => {
    if (!resource) return;

    try {
      // Create a simple text-based PDF using browser print
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        toast({
          title: "Error",
          description: "Please allow popups to download PDF.",
          variant: "destructive",
        });
        return;
      }

      // Format content with better styling
      const formattedContent = resource.content
        .split('\n')
        .map((para: string) => {
          if (para.trim().startsWith('##')) {
            return `<h2 style="color: #4ade80; margin-top: 30px; margin-bottom: 15px; font-size: 1.5em;">${para.replace('##', '').trim()}</h2>`;
          }
          if (para.trim().startsWith('###')) {
            return `<h3 style="color: #16a34a; margin-top: 20px; margin-bottom: 10px; font-size: 1.2em;">${para.replace('###', '').trim()}</h3>`;
          }
          if (para.trim().startsWith('-')) {
            return `<li style="margin: 8px 0; margin-left: 20px;">${para.replace('-', '').trim()}</li>`;
          }
          if (para.trim().startsWith('**') && para.trim().endsWith('**')) {
            return `<p style="font-weight: bold; margin: 15px 0;">${para.replace(/\*\*/g, '').trim()}</p>`;
          }
          if (para.trim()) {
            return `<p style="margin: 12px 0;">${para.trim()}</p>`;
          }
          return '';
        })
        .filter(p => p)
        .join('');

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${resource.title}</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; line-height: 1.8; max-width: 800px; margin: 0 auto; }
              h1 { color: #333; border-bottom: 3px solid #4ade80; padding-bottom: 15px; margin-bottom: 20px; }
              .meta { background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4ade80; }
              .meta p { margin: 8px 0; }
              .content { margin-top: 30px; }
              ul { list-style: none; padding-left: 0; }
              @media print {
                body { padding: 20px; }
              }
            </style>
          </head>
          <body>
            <h1>${resource.title}</h1>
            <div class="meta">
              <p><strong>Author:</strong> ${resource.author}</p>
              <p><strong>Published:</strong> ${resource.publishedDate}</p>
              <p><strong>Category:</strong> ${resource.category}</p>
              <p><strong>Duration:</strong> ${resource.duration}</p>
            </div>
            <div class="content">
              ${formattedContent}
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        toast({
          title: "PDF Ready",
          description: "Use your browser's print dialog to save as PDF.",
        });
      }, 250);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!resource) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 pt-24">
          <Card className="p-12 text-center animate-fade-in-up">
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Resource Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The resource you're looking for doesn't exist.
            </p>
            <Link href="/resources">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />

      </div>
    );
  }

  const Icon = resource.icon;

  return (
    <div className="min-h-screen bg-background">
      <Header />


      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto space-y-6"
            >
              <Link href="/resources">
                <Button variant="ghost" className="mb-4 hover:scale-105 transition-transform">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Resources
                </Button>
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {resource.type}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  {resource.category}
                </Badge>
              </div>

              <h1 className="font-accent text-4xl md:text-5xl lg:text-6xl font-bold">
                {resource.title}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {resource.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{resource.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>By {resource.author}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Published {resource.publishedDate}</span>
                </div>
              </div>

              <motion.div
                className="flex flex-wrap gap-3 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="rounded-full" onClick={handleReadAloud}>
                    {isReading ? (
                      <>
                        <StopCircle className="w-4 h-4 mr-2" />
                        Stop Reading
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 mr-2" />
                        Read Aloud
                      </>
                    )}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={isSaved ? "default" : "outline"}
                    className="rounded-full"
                    onClick={handleSaveForLater}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4 mr-2" />
                        Save for Later
                      </>
                    )}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleDownloadPDF}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className="container mx-auto px-4 py-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 md:p-12 shadow-lg border-2 hover:shadow-2xl transition-all duration-300">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed space-y-4">
                  {resource.content.split('\n').map((para, index) => {
                    const isParagraphActive = readingParagraph === index;
                    const paragraphClass = isParagraphActive ? "bg-primary/5 rounded-lg px-2 -mx-2 transition-colors duration-300" : "";

                    // Function to render text with word highlighting
                    const renderContent = (text: string) => {
                      const clean = cleanMarkdown(text);
                      if (!isParagraphActive) return clean;

                      return clean.split(/\s+/).map((word, wIndex) => (
                        <span
                          key={wIndex}
                          className={`transition-colors duration-200 ${isParagraphActive && highlightedWordIndex === wIndex
                            ? "bg-primary/20 text-primary font-medium rounded px-0.5"
                            : ""
                            }`}
                        >
                          {word}{' '}
                        </span>
                      ));
                    };

                    if (para.trim().startsWith('##')) {
                      return (
                        <motion.h2
                          key={index}
                          id={`para-${index}`}
                          className={`text-2xl font-bold text-foreground mt-8 mb-4 pb-2 border-b-2 border-primary/20 ${paragraphClass}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                          {renderContent(para)}
                        </motion.h2>
                      );
                    }
                    if (para.trim().startsWith('###')) {
                      return (
                        <motion.h3
                          key={index}
                          id={`para-${index}`}
                          className={`text-xl font-semibold text-foreground mt-6 mb-3 ${paragraphClass}`}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                          {renderContent(para)}
                        </motion.h3>
                      );
                    }
                    if (para.trim().startsWith('-')) {
                      return (
                        <motion.li
                          key={index}
                          id={`para-${index}`}
                          className={`flex items-start gap-2 ml-4 my-2 ${paragraphClass}`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.03 }}
                        >
                          <span className="text-primary mt-2">•</span>
                          <span>{renderContent(para)}</span>
                        </motion.li>
                      );
                    }
                    // Handle bold lines or numbered lists that might contain bolding
                    if ((para.trim().startsWith('**') && para.trim().endsWith('**')) || /^\d+\./.test(para.trim())) {
                      return (
                        <motion.p
                          key={index}
                          id={`para-${index}`}
                          className={`font-semibold text-foreground my-4 text-lg ${paragraphClass}`}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                          {renderContent(para)}
                        </motion.p>
                      );
                    }
                    if (para.trim()) {
                      return (
                        <motion.p
                          key={index}
                          id={`para-${index}`}
                          className={`my-3 ${paragraphClass}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.02 }}
                        >
                          {renderContent(para)}
                        </motion.p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </Card>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {resource.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Related Actions */}
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div>
                  <h3 className="font-semibold mb-2">Need More Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our counseling services are available 24/7 for students
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/counselors">
                    <Button variant="outline">
                      Find a Counselor
                    </Button>
                  </Link>

                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

