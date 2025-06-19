
import { auth, signIn, signOut } from '@/auth'; // ensure signOut works server-side or remove it
import Link from 'next/link';
import React from 'react';

import Image from 'next/image';

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between  items-center">
        <Link href="/">
          <Image src="/icon.png" alt="image" width={144} height={30} />
        </Link>

        <div className="flex items-center justify-between text-black  gap-4">
          {session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form action={async ()=>{
                "use server"
                await signOut()
            }}>
                <button type='submit'>
                    <span>Logout</span>
                </button>
              </form>

              <Link href={`/user/${session.user.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () =>{
                "use server";

                await signIn('github');
            }}>
                <button type= "submit">
                    Login
                </button>
             </form>               
          )}
        </div>
      </nav>
    </header>
  );
}
