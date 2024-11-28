// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzfEiRZDgx-y9NXRstZOgYF1_OCoydF0M",
  authDomain: "socialweb-9cd40.firebaseapp.com",
  projectId: "socialweb-9cd40",
  storageBucket: "socialweb-9cd40.firebasestorage.app",
  messagingSenderId: "610192891110",
  appId: "1:610192891110:web:b21fb8872990d17e91ef27",
  measurementId: "G-HZVQ7BP26C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Storage
const storage = firebase.storage();

// Initialize Auth
const auth = firebase.auth();

