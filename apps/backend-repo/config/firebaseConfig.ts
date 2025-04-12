import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import privateKey from '../loginapp-private-key.json';

dotenv.config();

if (!admin.apps.length) {
    const backendFirebaseConfig = privateKey as ServiceAccount;
    admin.initializeApp({
        credential: admin.credential.cert(backendFirebaseConfig),
    });
}

const db = getFirestore(admin.app());

export { admin, db };