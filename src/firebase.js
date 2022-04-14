import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_STORAGEBUCKET = process.env.REACT_APP_FIREBASE_STORAGEBUCKET;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${FIREBASE_AUTH_DOMAIN}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: `${FIREBASE_STORAGEBUCKET}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENTID,
};

initializeApp(firebaseConfig);

export const db = getFirestore();
