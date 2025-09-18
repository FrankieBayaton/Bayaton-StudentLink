// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM69cL_LDOkiS03jEAdoQ3X-IVvaMqT2E",
  authDomain: "bayaton-studentlink.firebaseapp.com",
  projectId: "bayaton-studentlink",
  storageBucket: "bayaton-studentlink.firebasestorage.app",
  messagingSenderId: "524292639710",
  appId: "1:524292639710:web:e195e33d1065f90ee0ab4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);