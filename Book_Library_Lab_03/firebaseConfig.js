import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCO4Q1dRBAr4-E043vovUzg6jQbXDAGMyo",
  authDomain: "book-library-48e51.firebaseapp.com",
  projectId: "book-library-48e51",
  storageBucket: "book-library-48e51.firebasestorage.app",
  messagingSenderId: "833823515295",
  appId: "1:833823515295:web:2efbe7a8f60227b43bb8aa",
  measurementId: "G-4TNVLRNSLC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
