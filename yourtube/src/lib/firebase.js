import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbkmT_mjMVq3G-_GMybiDkah1CDDqcBUY",
  authDomain: "yourtube-4974f.firebaseapp.com",
  projectId: "yourtube-4974f",
  storageBucket: "yourtube-4974f.firebasestorage.app",
  messagingSenderId: "182559205023",
  appId: "1:182559205023:web:704409bd98075ddce3e4aa",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();