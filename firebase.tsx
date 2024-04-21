// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDSSTgpT4xaSeHLyRPX15S8-VF_bzc1R0E",
  authDomain: "quest-backend-edb3b.firebaseapp.com",
  projectId: "quest-backend-edb3b",
  storageBucket: "quest-backend-edb3b.appspot.com",
  messagingSenderId: "150683813783",
  appId: "1:150683813783:web:ffc07896cbe3f853a526d2",
  measurementId: "G-QB5HC1GG9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth