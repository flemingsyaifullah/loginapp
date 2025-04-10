import admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';

//dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!admin.apps.length) {
  const serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH!);
  //const serviceAccountPath = path.resolve(__dirname, process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH!);
  const serviceAccount = require(serviceAccountPath) as ServiceAccount;

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = getFirestore(admin.app());

export { admin, db };
