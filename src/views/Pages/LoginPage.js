import firebase from "firebase";
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyArlmG733yMlNx9NB1dU36CF0ABsy9X7B4",
    authDomain: "irepair-9a97f.firebaseapp.com",
    databaseURL: "https://irepair-9a97f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "irepair-9a97f",
    storageBucket: "irepair-9a97f.appspot.com",
    messagingSenderId: "677491976614",
    appId: "1:677491976614:web:3c3baeb634bab230040767",
    measurementId: "G-ES2FWLTWYC"
  };
  firebase.initializeApp(firebaseConfig);
 
  export default firebase