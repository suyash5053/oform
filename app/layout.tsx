import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import {ThemeProvider} from "@/components/providers/ThemeProvider";
import {Toaster} from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/DesignerContext";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Oform App',
  description: 'OForm is a simple but powerful form builder for your website.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en">
          <body className={inter.className}>
            <DesignerContextProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >{children}
                    <Toaster />
                </ThemeProvider>
            </DesignerContextProvider>
          </body>
        </html>
      </ClerkProvider>
  )
}
