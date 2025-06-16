import React from 'react';
import Navbar from '@/components/Navbar';
import workSans from '../fonts';
import "../globals.css";


export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    
      <main className={workSans.variable}>
        <Navbar />
        {children}
      </main>
     
  );
}
