import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8hgYuRY2NN_44OG7n9-CnzUeeuDch6dA",
  authDomain: "trip-share-102d9.firebaseapp.com",
  projectId: "trip-share-102d9",
  storageBucket: "trip-share-102d9.appspot.com",
  messagingSenderId: "278074295427",
  appId: "1:278074295427:web:af0f02760d6114333047b6",
  measurementId: "G-T3GQY58WF7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
