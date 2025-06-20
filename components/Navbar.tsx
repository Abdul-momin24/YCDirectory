import { auth, signIn, signOut } from '@/auth';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/Icon.png" alt="image" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-4 text-black">
          {session?.user ? (
            <>
              <div className="flex items-center gap-4">
                <Link href="/startup/create" className="flex items-center gap-1">
                  <span className="max-sm:hidden">Create</span>
                  <BadgePlus className="size-6 sm:hidden text-red-500" />
                </Link>

                <form
                  action={async () => {
                    'use server';
                    await signOut();
                  }}
                >
                  <button type="submit" className="flex items-center gap-1">
                    <span className="max-sm:hidden">Logout</span>
                    <LogOut className="size-6 sm:hidden text-red-500" />
                  </button>
                </form>
              </div>

              <Link href={`/user/${session?.user?._id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || 'User Avatar'}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
