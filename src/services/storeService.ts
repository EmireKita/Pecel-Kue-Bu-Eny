import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { Store } from "@/types/Store";

const storeRef = doc(db, "store", "main");

export const getStore = async (): Promise<Store | null> => {
  const snapshot = await getDoc(storeRef);
  if (snapshot.exists()) {
    return snapshot.data() as Store;
  }
  return null;
};

export const updateStore = async (data: Store) => {
  const { id, ...cleanData } = data as any; // in case id is present
  await updateDoc(storeRef, cleanData);
};
