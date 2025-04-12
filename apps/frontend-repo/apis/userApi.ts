// frontend-repo/apis/userApi.ts
import axios from 'axios';
import { getAuth, User as FirebaseUser } from 'firebase/auth';
import { User } from '@shared/src/user';
import firebaseConfig from '../config/apiUrlConfig';

const EXPRESS_URL = firebaseConfig.expressUrl;
const EMULATOR_URL = firebaseConfig.emulatorUrl;

let resolvedApiUrl: string | null = null;

const getSmartApiUrl = async (): Promise<string> => {
  if (resolvedApiUrl) return resolvedApiUrl;

  try {
    await axios.get(`${EMULATOR_URL}/health-check`);
    resolvedApiUrl = EMULATOR_URL;
  } catch {
    resolvedApiUrl = EXPRESS_URL;
  }

  return resolvedApiUrl;
};

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const fetchUserApi = async (): Promise<ApiResponse<User>> => {
  try {
    const auth = getAuth();
    const currentUser: FirebaseUser | null = auth.currentUser;

    if (!currentUser) {
      console.error('No authenticated user found.');
      return { error: 'No authenticated user found.' };
    }

    const idToken = await currentUser.getIdToken();
    const uid = currentUser.uid;
    const API_URL = await getSmartApiUrl();

    const response = await axios.get<User | null>( 
      `${API_URL}/fetch-user-data?id=${uid}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    if (response.data === null) {
      return { data: undefined };
    }

    return { data: response.data };
  } catch (error: unknown) {
    let errorMessage = 'Failed to fetch user data.';

    if (axios.isAxiosError(error) && error.response) {
      const serverError =
        error.response.data?.error || error.response.data?.message;

      if (serverError) {
        errorMessage = serverError;
      }

      console.log('API Error:', errorMessage, error.response.status);
      return { error: errorMessage };
    } else if (error instanceof Error) {
      console.log('Unexpected Error:', error.message);
      return { error: error.message };
    } else {
      console.log('Unknown error occurred while fetching user');
      return { error: 'Unknown error occurred.' };
    }
  }
};

export const createOrUpdateUserApi = async (): Promise<ApiResponse<User>> => {
  try {
    const auth = getAuth();
    const currentUser: FirebaseUser | null = auth.currentUser;

    if (!currentUser) {
      return { error: 'No authenticated user found.' };
    }

    const idToken = await currentUser.getIdToken();
    const API_URL = await getSmartApiUrl();

    const payload = {
      id: currentUser.uid,
      email: currentUser.email,
      name: currentUser.email?.split('@')[0] || 'Anonymous',
    };

    const response = await axios.post<User>(
      `${API_URL}/update-user-data`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    return { data: response.data };
  } catch (error: unknown) {
    let errorMessage = 'Failed to create/update user.';

    if (axios.isAxiosError(error) && error.response) {
      const serverError =
        error.response.data?.error || error.response.data?.message;

      if (serverError) {
        errorMessage = serverError;
      }

      console.log('API Error:', errorMessage, error.response.status);
      return { error: errorMessage };
    } else if (error instanceof Error) {
      console.log('Unexpected Error:', error.message);
      return { error: error.message };
    } else {
      console.log('Unknown error occurred while creating/updating user');
      return { error: 'Unknown error occurred.' };
    }
  }
};
