import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDMJSqhiWS_nEcX8jWUkMy7F0cWbIbjONI",
  authDomain: "my-project-6b77a.firebaseapp.com",
  projectId: "my-project-6b77a",
  storageBucket: "my-project-6b77a.appspot.com",
  messagingSenderId: "15864832683",
  appId: "1:15864832683:web:0daeb69ba85fb361e28dee",
  measurementId: "G-6V7F15P5PY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const regSubmitBtn = document.getElementById("regSubmitBtn");
regSubmitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("reg_email").value;

  const password = document.getElementById("reg_password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("registerForm").style.display = "none";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
});

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;

  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      document.getElementById("exampleModal").style.display = "none";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    document.getElementById("headerLoginBtn").innerHTML = "Signed In";
    document.getElementById("headerLogOutBtn").style.display = "block";

    // ...
  } else {
    // User is signed out
    // ...
  }
});
const logOut = document.getElementById("headerLogOutBtn");
logOut.addEventListener("click", function () {
  signOut(auth)
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});
