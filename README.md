# 🚀 Nova Strike - Next.js Conversion

A modern, high-performance space shooter game built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features a playable arcade-style game, global leaderboards, and player search functionality.

## ✨ Features

### 🎮 Playable Game
- **Classic Arcade Gameplay**: Destroy enemy ships and survive as long as possible
- **Progressive Difficulty**: Enemies increase in frequency and challenge as you level up
- **Score System**: Earn points for destroying different enemy types
- **Lives System**: Start with 3 lives and try to achieve the highest score
- **Sound Effects**: Audio feedback for actions (with Web Audio API)
- **Pause Functionality**: Press P to pause/resume your game

### 🏆 Global Leaderboard
- **Real-time Rankings**: View top players worldwide
- **Player Statistics**: Score, level, play count, and region information
- **Filter Options**: All-time, weekly, and monthly leaderboards
- **Responsive Table**: Clean, accessible leaderboard display

### 🔍 Player Search
- **Search Functionality**: Find players by username, score, or level
- **Instant Results**: Mock database with realistic player data
- **Player Profiles**: View detailed player statistics

### 🎨 Modern UI/UX
- **Cyberpunk Aesthetic**: Cyan, pink, and dark navy color scheme
- **Starfield Background**: Animated starfield for immersion
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Smooth Animations**: Glowing text and floating effects
- **Tailwind CSS**: Utility-first styling framework

## 🛠️ Tech Stack

- **Frontend Framework**: [Next.js 14](https://nextjs.org/) - React with server-side rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Build Tool**: Next.js built-in bundler
- **Deployment Ready**: Optimized for Vercel and other Node.js hosts

## 📁 Project Structure

```
nova-strike/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page with hero section
│   ├── globals.css             # Global styles and animations
│   ├── game/
│   │   └── page.tsx            # Playable game page
│   ├── search/
│   │   └── page.tsx            # Player search page
│   └── leaderboard/
│       └── page.tsx            # Global leaderboard
├── public/                     # Static assets
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Dependencies
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anshkumar23062026/Nova-strike.git
   cd Nova-strike
   ```

2. **Switch to the conversion branch**
   ```bash
   git checkout nextjs-conversion
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - The app will automatically reload on file changes

## 🎮 How to Play

### Controls
- **← / A** - Move left
- **→ / D** - Move right
- **↑ / W** - Move up
- **↓ / S** - Move down
- **SPACE** - Shoot
- **P** - Pause/Resume

### Objectives
1. **Destroy Enemies**: Eliminate scout ships (cyan), zig-zappers (cyan), and tanks (pink)
2. **Survive**: Stay alive as long as possible
3. **Maximize Score**: Earn more points with longer streaks
4. **Level Up**: Clear enough enemies to advance levels
5. **Reach Leaderboard**: Compete with players worldwide

### Scoring
- **Scout**: 60 points
- **Tank**: 120 points
- **Survival Bonus**: Bonus multiplier for longer sessions

## 📝 Pages Overview

### Home Page (`/`)
- Hero section with game introduction
- Feature highlights
- How-to-play instructions
- Quick search bar
- Call-to-action buttons

### Game Page (`/game`)
- Full-screen canvas game
- Real-time HUD with score, level, and lives
- Game controls reference
- Auto-saves high score to localStorage

### Search Page (`/search`)
- Player search functionality
- Search by username, score, or level
- Display player statistics
- View player profiles

### Leaderboard Page (`/leaderboard`)
- Global ranking system
- All-time, weekly, and monthly filters
- Regional sorting
- Global statistics

## 🔧 Configuration Files

### `tsconfig.json`
TypeScript compiler configuration with strict mode enabled and path aliases.

### `next.config.js`
Next.js configuration with optimizations for performance and compatibility.

### `tailwind.config.js`
Tailwind CSS configuration with custom colors (cyan, pink, navy) and extended theme.

### `postcss.config.js`
PostCSS configuration for Tailwind CSS and autoprefixer integration.

## 📦 Dependencies

### Production
- `next`: ^14.0.0 - React framework
- `react`: ^18.0.0 - UI library
- `react-dom`: ^18.0.0 - DOM rendering

### Development
- `typescript`: ^5.0.0 - Type checking
- `tailwindcss`: ^3.0.0 - CSS framework
- `autoprefixer`: ^10.0.0 - CSS vendor prefixes
- `postcss`: ^8.0.0 - CSS transformation

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  cyan: '#5df6ff',
  pink: '#ff4ecb',
  navy: '#030713',
  'navy-light': '#0a0e1f',
  muted: '#9fb6d0',
}
```

### Game Difficulty
Modify `app/game/page.tsx` to adjust:
- Enemy spawn rate
- Movement speed
- Damage values
- Level progression

### Animations
Update `app/globals.css` to customize:
- Pulse glow animation timing
- Float animation speed
- Other visual effects

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin nextjs-conversion
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select `nextjs-conversion` branch
   - Deploy!

### Deploy to Other Platforms

The project is compatible with:
- **Netlify**: Configure `netlify.toml`
- **Railway**: Configure `railway.json`
- **AWS Amplify**: Configure deployment settings
- **Self-hosted**: Use `npm run build` and `npm start`

## 📊 Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts integration
- **Minification**: Automatic CSS and JavaScript minification
- **Lazy Loading**: Dynamic imports for optimal loading

## 🐛 Troubleshooting

### Game Not Rendering
- Check browser console for errors
- Ensure canvas is supported in your browser
- Try a different browser (Chrome recommended)

### High Score Not Saving
- Check if localStorage is enabled
- Clear browser cache and try again
- Check browser's storage quota

### Search Not Working
- Ensure you're searching with valid queries
- Try searching for exact usernames
- Check network tab for API calls

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Game design inspired by classic arcade shooters
- Built with modern web technologies
- UI/UX design with cyberpunk aesthetic
- Community-driven improvements welcome

## 📧 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/anshkumar23062026/Nova-strike/issues)
- **Email**: anshkumar23.06.2026@gmail.com
- **Twitter**: [@anshkumar23062026](https://twitter.com/anshkumar23062026)

## 🎯 Future Roadmap

- [ ] Multiplayer mode with real-time scoring
- [ ] User authentication and accounts
- [ ] Backend API for persistent leaderboards
- [ ] Mobile app version
- [ ] Power-ups and special abilities
- [ ] Boss battles
- [ ] Achievements and badges
- [ ] Sound settings and music tracks
- [ ] Difficulty settings
- [ ] Replay system

---

**Made with ❤️ by Ansh Kumar**

Built during the Next.js conversion phase - Transforming arcade gaming with modern web technologies.

🎮 **Play Nova Strike Now**: [https://nova-strike.vercel.app](https://nova-strike.vercel.app)
