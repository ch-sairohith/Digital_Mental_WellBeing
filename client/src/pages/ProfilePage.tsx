"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit3, Save, User, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatBot } from "@/components/ChatBot";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
      setDisplayName(u?.displayName || "");
      setPhotoURL(u?.photoURL || "");
    });
    return () => unsub();
  }, []);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `avatars/${user.uid}.jpg`);
    setUploading(true);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL: url });
      await updateDoc(doc(db, "users", user.uid), { photoURL: url });
      setPhotoURL(url);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName });
      await updateDoc(doc(db, "users", user.uid), { name: displayName });
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
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
            className="max-w-xl mx-auto"
          >
            <Card className="bg-card/90 backdrop-blur-xl border-2 rounded-2xl shadow-xl">
              <CardHeader className="flex flex-col items-center text-center space-y-3 pt-10">
                <div className="relative">
                  {photoURL ? (
                    <img src={photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-primary object-cover" />
                  ) : (
                    <div className="w-24 h-24 rounded-full flex items-center justify-center bg-primary/10 text-primary border-4 border-primary">
                      <User className="h-10 w-10" />
                    </div>
                  )}
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-1 bg-primary rounded-full p-2 cursor-pointer hover:scale-105 transition">
                    <Upload className="h-4 w-4 text-white" />
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} disabled={uploading} />
                  </label>
                </div>
                <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div>
                  <label className="text-sm font-semibold">Full Name</label>
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-semibold">Email</label>
                  <Input value={user?.email || ""} disabled className="mt-2 opacity-70" />
                </div>
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setLocation("/")}>
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back
                  </Button>
                  <Button onClick={handleSave} disabled={saving || uploading}>
                    {saving ? "Saving..." : "Save"}
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
