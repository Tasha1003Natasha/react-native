import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getStorage } from "firebase/storage";

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

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { auth, storage, db };
