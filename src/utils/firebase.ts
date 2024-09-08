// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "cogent-5dcf9.firebaseapp.com",
  projectId: "cogent-5dcf9",
  storageBucket: "cogent-5dcf9.appspot.com",
  messagingSenderId: "577109663658",
  appId: "1:577109663658:web:79b0977ee637d3212215d3",
  measurementId: "G-BNJJCNEH5Z",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
