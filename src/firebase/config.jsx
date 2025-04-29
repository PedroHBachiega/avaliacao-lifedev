import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDEmhIsLM-CE9TemfHtVIZL8XPgEHZ4Kl8",
    authDomain: "avaliacaodw.firebaseapp.com",
    projectId: "avaliacaodw",
    storageBucket: "avaliacaodw.firebasestorage.app",
    messagingSenderId: "381765117011",
    appId: "1:381765117011:web:da9ae1fb9961cfccb712a6",
    measurementId: "G-9NVDX64LL0"
  };

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }