import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nova Strike | Professional Space Shooter',
  description: 'Play Nova Strike, search player profiles, and compete on global leaderboards. A professional space shooter game with real-time multiplayer scoring.',
  keywords: 'space shooter, game, nova strike, arcade, leaderboard',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-navy text-white">
        <div className="stars fixed inset-0 -z-10" />
        {children}
      </body>
    </html>
  );
}
