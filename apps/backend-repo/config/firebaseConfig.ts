import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config(); // Load .env

if (!admin.apps.length) {
    let serviceAccountPath: string;

    if (process.env.NODE_ENV === 'development') {
        // Path for development
        serviceAccountPath = path.resolve(__dirname, 'firebaseServiceAccount.json');
    } else {
        // Path for emulator
        serviceAccountPath = path.resolve(__dirname, '../../../../config', 'firebaseServiceAccount.json'); // Path yang dikoreksi untuk emulator
    }

    const serviceAccount = require(serviceAccountPath) as ServiceAccount;

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = getFirestore(admin.app());

export { admin, db };