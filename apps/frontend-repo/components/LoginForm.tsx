'use client';

import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useRouter } from 'next/navigation';
import { createOrUpdateUserApi, fetchUserApi } from '@/apis/userApi';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      const userCheckResult = await fetchUserApi();

      if (!userCheckResult.data) {
        const { error: apiError } = await createOrUpdateUserApi();
        if (apiError) {
          throw new Error(apiError);
        }
      } else if (userCheckResult.error) {
        console.error('Error fetching user data:', userCheckResult.error);
      } else {
        console.log('User data already exists in Firestore.');
      }

      router.push('/user-info');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
        console.error('Unexpected error:', error);
      }
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setError(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isRegistering ? 'Register' : 'Sign in'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {isRegistering ? 'Register' 
            : 'Sign In'}
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={toggleRegister}
            sx={{ mb: 2 }}
          >
            {isRegistering
              ? 'Already have an account? Sign In'
              : "Don't have an account? Register"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
