import firebase from "firebase/app";
import "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAzZ-YiKTzsF8y_MO-0F3h65WzwW0KGCes",
    authDomain: "ecommerce-9d27b.firebaseapp.com",
    projectId: "ecommerce-9d27b",
    storageBucket: "ecommerce-9d27b.appspot.com",
    messagingSenderId: "956139818163",
    appId: "1:956139818163:web:15aa88eb32e0a55a9ab4c6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();