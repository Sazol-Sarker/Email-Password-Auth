// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATbou-ulYqlZaOtH4876_H4-HJW1uk-Us",
  authDomain: "fir-auth-emailpassword-1a16b.firebaseapp.com",
  projectId: "fir-auth-emailpassword-1a16b",
  storageBucket: "fir-auth-emailpassword-1a16b.firebasestorage.app",
  messagingSenderId: "134445522552",
  appId: "1:134445522552:web:4c26b2ea564487ecfc178d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

export default auth;