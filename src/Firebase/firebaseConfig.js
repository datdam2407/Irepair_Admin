import firebase from "firebase";
import "firebase/storage";
import 'firebase/firestore';
import 'firebase/auth';
import { post } from "../../src/service/ReadAPI";


export const app = firebase.initializeApp({
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

    let t = await getToken(res.user._lat); // token firebase
    localStorage.setItem("token", t.data.token);// token Api
    localStorage.setItem("email", t.data.email);// token Api
    localStorage.setItem("IDADMIN", t.data.id);// token Api
    localStorage.setItem("NAME", t.data.name);// token Api
    localStorage.setItem("ADDRESS", t.data.addressDetail);// token Api
    localStorage.setItem("PHONE", t.data.phoneNumber);// token Api
    // console.log("respone", res);
 console.log("email ne", t.data.email)
    // localStorage.setItem("name", res.name);
    // localStorage.setItem("email", t.data.email);
  } catch (err) {
      console.log(err)
      return
  }
};
async function getToken (FBasetoken){
  return await post(`/api/v1.0/authenticate-admins?token=${FBasetoken}` ,
  {  token : FBasetoken} );
}

const logout = () => {
  auth.signOut();
                localStorage.clear();
              sessionStorage.clear();
  
};


export {
  auth,
  db,
  storage,
  signInWithGoogle,
  logout,
};

