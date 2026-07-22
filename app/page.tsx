'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-navy via-navy-light to-navy relative overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-navy/80 backdrop-blur border-b border-cyan/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-cyan glow-text">NOVA</span>
            <span className="text-2xl font-bold text-pink">STRIKE</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="text-muted hover:text-cyan transition">Features</a>
            <a href="#leaderboard" className="text-muted hover:text-cyan transition">Leaderboard</a>
            <Link href="/search" className="text-muted hover:text-cyan transition">Search</Link>
            <Link href="/game" className="btn-primary text-sm">PLAY NOW</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 glow-text">
            NOVA STRIKE
          </h1>
          <p className="text-xl text-muted mb-8">
            Dominate the galaxy. Compete globally. Become a legend.
          </p>
          <div className="flex gap-4 justify-center mb-12">
            <Link href="/game" className="btn-primary">
              LAUNCH GAME
            </Link>
            <button className="btn-secondary">
              VIEW STATS
            </button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-navy-light/50 backdrop-blur border border-cyan/30 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-cyan">SEARCH PLAYERS</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search by username, score, or level..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 bg-navy border border-cyan/20 rounded text-white placeholder-muted focus:outline-none focus:border-cyan"
              />
              <Link
                href={`/search?q=${encodeURIComponent(search)}`}
                className="btn-primary"
              >
                SEARCH
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan">FEATURES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-navy-light/30 border border-pink/30 rounded-lg p-6 hover:border-pink/60 transition">
              <div className="text-3xl mb-4">🎮</div>
              <h3 className="text-xl font-bold mb-2 text-pink">ARCADE ACTION</h3>
              <p className="text-muted">Classic space shooter gameplay with modern graphics and smooth controls.</p>
            </div>
            <div className="bg-navy-light/30 border border-cyan/30 rounded-lg p-6 hover:border-cyan/60 transition">
              <div className="text-3xl mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2 text-cyan">GLOBAL LEADERBOARD</h3>
              <p className="text-muted">Compete with players worldwide and climb the rankings in real-time.</p>
            </div>
            <div className="bg-navy-light/30 border border-pink/30 rounded-lg p-6 hover:border-pink/60 transition">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2 text-pink">PLAYER PROFILES</h3>
              <p className="text-muted">Track your progress, view stats, and see what others are achieving.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section id="how" className="py-16 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-cyan">HOW TO PLAY</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy-light/30 border border-cyan/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan">CONTROLS</h3>
              <ul className="space-y-3 text-muted">
                <li>⬅️➡️ Arrow Keys - Move left/right</li>
                <li>⬆️ Up Arrow - Move up</li>
                <li>SPACE - Shoot</li>
                <li>P - Pause/Resume</li>
              </ul>
            </div>
            <div className="bg-navy-light/30 border border-pink/30 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-pink">OBJECTIVES</h3>
              <ul className="space-y-3 text-muted">
                <li>🎯 Destroy enemy ships</li>
                <li>⭐ Survive as long as possible</li>
                <li>📈 Rack up points and combos</li>
                <li>🏅 Reach the top of the leaderboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-cyan">Ready to become a legend?</h2>
          <p className="text-muted mb-8">Join thousands of players competing in Nova Strike today.</p>
          <Link href="/game" className="btn-primary text-lg">
            START PLAYING NOW
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy/80 border-t border-cyan/20 py-8 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-muted">
          <p>&copy; 2026 Nova Strike. All rights reserved. | Built with Next.js</p>
        </div>
      </footer>
    </main>
  );
}
