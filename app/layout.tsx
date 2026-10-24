import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RestaurantOS',
  description: 'Restaurant operations, CRM, billing, and hospitality dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
