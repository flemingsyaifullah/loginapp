'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/config/firebaseConfig';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace('/user-info'); 
      } else {
        router.replace('/login'); 
      }
    });

    return () => unsubscribe();
  }, [router]);

  return null; 
}
