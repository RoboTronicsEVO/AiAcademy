import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import ProfileButton from '@/components/auth/ProfileButton';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions as any) as any;
  if (!session) {
    redirect('/signin');
    return; // satisfy TypeScript
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white shadow p-6 rounded-md">
        <ProfileButton />
        <div className="mt-6 space-y-2">
          <p className="text-lg font-semibold">{session.user?.name}</p>
          <p className="text-gray-500">{session.user?.email}</p>
        </div>
        <p className="mt-6 text-sm text-gray-500">This is a protected page.</p>
      </div>
    </main>
  );
}