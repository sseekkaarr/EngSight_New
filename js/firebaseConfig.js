// firebaseConfig.js
const firebaseConfig = {
    apiKey: "AIzaSyA2Rde3oNX2vWyUSXi3ypzsxaBS-ODpzpY",
    authDomain: "engsight-123.firebaseapp.com",
    projectId: "engsight-123",
    storageBucket: "engsight-123.appspot.com",
    messagingSenderId: "651648885524",
    appId: "1:651648885524:web:2897afea66e45969115801",
    measurementId: "G-WBNHE2ZDNT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Define global variables
window.auth = firebase.auth();
window.db = firebase.firestore();

console.log("Firebase initialized:", app);
console.log("Auth initialized:", window.auth);
console.log("Firestore initialized:", window.db);