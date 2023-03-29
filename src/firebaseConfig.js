// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtDdyhTwJWIzJVq0RsetmYPedhmCA9RFc",
  authDomain: "shoesshoppingauth.firebaseapp.com",
  projectId: "shoesshoppingauth",
  storageBucket: "shoesshoppingauth.appspot.com",
  messagingSenderId: "175492558479",
  appId: "1:175492558479:web:148033ac4cf639c248cafa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
