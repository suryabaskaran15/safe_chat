// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcxxv74BEF4lFBtcysKbZZHlRMlNlS9qc",
  authDomain: "safe-chat-a20bb.firebaseapp.com",
  projectId: "safe-chat-a20bb",
  storageBucket: "safe-chat-a20bb.appspot.com",
  messagingSenderId: "620298663538",
  appId: "1:620298663538:web:6780cfce697f59e6c634eb",
  measurementId: "G-8WPG53Q5LB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
