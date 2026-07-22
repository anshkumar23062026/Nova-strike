'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Player {
  id: string;
  username: string;
  score: number;
  level: number;
  plays: number;
  lastPlayed: string;
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock player data
  const mockPlayers: Player[] = [
    { id: '1', username: 'ShadowNinja', score: 125400, level: 18, plays: 342, lastPlayed: '2 hours ago' },
    { id: '2', username: 'CyberPulse', score: 98750, level: 15, plays: 289, lastPlayed: '30 mins ago' },
    { id: '3', username: 'NovaKing', score: 156200, level: 22, plays: 521, lastPlayed: '1 hour ago' },
    { id: '4', username: 'PhantomStrike', score: 87600, level: 14, plays: 198, lastPlayed: '5 hours ago' },
    { id: '5', username: 'CrimsonBlade', score: 112300, level: 17, plays: 267, lastPlayed: '12 hours ago' },
    { id: '6', username: 'VortexMaster', score: 143900, level: 20, plays: 445, lastPlayed: '45 mins ago' },
  ];

  useEffect(() => {
    if (searchParams.get('q')) {
      performSearch(searchParams.get('q') || '');
    }
  }, [searchParams]);

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Simulate API call delay
    setTimeout(() => {
      const filtered = mockPlayers.filter((player) =>
        player.username.toLowerCase().includes(query.toLowerCase()) ||
        player.score.toString().includes(query) ||
        player.level.toString().includes(query)
      );
      setResults(filtered);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(search);
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

      {/* Search Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-cyan">SEARCH PLAYERS</h1>

          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search by username, score, or level..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 bg-navy border border-cyan/20 rounded text-white placeholder-muted focus:outline-none focus:border-cyan transition"
              />
              <button type="submit" className="btn-primary">
                SEARCH
              </button>
            </div>
            <p className="text-muted text-sm">
              💡 Tip: Search by player name, score range, or level to find players
            </p>
          </form>

          {/* Results */}
          {hasSearched && (
            <div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block">
                    <div className="w-12 h-12 border-4 border-cyan border-t-pink rounded-full animate-spin"></div>
                  </div>
                  <p className="text-muted mt-4">Scanning galaxy for players...</p>
                </div>
              ) : results.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-pink">
                    Found {results.length} player{results.length !== 1 ? 's' : ''}
                  </h2>

                  <div className="space-y-4">
                    {results.map((player, index) => (
                      <div
                        key={player.id}
                        className="bg-navy-light/50 border border-cyan/30 rounded-lg p-6 hover:border-cyan/60 transition flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="text-2xl font-bold text-pink w-12 text-center">#{index + 1}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-cyan">{player.username}</h3>
                            <p className="text-muted text-sm">Last played: {player.lastPlayed}</p>
                          </div>
                        </div>

                        <div className="flex gap-8 items-center">
                          <div className="text-right">
                            <div className="text-xs text-muted">SCORE</div>
                            <div className="text-2xl font-bold text-cyan">{player.score.toLocaleString()}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted">LEVEL</div>
                            <div className="text-2xl font-bold text-pink">{player.level}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted">PLAYS</div>
                            <div className="text-2xl font-bold text-cyan">{player.plays}</div>
                          </div>
                          <button className="btn-primary text-sm">
                            VIEW PROFILE
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🔭</div>
                  <h3 className="text-2xl font-bold text-muted mb-2">No players found</h3>
                  <p className="text-muted">
                    Try searching for a different username, score, or level
                  </p>
                </div>
              )}
            </div>
          )}

          {!hasSearched && (
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center py-12 bg-navy-light/30 border border-cyan/30 rounded-lg">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-bold text-cyan mb-2">Top Players</h3>
                <p className="text-muted text-sm">Find the best players on the leaderboard</p>
              </div>
              <div className="text-center py-12 bg-navy-light/30 border border-pink/30 rounded-lg">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-pink mb-2">View Stats</h3>
                <p className="text-muted text-sm">Check player profiles and achievements</p>
              </div>
              <div className="text-center py-12 bg-navy-light/30 border border-cyan/30 rounded-lg">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-bold text-cyan mb-2">Community</h3>
                <p className="text-muted text-sm">Compete with thousands of players</p>
              </div>
            </div>
          )}
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
