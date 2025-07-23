// services/faqService.ts
import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import type { Faq, FaqWithId } from "@/types/Faq";

const faqRef = collection(db, "faqs");

export const getFaqs = async (): Promise<FaqWithId[]> => {
    const snapshot = await getDocs(faqRef);
    return snapshot.docs.map((doc) => {
      const data = doc.data() as Faq;
      return {
        id: doc.id,
        ...data,
      };
    });
  };

export const addFaq = async (data: Faq) => {
  await addDoc(faqRef, data);
};

export const updateFaq = async (id: string, data: Faq) => {
  const docRef = doc(db, "faqs", id);
  await updateDoc(docRef, data as any);
};

export const deleteFaq = async (id: string) => {
  const docRef = doc(db, "faqs", id);
  await deleteDoc(docRef);
};
