// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDX_HJ1mWCb9WHrHur6CVIRF3g5XsqKyDk",
  authDomain: "sw-mftech.firebaseapp.com",
  projectId: "sw-mftech",
  storageBucket: "sw-mftech.firebasestorage.app",
  messagingSenderId: "776182047340",
  appId: "1:776182047340:web:5db0689d52ee40e5656e49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;