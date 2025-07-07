// @ts-nocheck
import React from 'react';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ProfileButton from '@/components/auth/ProfileButton';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
  return { props: { session } };
};

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-md">
          <ProfileButton />
          {session?.user && (
            <div className="mt-6 space-y-2">
              <p className="text-lg font-semibold">{session.user.name}</p>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
          )}
          <p className="mt-6 text-sm text-gray-500">
            This is a protected page. Only authenticated users can see this content.
          </p>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;