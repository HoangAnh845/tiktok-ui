// // Import the functions you need from the SDKs you need
// import firebase from "firebase";
import firebase from "firebase";

console.log(firebase);
// // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzuwAj78VJLVl2V_vlTj57YKZP_91Bo9k",
    authDomain: "tiktok-ui-71085.firebaseapp.com",
    databaseURL: "https://tiktok-ui-71085-default-rtdb.firebaseio.com",
    projectId: "tiktok-ui-71085",
    storageBucket: "tiktok-ui-71085.appspot.com",
    messagingSenderId: "416698405838",
    appId: "1:416698405838:web:1509abe1b22a4f0eebd19f"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;