import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
import 'firebase/auth';

// const firebaseConfig = {
//     apiKey: "AIzaSyArlmG733yMlNx9NB1dU36CF0ABsy9X7B4",
//     authDomain: "irepair-9a97f.firebaseapp.com",
//     projectId: "irepair-9a97f",
//     storageBucket: "irepair-9a97f.appspot.com",
//     messagingSenderId: "677491976614",
//     appId: "1:677491976614:web:6f85af244461fd1b040767",
//     measurementId: "G-G367QJKYDG"
//   };

const app = firebase.initializeApp({
    apiKey: "AIzaSyArlmG733yMlNx9NB1dU36CF0ABsy9X7B4",
    authDomain: "irepair-9a97f.firebaseapp.com",
    projectId: "irepair-9a97f",
    storageBucket: "irepair-9a97f.appspot.com",
    messagingSenderId: "677491976614",
    appId: "1:677491976614:web:3c3baeb634bab230040767",
    measurementId: "G-ES2FWLTWYC"});

if (!firebase.apps.length) {
  app;
}else {
  firebase.app(); // if already initialized, use that one
}
const storage = firebase.storage();
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IklJY3YyMGVPeGVibmJsOVM3Sm00WnNsZnVUODIiLCJjZXJ0c2VyaWFsbnVtYmVyIjoiNWYxYzhkMjItNGM0ZS00MmE0LWFmYTgtODE2ZjRmZDAwNWIwIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjMzODY4MzQ0LCJleHAiOjE2MzM5NTQ3NDQsImlhdCI6MTYzMzg2ODM0NH0.UGHIVGarMnVEevVMIKNw-2Qd0lcJV7eAEuL_XwOgDfw");
    // localStorage.setItem("name", res.name);
    // localStorage.setItem("email", res.data.email);
    
    //This is JWT
    console.log(await user.getIdToken());
    ////////////
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// const signInWithEmailAndPassword = async (email, password) => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const registerWithEmailAndPassword = async (name, email, password) => {
//   try {
//     const res = await auth.createUserWithEmailAndPassword(email, password);
//     const user = res.user;
//     await db.collection("users").add({
//       uid: user.uid,
//       name,
//       authProvider: "local",
//       email,
//     });
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
// const sendPasswordResetEmail = async (email) => {
//   try {
//     await auth.sendPasswordResetEmail(email);
//     alert("Password reset link sent!");
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const logout = () => {
  auth.signOut();
};

export {
  auth,
  db,
  storage,
  // firebase as default,
  signInWithGoogle,
  // signInWithEmailAndPassword,
  // registerWithEmailAndPassword,
  // sendPasswordResetEmail,
  logout,
};

