// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyB-Mx3vh58blq839zF76DY-dDM57tgUHKk",
  authDomain: "marvel-app-11ee9.firebaseapp.com",
  projectId: "marvel-app-11ee9",
  storageBucket: "marvel-app-11ee9.firebasestorage.app",
  messagingSenderId: "277091576696",
  appId: "1:277091576696:web:a0ba35928d52782f62768d",
  measurementId: "G-V2HMC3Q0S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };