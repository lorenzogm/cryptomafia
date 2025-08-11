// Game types for Cryptomafia deckbuilder

export type CardType = 'token' | 'comodin' | 'herramienta' | 'trampa' | 'evento';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export type Synergy = 'influencer' | 'trader' | 'dao' | 'memecoin' | 'defi' | 'nft' | 'mining';

export type RoundType = 'small_blind' | 'big_blind' | 'boss';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  cost: number; // $CRYMP cost to acquire
  basePoints: number; // $CW3 points generated
  description: string;
  synergies: Synergy[];
  effect?: string; // Special effect description
  passive?: boolean; // For comodines
}

export interface GameState {
  cw3Points: number; // Current $CW3 points
  crympMoney: number; // Current $CRYMP currency
  currentRound: RoundType;
  roundNumber: number;
  targetPoints: number; // Points needed to pass current round
  deck: Card[];
  hand: Card[];
  discardPile: Card[];
  playedCards: Card[];
  maxHandSize: number;
}

export interface ShopState {
  availableCards: Card[];
  refreshCost: number;
}

export type Archetype = 'influencer' | 'trader' | 'dao_scammer';

export interface ArchetypeData {
  name: string;
  description: string;
  startingDeck: string[]; // Card IDs
  startingCrymp: number;
  specialEffect: string;
}