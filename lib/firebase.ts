import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// IMPORTANT: Replace with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyDf8fWEqcsW4MW5xUj-jXIUiSRKib06GpQ",
    authDomain: "tullin-ecce0.firebaseapp.com",
    projectId: "tullin-ecce0",
    storageBucket: "tullin-ecce0.firebasestorage.app",
    messagingSenderId: "731579369642",
    appId: "1:731579369642:web:cb2267044a6f3d34e6e8d3"
  };
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const firestore = getFirestore(app)

export { firestore }
