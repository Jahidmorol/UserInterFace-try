// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTPxbYmRNvrX2x4NvCHYTshOkm5IopiGI",
  authDomain: "email-password-auth-3ce75.firebaseapp.com",
  projectId: "email-password-auth-3ce75",
  storageBucket: "email-password-auth-3ce75.appspot.com",
  messagingSenderId: "1034126052560",
  appId: "1:1034126052560:web:f860cf12f2668b255422d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app