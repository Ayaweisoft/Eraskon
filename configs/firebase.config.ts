// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAs4asX5YyG0Lgmmv_QP2_iOvx0rcDvt6k",
  authDomain: "eraskon-5fdff.firebaseapp.com",
  projectId: "eraskon-5fdff",
  storageBucket: "eraskon-5fdff.appspot.com",
  messagingSenderId: "209976174946",
  appId: "1:209976174946:web:61fbe92a87143b3858a43b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export default storage;
