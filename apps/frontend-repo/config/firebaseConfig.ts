import { initializeApp } from 'firebase/app';
import { getAuth, User } from 'firebase/auth';
import firebaseConfig from '@shared/config/firebase-account.json';

const app = initializeApp(firebaseConfig.firebaseAuthAccount);
export const auth = getAuth(app);
export type { User };