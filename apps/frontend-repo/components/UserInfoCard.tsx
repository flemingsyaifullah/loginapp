'use client';

import React, { useEffect, useState } from 'react';
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { fetchUserData } from '@/store/actions';
import { clearUser } from '@/store/reducers';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

const UserInfoCard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        router.push('/login');
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleFetch = () => {
    dispatch(fetchUserData());
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      router.push('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  if (checkingAuth) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        User Information
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Get User Info'}
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Stack>

      {error && <Typography color="error">{error}</Typography>}

      {user && (
        <Box>
          <Typography>Name : {user.name}</Typography>
          <Typography>Email : {user.email}</Typography>
          <Typography>UID : {user.id}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default UserInfoCard;
