// actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserApi } from '../apis/userApi'; 
import { User } from '@shared/src/user';

export const fetchUserData = createAsyncThunk<User, void>(
  'user/fetchUserData',
  async () => {
    console.log('Calling real API from userApi.ts...');
    const response = await fetchUserApi();

    if (response.error || !response.data) {
      throw new Error(response.error || 'Unknown error while fetching user data');
    }

    console.log('API responded:', response.data);
    return response.data;
  }
);

