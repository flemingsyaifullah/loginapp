'use client';

import React from 'react';
import LoginForm from '@/components/LoginForm'; 

const LoginPage = () => {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <LoginForm />
    </main>
  );
};

export default LoginPage;
