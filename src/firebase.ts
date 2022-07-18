// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBgKQmVVt4OBkIILBN_MFIjFvFRBNwMquU",
    authDomain: "chestrapp.firebaseapp.com",
    databaseURL: "https://chestrapp-default-rtdb.firebaseio.com",
    projectId: "chestrapp",
    storageBucket: "chestrapp.appspot.com",
    messagingSenderId: "496271595233",
    appId: "1:496271595233:web:759b298e1094bb9f6909a0",
    measurementId: "G-92WFN0LYB2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider('6Ld_Cv0gAAAAAIEHFIjceLdHnrWZG1Mk8mCUda6O'),
    isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
});
export const analytics = getAnalytics(app);
export const auth = getAuth(app);