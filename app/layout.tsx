import './globals.css';
import { Providers } from './providers';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Syra Website',
  description: 'Skool clone',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}