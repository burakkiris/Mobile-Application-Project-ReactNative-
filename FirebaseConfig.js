// firebaseConfig.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAheyaAvSuIZcqu8jk980j84Js3L0da3Jg",
  authDomain: "duygu1-ca862.firebaseapp.com",
  projectId: "duygu1-ca862",
  storageBucket: "duygu1-ca862.appspot.com",
  messagingSenderId: "158489630236",
  appId: "1:158489630236:web:0a6970dabc9600864331d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
