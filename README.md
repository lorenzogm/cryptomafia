# Cryptomafia

A roguelike deckbuilder web game inspired by *Balatro* and *Slay the Spire*, set in a satirical crypto/Web3 universe. Players take the role of a crypto mafia boss, manipulating tokens, evading regulators, and gaming the market through strategic card play.

## Technology Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Platform**: Web browser

## Development

### Prerequisites

- Node.js 18 or higher
- npm

### Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Deployment

This project is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### GitHub Pages Setup

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. Triggers on pushes to the main branch
2. Builds the React application
3. Deploys to GitHub Pages

### Manual Deployment Setup

If setting up GitHub Pages for the first time:

1. Go to repository Settings → Pages
2. Set Source to "GitHub Actions"
3. The workflow will automatically deploy on the next push to main

### Local Production Build

To test the production build locally:

```bash
npm run build
npm run preview
```

The app will be available at [http://localhost:4173/cryptomafia/](http://localhost:4173/cryptomafia/)

## Game Architecture

### Core Game Loop
```
Start → Initial Deck → Rounds (Blinds) → Shop → Deck Improvement → Bosses → Rewards/Meta-progression
```

### Key Game Elements

- **Resources**: `$CW3` (scoring currency), `$CRYMP` (purchase currency)
- **Card Types**: Tokens, Jokers, Tools, Traps, Events
- **Mechanics**: Strategic card play, synergies, shop system

## Contributing

See [.github/copilot-instructions.md](.github/copilot-instructions.md) for detailed development guidelines and project architecture.
