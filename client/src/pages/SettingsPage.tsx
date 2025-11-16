"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase";
import { updatePassword } from "firebase/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState(auth.currentUser);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsub();
  }, []);

  const handleChangePassword = async () => {
    if (!user || !password) {
      toast({
        title: "Error",
        description: "Please enter a new password.",
        variant: "destructive",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      await updatePassword(user, password);
      toast({
        title: "Success",
        description: "Password updated successfully!",
      });
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.message || "Failed to update password. Try re-authenticating.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-lg mx-auto"
          >
            <Card className="bg-card/90 backdrop-blur-xl border-2 rounded-2xl shadow-xl">
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
                <p className="text-sm text-muted-foreground">Change your password and preferences</p>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div>
                  <label className="text-sm font-semibold">New Password</label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold">Confirm Password</label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setLocation("/")}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button onClick={handleChangePassword} disabled={saving}>
                    {saving ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
