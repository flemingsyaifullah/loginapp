import { db } from '../config/firebaseConfig';
import { User } from '@shared/src/user';

const usersCollection = db.collection('USERS');

export const updateUser = async (user: User) => {
  await usersCollection.doc(user.id).set(user, { merge: true });
};

export const fetchUser = async (userId: string): Promise<User | null> => {
  const doc = await usersCollection.doc(userId).get();
  return doc.exists ? (doc.data() as User) : null;
};
