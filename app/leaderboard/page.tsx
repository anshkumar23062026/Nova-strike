'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  level: number;
  plays: number;
  region: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [filter, setFilter] = useState<'all' | 'weekly' | 'monthly'>('all');

  // Mock leaderboard data
  const mockData: LeaderboardEntry[] = [
    { rank: 1, username: 'NovaKing', score: 156200, level: 22, plays: 521, region: 'Global' },
    { rank: 2, username: 'VortexMaster', score: 143900, level: 20, plays: 445, region: 'Asia' },
    { rank: 3, username: 'ShadowNinja', score: 125400, level: 18, plays: 342, region: 'Europe' },
    { rank: 4, username: 'CrimsonBlade', score: 112300, level: 17, plays: 267, region: 'Americas' },
    { rank: 5, username: 'CyberPulse', score: 98750, level: 15, plays: 289, region: 'Asia' },
    { rank: 6, username: 'PhantomStrike', score: 87600, level: 14, plays: 198, region: 'Europe' },
    { rank: 7, username: 'NeonGhost', score: 76450, level: 13, plays: 156, region: 'Americas' },
    { rank: 8, username: 'SilentKiller', score: 65300, level: 12, plays: 142, region: 'Asia' },
    { rank: 9, username: 'IceBreaker', score: 54200, level: 11, plays: 128, region: 'Europe' },
    { rank: 10, username: 'ThunderStorm', score: 43100, level: 10, plays: 115, region: 'Global' },
  ];

  useEffect(() => {
    // Simulate API call
    setLeaderboard(mockData);
  }, [filter]);

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy via-navy-light to-navy">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-navy/80 backdrop-blur border-b border-cyan/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-cyan glow-text">NOVA</span>
            <span className="text-2xl font-bold text-pink">STRIKE</span>
          </Link>
          <Link href="/game" className="btn-primary text-sm">
            PLAY NOW
          </Link>
        </div>
      </nav>

      {/* Leaderboard Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center text-cyan">GLOBAL LEADERBOARD</h1>
          <p className="text-center text-muted mb-8">Top players competing in Nova Strike</p>

          {/* Filter Buttons */}
          <div className="flex gap-4 justify-center mb-8">
            {(['all', 'weekly', 'monthly'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded font-bold transition ${
                  filter === f
                    ? 'bg-cyan text-navy shadow-lg shadow-cyan/50'
                    : 'border border-cyan/30 text-cyan hover:border-cyan/60'
                }`}
              >
                {f === 'all' ? 'ALL TIME' : f === 'weekly' ? 'THIS WEEK' : 'THIS MONTH'}
              </button>
            ))}
          </div>

          {/* Leaderboard Table */}
          <div className="bg-navy-light/30 border border-cyan/30 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan/30 bg-navy/50">
                    <th className="px-6 py-4 text-left text-cyan font-bold">RANK</th>
                    <th className="px-6 py-4 text-left text-cyan font-bold">PLAYER</th>
                    <th className="px-6 py-4 text-right text-cyan font-bold">SCORE</th>
                    <th className="px-6 py-4 text-center text-cyan font-bold">LEVEL</th>
                    <th className="px-6 py-4 text-center text-cyan font-bold">PLAYS</th>
                    <th className="px-6 py-4 text-center text-cyan font-bold">REGION</th>
                    <th className="px-6 py-4 text-center text-cyan font-bold">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry.rank}
                      className={`border-b border-cyan/10 hover:bg-navy/50 transition ${
                        entry.rank <= 3 ? 'bg-navy/30' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getMedalEmoji(entry.rank) && (
                            <span className="text-2xl">{getMedalEmoji(entry.rank)}</span>
                          )}
                          <span className="font-bold text-pink text-lg">#{entry.rank}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan to-pink rounded-full flex items-center justify-center font-bold">
                            {entry.username.charAt(0)}
                          </div>
                          <span className="font-bold text-cyan">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-xl font-bold text-cyan">
                          {entry.score.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-pink/20 text-pink rounded font-bold">
                          {entry.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-muted">{entry.plays}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-3 py-1 bg-cyan/20 text-cyan rounded text-sm">
                          {entry.region}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="btn-primary text-sm">
                          VIEW
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 border border-cyan/30 text-cyan rounded hover:border-cyan/60 font-bold transition">
              LOAD MORE
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-cyan">LEADERBOARD STATS</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-navy-light/30 border border-cyan/30 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-cyan mb-2">1.2M+</div>
              <p className="text-muted">Total Players</p>
            </div>
            <div className="bg-navy-light/30 border border-pink/30 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-pink mb-2">500M+</div>
              <p className="text-muted">Total Score</p>
            </div>
            <div className="bg-navy-light/30 border border-cyan/30 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-cyan mb-2">50K+</div>
              <p className="text-muted">Games Today</p>
            </div>
            <div className="bg-navy-light/30 border border-pink/30 rounded-lg p-6 text-center">
              <div className="text-4xl font-bold text-pink mb-2">156</div>
              <p className="text-muted">Max Level</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy/80 border-t border-cyan/20 py-8 px-4 mt-16 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-muted">
          <p>&copy; 2026 Nova Strike. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
