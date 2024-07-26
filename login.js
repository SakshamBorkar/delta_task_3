// Import Firebase scripts
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-auth.js";

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
// Initialize Fireba`s`e
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = document.getElementById('email-l').value;
            const password = document.getElementById('password-l').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user) {
                        window.location.href = './music.html'
                    }
                    console.log('User logged in:', user);
                    alert('Login successful!');
                    // Redirect to dashboard or desired page
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error('Error:', errorCode, errorMessage);
                    alert('Invalid credentials. Please try again.');
                });
        });
    }
});
