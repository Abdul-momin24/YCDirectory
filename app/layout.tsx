import type { Metadata } from 'next'
import './globals.css'
import workSans from './fonts'
import "easymde/dist/easymde.min.css"
import { Toaster } from '@/components/ui/toaster'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'YC Directory',
  description: 'Pitch, vote and Grow',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
