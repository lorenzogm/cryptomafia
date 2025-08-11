# Copilot Instructions for Cryptomafia

## Project Overview

**Cryptomafia** is a roguelike deckbuilder web game inspired by *Balatro* and *Slay the Spire*, set in a satirical crypto/Web3 universe. Players take the role of a crypto mafia boss, manipulating tokens, evading regulators, and gaming the market through strategic card play.

## Technology Stack

- **Frontend**: React (JavaScript/TypeScript)
- **Platform**: Web browser
- **Build System**: Modern JavaScript tooling (to be determined)
- **Styling**: CSS/styled-components (to be determined)

## Game Architecture

### Core Game Loop
```
Start → Initial Deck → Rounds (Blinds) → Shop → Deck Improvement → Bosses → Rewards/Meta-progression
```

### Key Game Elements

1. **Resources**:
   - `$CW3` (Crypto Web3 points): Main scoring currency to pass rounds
   - `$CRYMP`: Purchase currency for shop between rounds

2. **Card Types**:
   - **Tokens**: Playable cards that generate points (crypto assets)
   - **Jokers**: Passive cards that modify rules or enhance combos
   - **Tools**: Unique effects or deck management improvements
   - **Traps**: Risk/reward cards with negative or conditional effects
   - **Events**: Game state modifiers (regulation, crashes, hacks)

3. **Game Mechanics**:
   - Turn-based card play to accumulate $CW3
   - Strategic discarding to modify hands
   - Synergy combinations (e.g., Influencer + Memecoin)
   - Shop system for buying/removing cards between rounds
   - Multiple perk and tag choices after boss fights

## Code Organization Guidelines

### File Structure
```
src/
├── components/          # React components
│   ├── game/           # Game-specific components
│   ├── ui/             # Reusable UI components
│   └── shop/           # Shop interface components
├── game/               # Core game logic
│   ├── cards/          # Card definitions and logic
│   ├── engine/         # Game state management
│   ├── scoring/        # Scoring and combo calculations
│   └── synergies/      # Card synergy definitions
├── data/               # Game data and configurations
│   ├── cards.json      # Card definitions
│   ├── archetypes.json # Player archetypes
│   └── events.json     # Event definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `GameBoard`, `CardHand`)
- **Functions**: camelCase (e.g., `calculateScore`, `playCard`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_HAND_SIZE`, `INITIAL_CW3`)
- **Files**: kebab-case (e.g., `card-engine.ts`, `scoring-utils.ts`)

### Game Data Patterns

#### Card Definition Example
```typescript
interface Card {
  id: string;
  name: string;
  type: 'token' | 'joker' | 'tool' | 'trap' | 'event';
  basePoints?: number;
  cost?: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  synergies?: string[];
  effect?: string;
  description: string;
}
```

#### Synergy System
- Use string-based tags for synergies (e.g., "Influencer", "Memecoin", "DeFi")
- Synergies should be composable and stackable
- Each synergy effect should be clearly documented

## Development Priorities

### MVP Features (Phase 1)
1. Basic card playing interface
2. Simple scoring system ($CW3 accumulation)
3. Initial deck of 20-30 cards
4. Basic shop functionality
5. Core game loop (rounds and progression)

### Future Enhancements
- Multiple unlockable archetypes
- Daily/weekly challenges
- Offline leaderboards
- Persistent roguelite progression
- Random global events per run

## Coding Best Practices

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract complex logic into custom hooks
- Use TypeScript for type safety

### Game State Management
- Implement immutable state updates
- Use reducers for complex game state
- Separate UI state from game logic
- Ensure deterministic game behavior

### Performance Considerations
- Optimize card rendering for large decks
- Implement efficient synergy calculations
- Use React.memo for expensive components
- Consider virtualization for large lists

### Testing Strategy
- Unit tests for game logic functions
- Integration tests for card interactions
- Visual regression tests for UI components
- End-to-end tests for complete game flows

## Domain-Specific Context

### Crypto/Web3 Satire Theme
- Maintain satirical tone without being offensive
- Reference real crypto concepts but exaggerated
- Include humorous takes on DeFi, NFTs, and crypto culture
- Balance satire with engaging gameplay

### Card Balance Philosophy
- Synergies should feel powerful but not game-breaking
- Risk/reward mechanics should create meaningful decisions
- Progression should feel rewarding but challenging
- Multiple viable strategies should exist

### Player Archetypes
1. **Influencer**: Focus on social manipulation and memecoin pumping
2. **Trader**: Mathematical approach with technical analysis
3. **DAO Scammer**: Group manipulation and governance attacks

## Common Patterns

### Error Handling
```typescript
// Graceful degradation for game errors
try {
  const result = calculateSynergy(cards);
  return result;
} catch (error) {
  console.warn('Synergy calculation failed:', error);
  return fallbackValue;
}
```

### Event System
```typescript
// Use event-driven architecture for game actions
interface GameEvent {
  type: string;
  payload: any;
  timestamp: number;
}
```

### Immutable Updates
```typescript
// Always return new objects for state updates
const playCard = (gameState: GameState, card: Card): GameState => ({
  ...gameState,
  hand: gameState.hand.filter(c => c.id !== card.id),
  played: [...gameState.played, card],
  score: gameState.score + calculateCardValue(card, gameState)
});
```

## Questions to Ask When Contributing

1. Does this change maintain game balance?
2. Is the crypto satire appropriate and humorous?
3. Are synergies properly documented and testable?
4. Does this follow the established card type patterns?
5. Is the change consistent with the roguelike progression philosophy?
6. Have edge cases been considered for card interactions?

## Resources

- **Game Inspiration**: Balatro, Slay the Spire, Reigns
- **Art Style**: Retro/pixel art with crypto meme aesthetics
- **Sound Design**: Electronic/synthwave with crypto sound effects
- **Accessibility**: Ensure colorblind-friendly design and keyboard navigation

Remember: This is a satirical game that should be fun and engaging while poking fun at crypto culture. Focus on strategic depth and replay value over visual complexity.