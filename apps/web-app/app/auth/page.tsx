import React from 'react';
import Login from '../../components/auth/Login';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Login />
    </Suspense>
  );
}
