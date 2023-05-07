// import Link from 'next/link'
import Header from './header'
import './styles/globals.css'
import { Inter } from 'next/font/google'
import Providers from './store/providers'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}> 
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
