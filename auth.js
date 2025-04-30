// auth.js
import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

export function logout() {
  sessionStorage.clear();
  signOut(auth)
    .then(() => window.location.assign("login.html"))
    .catch((err) => console.error("Logout error:", err));
}
