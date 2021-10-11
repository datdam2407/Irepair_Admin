import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
import 'firebase/auth';
import { post } from "../../src/service/ReadAPI";


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
    let t = await getToken(res.user._lat);
    localStorage.setItem("token", t.data.token);
    // localStorage.setItem("name", res.name);
    // localStorage.setItem("email", res.data.email);
  } catch (err) {
      console.log(err)
      return
  }
};
async function getToken (FBasetoken){
  return await post(`/api/v1.0/authenticate-admins?token=${FBasetoken}` ,
  {  token : FBasetoken} );
}

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

