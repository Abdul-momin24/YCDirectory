import type { Metadata } from 'next'
// import localFont from 'next/font/local'
import './globals.css'
import workSans from './fonts'


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
      </body>
    </html>
  )
}