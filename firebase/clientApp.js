// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEc4pUSh3rAsNjWXGdFAAvVLWuTf2TDK0",
  authDomain: "todolist-1a5df.firebaseapp.com",
  projectId: "todolist-1a5df",
  storageBucket: "todolist-1a5df.appspot.com",
  messagingSenderId: "963053230187",
  appId: "1:963053230187:web:a01fadae8ac9b0200db92e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
