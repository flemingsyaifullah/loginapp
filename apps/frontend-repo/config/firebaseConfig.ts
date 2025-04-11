// frontend-repo/src/config/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyBHIwBiOex4YjVVDJJP3AGCUHWSiw1czrY",
    authDomain: "ebuddy-bd4a1.firebaseapp.com",
    projectId: "ebuddy-bd4a1",
    storageBucket: "ebuddy-bd4a1.firebasestorage.app",
    messagingSenderId: "546777133062",
    appId: "1:546777133062:web:7417d2aed082eef3b49387",
    measurementId: "G-EHX25HM4BC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export type { User }; 