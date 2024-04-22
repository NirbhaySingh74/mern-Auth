// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c9625.firebaseapp.com",
  projectId: "mern-auth-c9625",
  storageBucket: "mern-auth-c9625.appspot.com",
  messagingSenderId: "960507676114",
  appId: "1:960507676114:web:eccb65db7695c3b8cff40b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
