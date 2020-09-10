import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  // apiKey: "yourapikey",
  // authDomain: "youtauthdomain",
  // databaseURL: "yourdatabaseurl",
  // projectId: "yourprojectid",
  // storageBucket: "yourstoragebucket",
  // messagingSenderId: "yourmessagingsenderid",
  // appId: "yourappid",
  // measurementId: "yourmeasurementid",
};

firebase.initializeApp(firebaseConfig);
