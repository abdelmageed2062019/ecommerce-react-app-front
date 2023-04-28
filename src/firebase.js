// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrKvBFkSYzEGhB-ZN7eyk0sItErjtJQSE",
  authDomain: "e-commerce-app-8bb36.firebaseapp.com",
  projectId: "e-commerce-app-8bb36",
  storageBucket: "e-commerce-app-8bb36.appspot.com",
  messagingSenderId: "255390033289",
  appId: "1:255390033289:web:e424aa247890f6d4872d58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// const googleProvider = new GoogleAuthProvider();
