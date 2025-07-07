// @ts-nocheck
import React from 'react';
import Head from 'next/head';
import LoginForm from '@/components/auth/LoginForm';

const SignInPage = () => (
  <>
    <Head>
      <title>Sign In</title>
    </Head>
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm />
    </main>
  </>
);

export default SignInPage;