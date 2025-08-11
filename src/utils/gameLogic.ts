import type { GameState, Card, Archetype } from '../types/game';
import { CARDS, ARCHETYPES } from '../data/cards';

// Round targets and rewards
const ROUND_TARGETS = {
  small_blind: 100,
  big_blind: 200,
  boss: 400
};

const ROUND_REWARDS = {
  small_blind: { crymp: 50, points: 0 },
  big_blind: { crymp: 100, points: 0 },
  boss: { crymp: 200, points: 0 }
};

export function createInitialGameState(archetype: Archetype): GameState {
  const archetypeData = ARCHETYPES[archetype];
  const deck = archetypeData.startingDeck.map(id => ({ ...CARDS[id] }));
  
  return {
    cw3Points: 0,
    crympMoney: archetypeData.startingCrymp,
    currentRound: 'small_blind',
    roundNumber: 1,
    targetPoints: ROUND_TARGETS.small_blind,
    deck: shuffleDeck([...deck]),
    hand: [],
    discardPile: [],
    playedCards: [],
    maxHandSize: 5
  };
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCards(gameState: GameState, count: number): GameState {
  const newState = { ...gameState };
  const cardsToAdd = Math.min(count, newState.deck.length);
  const availableSpace = newState.maxHandSize - newState.hand.length;
  const actualCardsToAdd = Math.min(cardsToAdd, availableSpace);
  
  if (actualCardsToAdd > 0) {
    const drawnCards = newState.deck.splice(0, actualCardsToAdd);
    newState.hand = [...newState.hand, ...drawnCards];
  }
  
  return newState;
}

export function playCard(gameState: GameState, cardId: string): GameState {
  const cardIndex = gameState.hand.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return gameState;
  
  const card = gameState.hand[cardIndex];
  const newState = { ...gameState };
  
  // Remove card from hand
  newState.hand = [...gameState.hand];
  newState.hand.splice(cardIndex, 1);
  
  // Add to played cards
  newState.playedCards = [...gameState.playedCards, card];
  
  // Calculate points
  const points = calculateCardPoints(card, newState);
  newState.cw3Points += points;
  
  // Apply special effects
  return applyCardEffect(newState, card);
}

export function calculateCardPoints(card: Card, gameState: GameState): number {
  let points = card.basePoints;
  
  // Apply synergy bonuses
  if (card.synergies.includes('influencer')) {
    const influencerCards = gameState.playedCards.filter(c => c.synergies.includes('influencer'));
    points += influencerCards.length * 5;
  }
  
  if (card.synergies.includes('memecoin')) {
    const memecoins = gameState.hand.filter(c => c.synergies.includes('memecoin'));
    if (memecoins.length > 1) {
      points *= 2; // Double points if hand contains another memecoin
    }
  }
  
  if (card.synergies.includes('defi')) {
    const defiCards = gameState.hand.filter(c => c.synergies.includes('defi'));
    points += defiCards.length * 10;
  }
  
  // Apply comodin effects
  const activeComodines = gameState.playedCards.filter(c => c.type === 'comodin');
  for (const comodin of activeComodines) {
    if (comodin.id === 'elon_simp' && card.synergies.includes('memecoin')) {
      points *= 2;
    }
    if (comodin.id === 'diamond_hands') {
      points += gameState.discardPile.length * 5;
    }
    if (comodin.id === 'pump_and_dump' && gameState.playedCards.length === 1) {
      points += 50;
    }
  }
  
  return Math.floor(points);
}

function applyCardEffect(gameState: GameState, card: Card): GameState {
  const newState = { ...gameState };
  
  switch (card.id) {
    case 'bored_apes_reborn':
      newState.crympMoney += 20;
      break;
    case 'metamask_wallet':
      // Draw an extra card
      return drawCards(newState, 1);
    case 'rugpull':
      if (newState.crympMoney > 50) {
        newState.crympMoney = 0;
      }
      break;
    case 'sec_investigation':
      // Discard random card from hand
      if (newState.hand.length > 0) {
        const randomIndex = Math.floor(Math.random() * newState.hand.length);
        const discardedCard = newState.hand.splice(randomIndex, 1)[0];
        newState.discardPile = [...newState.discardPile, discardedCard];
      }
      break;
    case 'bull_market':
      // This effect is applied during point calculation
      break;
    case 'solana_sol':
      // 10% chance to lose the card
      if (Math.random() < 0.1) {
        // Remove from played cards
        newState.playedCards = newState.playedCards.filter(c => c.id !== card.id);
        console.log('Solana network went down! Card lost.');
      }
      break;
  }
  
  return newState;
}

export function discardCard(gameState: GameState, cardId: string): GameState {
  const cardIndex = gameState.hand.findIndex(card => card.id === cardId);
  if (cardIndex === -1) return gameState;
  
  const newState = { ...gameState };
  const card = newState.hand.splice(cardIndex, 1)[0];
  newState.discardPile = [...gameState.discardPile, card];
  
  return newState;
}

export function endTurn(gameState: GameState): GameState {
  const newState = { ...gameState };
  
  // Move played cards to discard pile
  newState.discardPile = [...newState.discardPile, ...newState.playedCards];
  newState.playedCards = [];
  
  // Draw new hand
  return drawCards(newState, Math.min(newState.maxHandSize, newState.deck.length));
}

export function checkRoundComplete(gameState: GameState): boolean {
  return gameState.cw3Points >= gameState.targetPoints;
}

export function advanceRound(gameState: GameState): GameState {
  const newState = { ...gameState };
  
  // Give round rewards
  const rewards = ROUND_REWARDS[newState.currentRound];
  newState.crympMoney += rewards.crymp;
  
  // Reset points for next round
  newState.cw3Points = 0;
  
  // Advance round
  if (newState.currentRound === 'small_blind') {
    newState.currentRound = 'big_blind';
    newState.targetPoints = ROUND_TARGETS.big_blind;
  } else if (newState.currentRound === 'big_blind') {
    newState.currentRound = 'boss';
    newState.targetPoints = ROUND_TARGETS.boss;
  } else {
    // Boss defeated, advance to next set of rounds
    newState.currentRound = 'small_blind';
    newState.roundNumber += 1;
    newState.targetPoints = ROUND_TARGETS.small_blind + (newState.roundNumber - 1) * 50;
  }
  
  return newState;
}

export function resetDeckFromDiscard(gameState: GameState): GameState {
  if (gameState.deck.length === 0 && gameState.discardPile.length > 0) {
    const newState = { ...gameState };
    newState.deck = shuffleDeck([...newState.discardPile]);
    newState.discardPile = [];
    return newState;
  }
  return gameState;
}