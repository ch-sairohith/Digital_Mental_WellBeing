import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PanicButton } from "@/components/PanicButton";
import {
  TrendingUp,
  Smile,
  Moon,
  Calendar,
  Activity,
  BookOpen,
  Heart,
  ArrowUpCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link, useLocation } from "wouter";
import { MoodScanner } from "@/components/MoodScanner";
import { motion, useInView } from "framer-motion";

const moodData = [
  { day: "Mon", mood: 7, sleep: 6 },
  { day: "Tue", mood: 6, sleep: 7 },
  { day: "Wed", mood: 8, sleep: 8 },
  { day: "Thu", mood: 5, sleep: 5 },
  { day: "Fri", mood: 7, sleep: 6 },
  { day: "Sat", mood: 9, sleep: 9 },
  { day: "Sun", mood: 8, sleep: 8 },
];

const upcomingSessions = [
  {
    id: 1,
    counsellor: "Dr. Sarah Johnson",
    date: "Tomorrow",
    time: "2:00 PM",
    type: "Video Call",
  },
  {
    id: 2,
    counsellor: "Dr. Michael Chen",
    date: "Friday",
    time: "10:00 AM",
    type: "In-Person",
  },
];

const recentActivities = [
  {
    id: 1,
    activity: "Completed breathing exercise",
    time: "2 hours ago",
    icon: Activity,
  },
  {
    id: 2,
    activity: "Read article on stress management",
    time: "Yesterday",
    icon: BookOpen,
  },
  { id: 3, activity: "Logged mood: Happy", time: "Yesterday", icon: Smile },
  {
    id: 4,
    activity: "Joined peer support forum",
    time: "2 days ago",
    icon: Heart,
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 🆙 Scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ⬆️ Scroll back to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background relative">
      <Header />

      <main className="pt-24 pb-20">
        {/* 🌅 Hero Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Badge variant="secondary" className="mb-2 mx-auto">
                      Dashboard
                    </Badge>
                  </motion.div>
                  <motion.h1
                    className="font-accent text-4xl md:text-5xl font-bold mb-2"
                    data-testid="text-dashboard-welcome"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Welcome back!
                  </motion.h1>
                  <motion.p 
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Here's an overview of your mental wellness journey 🌱
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <PanicButton />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MoodScanner />
        </motion.div>

        {/* 🧩 Stats Section */}
        <section className="container mx-auto px-4 py-12">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <DashboardStat
              icon={<TrendingUp className="h-6 w-6 text-white" />}
              gradient="from-green-500 to-emerald-600"
              label="Mood tracking streak"
              value="7 Days"
              badge="This Week"
              onClick={() => setLocation("/analytics/mood")}
            />
            <DashboardStat
              icon={<Smile className="h-6 w-6 text-white" />}
              gradient="from-blue-500 to-cyan-600"
              label="Weekly mood score"
              value="7.1/10"
              badge="Average"
              onClick={() => setLocation("/analytics/mood")}
            />
            <DashboardStat
              icon={<Moon className="h-6 w-6 text-white" />}
              gradient="from-purple-500 to-pink-600"
              label="Reccommendations"
              value="good sleep"
              badge="Average"
              onClick={() => setLocation("/analytics/sleep")}
            />
            <DashboardStat
              icon={<Calendar className="h-6 w-6 text-white" />}
              gradient="from-orange-500 to-red-600"
              label="Counselling sessions"
              value="3"
              badge="Total"
              onClick={() => setLocation("/booking")}
            />
          </motion.div>

          {/* 📈 Charts + Sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <Card
              className="lg:col-span-2 border-2 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-accent text-2xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Mood Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="day" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* 🧘 Upcoming Sessions */}
            <Card className="border-2 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-accent text-xl">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivities.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.activity}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* 🌙 Sleep Chart + Recent Activity */}
          {/* 📸 Mood Scanner Integration */}
        </section>
      </main>

      <Footer />
      <ChatBot />

      {/* ⬆️ Floating Scroll Button */}
      {showTopBtn && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 rounded-full p-3 shadow-lg hover:scale-110 bg-primary text-primary-foreground"
        >
          <ArrowUpCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}

/* Reusable stat card component with click support */
function DashboardStat({
  icon,
  gradient,
  label,
  value,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  gradient: string;
  label: string;
  value: string;
  badge: string;
  onClick?: () => void;
}) {
  return (
    <Card
      onClick={onClick}
      className="hover-elevate cursor-pointer transition-all duration-300 border-2 animate-fade-in-up hover:scale-[1.02]"
    >
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <div
            className={`h-12 w-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
          >
            {icon}
          </div>
          <Badge variant="secondary">{badge}</Badge>
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

