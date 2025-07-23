
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAL9d9pyPq7PVMm8LkJQ-BIJW3pxhyr8VQ",
  authDomain: "pecel-kue-bu-eny.firebaseapp.com",
  projectId: "pecel-kue-bu-eny",
  storageBucket: "pecel-kue-bu-eny.firebasestorage.app",
  messagingSenderId: "769390245793",
  appId: "1:769390245793:web:d5fb83ecb88e1d39cefde0",
  measurementId: "G-6LN05CCYM3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
// Cek dulu apakah environment support Analytics
const analyticsPromise = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, analyticsPromise };