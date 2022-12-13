// import * as firebase from "firebase";
// import "firebase/auth";
/////////////////////////////////////////////
// import * as firebase from "firebase";
// import "firebase/auth";

// var firebaseConfig = {
//   apiKey: "AIzaSyDFauNPYaTGMGWKEvyHdTh8m_kfhKDiQuU",
//   authDomain: "rn-social-391ec.firebaseapp.com",
//   databaseURL: "https://rn-social-391ec.firebaseio.com",
//   projectId: "rn-social-391ec",
//   storageBucket: "rn-social-391ec.appspot.com",
//   messagingSenderId: "974670373504",
//   appId: "1:974670373504:web:fe01e1286f5ad11ff0fc65",
// };

// firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();

// export { auth };

// export default firebase.initializeApp(firebaseConfig);

/////////////////2-ий варіант/////////////////////////
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

const firebaseConfig = {
  apiKey: "AIzaSyALIOVVVL1NRNUWBckQR7_qPkCnOpszZd0",
  authDomain: "react-native-e07b3.firebaseapp.com",
  projectId: "react-native-e07b3",
  storageBucket: "react-native-e07b3.appspot.com",
  messagingSenderId: "483579147792",
  appId: "1:483579147792:web:a0d3a568a83611bd5d7c95",
  measurementId: "G-909BG8CWML",
};

const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// const db = getFirestore(app);
const auth = getAuth(app);

export { auth };
