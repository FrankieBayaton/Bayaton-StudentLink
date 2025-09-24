// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnojkk6PZapk-uQcsa2iVS2sZ9E1iGWkg",
  authDomain: "bayaton-studentlink-848ae.firebaseapp.com",
  projectId: "bayaton-studentlink-848ae",
  storageBucket: "bayaton-studentlink-848ae.firebasestorage.app",
  messagingSenderId: "800245553729",
  appId: "1:800245553729:web:ec725fb8e8372abea084c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)