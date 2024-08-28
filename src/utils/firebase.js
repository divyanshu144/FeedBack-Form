// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAlNrV8qrktjimYBi4fvONVHVaiY3FbZI",
  authDomain: "feedback-form-4914e.firebaseapp.com",
  databaseURL: "https://feedback-form-4914e-default-rtdb.firebaseio.com",
  projectId: "feedback-form-4914e",
  storageBucket: "feedback-form-4914e.appspot.com",
  messagingSenderId: "892482366507",
  appId: "1:892482366507:web:d21777c08e2ce425740e6e",
  measurementId: "G-M4R93VHDDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});