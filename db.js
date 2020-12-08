import firebase from "firebase";
require("@firebase/firestore")
var firebaseConfig = {
  apiKey: "AIzaSyD1N_hrCSdTX4eR3b3awW0rfoaFkVZ8ioQ",
  authDomain: "barter-cd354.firebaseapp.com",
  projectId: "barter-cd354",
  storageBucket: "barter-cd354.appspot.com",
  messagingSenderId: "468097794375",
  appId: "1:468097794375:web:e36f25219d969584a94c62"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()