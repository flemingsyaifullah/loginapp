// backend-repo/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import {admin} from '../config/firebaseConfig'; 

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let idToken: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  }

  console.log('Received Token:', idToken);

  if (!idToken) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return;
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    (req as any).user = decodedToken.uid; 
    console.log('Token Verified. UID:', (req as any).user);
    next(); 
  } catch (error: any) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};