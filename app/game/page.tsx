'use client';

import { useEffect, useRef, useState } from 'react';

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas setup
    let W = canvas.clientWidth;
    let H = canvas.clientHeight;

    const fit = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      const d = Math.min(window.devicePixelRatio, 2);
      canvas.width = W * d;
      canvas.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };

    window.addEventListener('resize', fit);
    fit();

    // Game state
    const keys: Record<string, boolean> = {};
    const stars: any[] = [];
    const shots: any[] = [];
    const foes: any[] = [];
    const bits: any[] = [];
    const ups: any[] = [];

    let points = 0;
    let life = 3;
    let level = 1;
    let kills = 0;
    let spawn = 0;
    let boss = false;
    let paused = false;
    let prev = 0;
    let on = false;

    let ship: any = null;
    let actx: any = null;

    // Initialize stars
    for (let i = 0; i < 135; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z: Math.random() * 0.5 + 0.5,
      });
    }

    const beep = (f = 300, d = 0.06, t = 'sine', v = 0.03) => {
      try {
        actx ??= new (window as any).AudioContext();
        const o = actx.createOscillator();
        const g = actx.createGain();
        o.type = t;
        o.frequency.value = f;
        g.gain.setValueAtTime(v, actx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, actx.currentTime + d);
        o.connect(g);
        g.connect(actx.destination);
        o.start(actx.currentTime);
        o.stop(actx.currentTime + d);
      } catch (e) {}
    };

    const hud = () => {
      setScore(points);
      setHighScore(Math.max(points, +localStorage.getItem('novaStrike') || 0));
      setLives(life || 0);
      setLevel(level);
    };

    const reset = () => {
      points = 0;
      life = 3;
      level = 1;
      kills = spawn = 0;
      boss = false;
      shots.length = foes.length = bits.length = ups.length = 0;
      ship = { x: W / 2, y: H - 85, r: 17, cd: 0, inv: 1.3, pow: 0, rapid: 0 };
      hud();
    };

    const fire = () => {
      if (ship && ship.cd <= 0) {
        beep(700, 0.05, 'square', 0.02);
        shots.push({
          x: ship.x,
          y: ship.y - 20,
          v: 300,
        });
        ship.cd = ship.rapid > 0 ? 0.1 : 0.2;
      }
    };

    const make = () => {
      const type = Math.random() < 0.17 ? 'tank' : Math.random() < 0.45 ? 'zig' : 'scout';
      const r = type === 'tank' ? 29 : 18;
      foes.push({
        type,
        x: r + Math.random() * (W - r * 2),
        y: -r,
        r,
        h: type === 'tank' ? 6 : 1,
        max: type === 'tank' ? 6 : 1,
        t: 0,
      });
    };

    const poly = (X: number, Y: number, r: number, n: number, a = 0) => {
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const z = a + (i * Math.PI * 2) / n;
        ctx[i ? 'lineTo' : 'moveTo'](X + Math.cos(z) * r, Y + Math.sin(z) * r);
      }
      ctx.closePath();
    };

    const update = (d: number) => {
      for (const s of stars) {
        s.y += s.z * 55 * d;
        if (s.y > H) {
          s.y = 0;
          s.x = Math.random() * W;
        }
      }

      if (!ship) return;

      ship.cd -= d;
      ship.inv -= d;
      ship.pow -= d;
      ship.rapid -= d;

      const mx = (keys['arrowright'] || keys['d'] ? 1 : 0) - (keys['arrowleft'] || keys['a'] ? 1 : 0);
      const my = (keys['arrowdown'] || keys['s'] ? 1 : 0) - (keys['arrowup'] || keys['w'] ? 1 : 0);

      ship.x += mx * 200 * d;
      ship.y += my * 200 * d;

      ship.x = Math.max(ship.r, Math.min(W - ship.r, ship.x));
      ship.y = Math.max(ship.r, Math.min(H - ship.r, ship.y));

      if (keys[' ']) fire();

      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i];
        s.y -= s.v * d;
        if (s.y < 0) shots.splice(i, 1);
      }

      spawn -= d;
      if (spawn < 0) {
        make();
        spawn = Math.max(0.5, 2 - level * 0.2);
      }

      for (let i = foes.length - 1; i >= 0; i--) {
        const e = foes[i];
        e.y += 80 * d;
        e.t += d;

        if (e.type === 'zig') e.x += Math.sin(e.t * 4) * 100 * d;

        for (let j = shots.length - 1; j >= 0; j--) {
          const s = shots[j];
          const dx = e.x - s.x;
          const dy = e.y - s.y;
          if (Math.sqrt(dx * dx + dy * dy) < e.r + 3) {
            e.h--;
            beep(170, 0.03, 'square', 0.02);
            shots.splice(j, 1);
            if (e.h <= 0) {
              points += e.type === 'tank' ? 120 : 60;
              kills++;
              foes.splice(i, 1);
              beep(400, 0.1, 'sine', 0.05);
            }
            break;
          }
        }

        if (e.y > H) foes.splice(i, 1);

        if (ship && ship.inv <= 0) {
          const dx = e.x - ship.x;
          const dy = e.y - ship.y;
          if (Math.sqrt(dx * dx + dy * dy) < e.r + ship.r) {
            life--;
            ship.inv = 2;
            beep(100, 0.2, 'sine', 0.1);
            if (life <= 0) {
              on = false;
              setGameRunning(false);
              localStorage.setItem('novaStrike', Math.max(points, +localStorage.getItem('novaStrike') || 0).toString());
            }
          }
        }
      }

      if (kills >= 10 * level && !boss) {
        boss = true;
        level++;
        beep(800, 0.5, 'sine', 0.1);
      }

      hud();
    };

    const draw = () => {
      ctx.fillStyle = '#02040d';
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = 'white';
      for (const s of stars) {
        ctx.globalAlpha = s.z;
        ctx.fillRect(s.x, s.y, 2, 2);
      }
      ctx.globalAlpha = 1;

      if (ship) {
        ctx.fillStyle = ship.inv > 0 ? '#ff4ecb' : '#5df6ff';
        poly(ship.x, ship.y, ship.r, 3, Math.PI / 2);
        ctx.fill();
      }

      ctx.fillStyle = '#5df6ff';
      for (const s of shots) {
        ctx.fillRect(s.x - 1, s.y - 8, 2, 8);
      }

      for (const e of foes) {
        ctx.fillStyle = e.type === 'tank' ? '#ff6b9d' : '#5df6ff';
        if (e.type === 'tank') {
          poly(e.x, e.y, e.r, 6);
        } else {
          poly(e.x, e.y, e.r, 4);
        }
        ctx.fill();
      }
    };

    const loop = (t: number) => {
      if (!on) return;
      const d = Math.min(0.04, (t - prev) / 1000 || 0);
      prev = t;
      if (!paused) update(d);
      draw();
      requestAnimationFrame(loop);
    };

    const play = () => {
      reset();
      on = true;
      setGameRunning(true);
      requestAnimationFrame(loop);
    };

    const toggle = () => {
      paused = !paused;
      if (paused) beep(200, 0.1);
    };

    // Event listeners
    window.addEventListener('keydown', (e) => {
      keys[e.key.toLowerCase()] = true;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
      if (e.key.toLowerCase() === 'p') toggle();
    });

    window.addEventListener('keyup', (e) => {
      keys[e.key.toLowerCase()] = false;
    });

    play();

    return () => {
      window.removeEventListener('resize', fit);
      on = false;
    };
  }, []);

  return (
    <div className="w-full h-screen bg-navy flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* HUD */}
        <div className="flex justify-between items-center px-4 py-2 bg-navy-light/50 border-b border-cyan/30">
          <div className="flex gap-8">
            <div>
              <div className="text-xs text-muted">SCORE</div>
              <div className="text-2xl font-bold text-cyan">{String(score).padStart(6, '0')}</div>
            </div>
            <div>
              <div className="text-xs text-muted">HIGH SCORE</div>
              <div className="text-2xl font-bold text-pink">{String(highScore).padStart(6, '0')}</div>
            </div>
            <div>
              <div className="text-xs text-muted">LEVEL</div>
              <div className="text-2xl font-bold text-cyan">{level}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted">LIVES</div>
            <div className="text-2xl font-bold text-pink">
              {lives > 0 ? '◆ '.repeat(lives) : '—'}
            </div>
          </div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full aspect-video bg-navy"
          style={{ display: 'block' }}
        />

        {/* Controls Info */}
        <div className="px-4 py-4 bg-navy-light/50 border-t border-cyan/30 text-center text-sm text-muted">
          <p>Arrow Keys or WASD to Move | Space to Shoot | P to Pause</p>
          <p className="mt-2 text-xs">
            <a href="/" className="text-cyan hover:text-pink">← Back to Home</a>
          </p>
        </div>
      </div>
    </div>
  );
}
