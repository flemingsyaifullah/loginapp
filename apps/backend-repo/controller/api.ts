import { Request, Response } from 'express';
import { updateUser, fetchUser } from '../repository/userCollection';
import { User } from '@shared/src/user';

export const updateUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = req.body;
    await updateUser(user);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user data' });
  }
};

export const fetchUserData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.id as string;

    if (!userId) {
      res.status(400).json({ error: 'Missing user ID' });
      return;
    }

    const user = await fetchUser(userId);

    if (user === null) {
      res.status(200).json(null);
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
};
