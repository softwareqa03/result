import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

export const firebaseConfig = {
    apiKey: "AIzaSyALJ8xG21RcevPI2Le_3tohfu-M2gW8szc",
    authDomain: "pm-patel-high-school.firebaseapp.com",
    databaseURL: "https://pm-patel-high-school-default-rtdb.firebaseio.com",
    projectId: "pm-patel-high-school",
    storageBucket: "pm-patel-high-school.appspot.com",
    messagingSenderId: "334539397246",
    appId: "1:334539397246:web:8c6a67a82e2380f9a6202f",
    measurementId: "G-EE8WWLZBBV"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();