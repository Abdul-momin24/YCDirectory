import React from 'react';
import Navbar from '@/app/components/Navbar';
import workSans from '../fonts';
import "../globals.css";


export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
