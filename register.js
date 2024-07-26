// Import Firebase scripts
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCIho9gZTaZRrWbJR-Qw41jACMJwDovxI",
    authDomain: "dtunes-53f1e.firebaseapp.com",
    projectId: "dtunes-53f1e",
    storageBucket: "dtunes-53f1e.appspot.com",
    messagingSenderId: "558538668299",
    appId: "1:558538668299:web:5f1484c2f042596cc60a0e",
    measurementId: "G-RJ201WTZ63"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('user').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    console.log('User registered:', user);
                    alert('Registration successful!');
                    // Redirect to login or dashboard
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error:', errorCode, errorMessage);
                    alert('Registration failed. Please try again.');
                });
        });
    }
});
