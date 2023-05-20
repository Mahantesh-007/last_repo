
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhZD5660JFkLWa1jm61535X9gWnaWSMBM",
  authDomain: "upload-files-343ce.firebaseapp.com",
  projectId: "upload-files-343ce",
  storageBucket: "upload-files-343ce.appspot.com",
  messagingSenderId: "172831173108",
  appId: "1:172831173108:web:3d42fcc7fa959bbe8ab1a1"
};

const firebaseOptions = {
  apiKey: "AIzaSyAhZD5660JFkLWa1jm61535X9gWnaWSMBM",
  authDomain: "upload-files-343ce.firebaseapp.com",
  projectId: "upload-files-343ce",
  storageBucket: "upload-files-343ce.appspot.com",
  messagingSenderId: "172831173108",
  appId: "1:172831173108:web:3d42fcc7fa959bbe8ab1a1"
};


const app = initializeApp(firebaseConfig,firebaseOptions);
export const storage = getStorage(app);