// src/services/loginService.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/services/firebase"; // pastikan ini sesuai path-mu

export const loginWithUsername = async (username: string, password: string) => {
  const q = query(collection(db, "adminUsers"), where("username", "==", username));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    throw new Error("Username tidak ditemukan");
  }

  const email = snapshot.docs[0].data().email;

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};
