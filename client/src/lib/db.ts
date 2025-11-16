import { db } from "./firebase";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

function getToday() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}

// ------------------- GAME LOGGING -------------------
export async function logGamePlayed(uid: string, gameName: string) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      gamesPlayed: arrayUnion(gameName),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- RESOURCE LOGGING -------------------
export async function logResourceViewed(uid: string, resourceTitle: string) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      resourcesUsed: arrayUnion(resourceTitle),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- MOOD LOGGING -------------------
export async function logMood(uid: string, moodAvg: number) {
  const today = getToday();
  const docRef = doc(db, `users/${uid}/dailyStats/${today}`);

  await setDoc(
    docRef,
    {
      moodAvg,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

// ------------------- BOOKING SAVE -------------------
export interface BookingData {
  userId: string;
  userEmail: string;
  userName: string;
  counsellorId?: number;
  counsellorName: string;
  specialization: string;
  sessionType: "video" | "in-person";
  date: string;
  time: string;
  duration: string;
  price: string;
  status?: "pending" | "confirmed" | "completed" | "cancelled";
}

export async function saveBooking(bookingData: BookingData) {
  try {
    const bookingsRef = collection(db, "bookings");
    const bookingDoc = await addDoc(bookingsRef, {
      ...bookingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: bookingData.status || "confirmed",
    });
    return bookingDoc.id;
  } catch (error) {
    console.error("Error saving booking:", error);
    throw error;
  }
}
