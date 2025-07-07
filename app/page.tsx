import Link from 'next/link';
import ProfileButton from '@/components/auth/ProfileButton';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <h1 className="text-3xl font-bold">Welcome to Syra Website</h1>
      <div className="space-x-4">
        <Link href="/signin" className="text-indigo-600 underline">
          Sign In
        </Link>
        <Link href="/profile" className="text-indigo-600 underline">
          Profile
        </Link>
      </div>
      <ProfileButton />
    </main>
  );
}