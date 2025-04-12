import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApAtxOu-HJcY-89YlIKKg8RV7l2fclGAQ",
    authDomain: "loginapp-1bf76.firebaseapp.com",
    projectId: "loginapp-1bf76",
    storageBucket: "loginapp-1bf76.firebasestorage.app",
    messagingSenderId: "508342481247",
    appId: "1:508342481247:web:ad049dee60ea57bc7506ea",
    measurementId: "G-K7XSQFWK30"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export type { User };