import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Cogniflow',
  description: 'Production-grade AI calling platform',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
