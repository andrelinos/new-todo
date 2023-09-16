import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from './componentes/header/page';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo',
  description: 'Desenvolvido por Andrelino Silva',
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col bg-gray-700">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
