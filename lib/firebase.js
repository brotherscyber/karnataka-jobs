import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB0vRyoLAJ1NarFvL6QNRm4vvz2No9H6eU",
  authDomain: "karnataka-jobs-5524f.firebaseapp.com",
  projectId: "karnataka-jobs-5524f",
  storageBucket: "karnataka-jobs-5524f.firebasestorage.app",
  messagingSenderId: "337843940944",
  appId: "1:337843940944:web:05c8faa7d81eed8a302b55",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);