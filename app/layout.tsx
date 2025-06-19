import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import './globals.css'
import workSans from './fonts'

import "easymde/dist/easymde.min.css"
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'YC Directory',
  description: 'Pitch, vote and Grow',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster/>
      </body>
    </html>
  )
}