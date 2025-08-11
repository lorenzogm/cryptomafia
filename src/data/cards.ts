import type { Card, ArchetypeData } from '../types/game';

// Base cards - tokens representing crypto assets
export const CARDS: Record<string, Card> = {
  // Memecoin tokens
  'doge2': {
    id: 'doge2',
    name: 'DOGE2',
    type: 'token',
    rarity: 'common',
    cost: 10,
    basePoints: 30,
    description: 'The sequel nobody asked for but everyone bought',
    synergies: ['memecoin', 'influencer'],
    effect: '+5 points per Influencer card played this turn'
  },
  
  'shiba_inu_2': {
    id: 'shiba_inu_2',
    name: 'SHIBA INU 2.0',
    type: 'token',
    rarity: 'common',
    cost: 8,
    basePoints: 25,
    description: 'Now with extra woof',
    synergies: ['memecoin'],
  },

  'pepe_coin': {
    id: 'pepe_coin',
    name: 'PEPE',
    type: 'token',
    rarity: 'uncommon',
    cost: 15,
    basePoints: 40,
    description: 'Feels good man',
    synergies: ['memecoin', 'influencer'],
    effect: 'Double points if hand contains another memecoin'
  },

  // DeFi tokens
  'uni_v5': {
    id: 'uni_v5',
    name: 'UNI v5',
    type: 'token',
    rarity: 'rare',
    cost: 30,
    basePoints: 60,
    description: 'Decentralized exchange token with governance drama',
    synergies: ['defi', 'trader'],
    effect: '+10 points per DeFi card in hand'
  },

  'compound_classic': {
    id: 'compound_classic',
    name: 'COMP Classic',
    type: 'token',
    rarity: 'uncommon',
    cost: 20,
    basePoints: 45,
    description: 'Lending protocol that definitely won\'t get exploited',
    synergies: ['defi'],
  },

  // NFT tokens
  'bored_apes_reborn': {
    id: 'bored_apes_reborn',
    name: 'Bored Apes Reborn',
    type: 'token',
    rarity: 'rare',
    cost: 50,
    basePoints: 80,
    description: 'JPEGs with utility, trust me bro',
    synergies: ['nft', 'influencer'],
    effect: 'Gain 20 $CRYMP when played'
  },

  'crypto_punks_2': {
    id: 'crypto_punks_2',
    name: 'CryptoPunks 2.0',
    type: 'token',
    rarity: 'legendary',
    cost: 100,
    basePoints: 150,
    description: 'The original NFT collection, now with royalties',
    synergies: ['nft'],
    effect: 'Triple points if this is the only card played this turn'
  },

  // Mining tokens
  'bitcoin_cash_sv': {
    id: 'bitcoin_cash_sv',
    name: 'Bitcoin Cash SV',
    type: 'token',
    rarity: 'common',
    cost: 12,
    basePoints: 35,
    description: 'The real Bitcoin, according to Craig Wright',
    synergies: ['mining'],
  },

  'ethereum_classic': {
    id: 'ethereum_classic',
    name: 'Ethereum Classic',
    type: 'token',
    rarity: 'uncommon',
    cost: 18,
    basePoints: 40,
    description: 'Code is law, until it isn\'t',
    synergies: ['mining', 'dao'],
  },

  // Comodines (passive effects)
  'elon_simp': {
    id: 'elon_simp',
    name: 'Elon Simp',
    type: 'comodin',
    rarity: 'rare',
    cost: 25,
    basePoints: 0,
    description: 'Worships every tweet from daddy Elon',
    synergies: ['influencer'],
    effect: 'Double the effect of any memecoin',
    passive: true
  },

  'diamond_hands': {
    id: 'diamond_hands',
    name: 'Diamond Hands 💎🙌',
    type: 'comodin',
    rarity: 'uncommon',
    cost: 20,
    basePoints: 0,
    description: 'HODL to the moon!',
    synergies: ['trader'],
    effect: '+5 points per card in discard pile',
    passive: true
  },

  'pump_and_dump': {
    id: 'pump_and_dump',
    name: 'Pump & Dump Scheme',
    type: 'comodin',
    rarity: 'rare',
    cost: 35,
    basePoints: 0,
    description: 'Classic market manipulation',
    synergies: ['trader', 'dao'],
    effect: 'First card played each turn gets +50 points',
    passive: true
  },

  // Herramientas (tools/utilities)
  'metamask_wallet': {
    id: 'metamask_wallet',
    name: 'MetaMask Wallet',
    type: 'herramienta',
    rarity: 'common',
    cost: 15,
    basePoints: 10,
    description: 'Your gateway to getting rekt',
    synergies: ['defi'],
    effect: 'Draw an extra card'
  },

  'ledger_nano': {
    id: 'ledger_nano',
    name: 'Ledger Nano',
    type: 'herramienta',
    rarity: 'uncommon',
    cost: 25,
    basePoints: 20,
    description: 'Cold storage for your cold heart',
    synergies: [],
    effect: 'Protect one card from Trampa effects'
  },

  'coingecko_premium': {
    id: 'coingecko_premium',
    name: 'CoinGecko Premium',
    type: 'herramienta',
    rarity: 'uncommon',
    cost: 20,
    basePoints: 15,
    description: 'See your portfolio crash in real-time',
    synergies: ['trader'],
    effect: 'View top 3 cards of deck'
  },

  // Trampas (risk cards)
  'rugpull': {
    id: 'rugpull',
    name: 'Rugpull',
    type: 'trampa',
    rarity: 'common',
    cost: 5,
    basePoints: 100,
    description: 'High risk, high reward... mostly risk',
    synergies: ['dao'],
    effect: 'Lose all $CRYMP if you have more than 50'
  },

  'sec_investigation': {
    id: 'sec_investigation',
    name: 'SEC Investigation',
    type: 'trampa',
    rarity: 'uncommon',
    cost: 0,
    basePoints: 0,
    description: 'The government wants to have a word',
    synergies: [],
    effect: 'Discard random card from hand'
  },

  // Eventos (events that affect game state)
  'bull_market': {
    id: 'bull_market',
    name: 'Bull Market',
    type: 'evento',
    rarity: 'rare',
    cost: 30,
    basePoints: 0,
    description: 'Everything is going up!',
    synergies: [],
    effect: 'All cards give +20 points this turn'
  },

  'crypto_winter': {
    id: 'crypto_winter',
    name: 'Crypto Winter',
    type: 'evento',
    rarity: 'uncommon',
    cost: 10,
    basePoints: 50,
    description: 'The bears are coming',
    synergies: [],
    effect: 'All players lose 10 $CRYMP'
  },

  'twitter_hack': {
    id: 'twitter_hack',
    name: 'Twitter Hack',
    type: 'evento',
    rarity: 'rare',
    cost: 25,
    basePoints: 75,
    description: 'Send Bitcoin to this address...',
    synergies: ['influencer'],
    effect: 'All Influencer cards give double points this turn'
  },

  // Basic starter cards
  'bitcoin_btc': {
    id: 'bitcoin_btc',
    name: 'Bitcoin (BTC)',
    type: 'token',
    rarity: 'common',
    cost: 5,
    basePoints: 20,
    description: 'The original cryptocurrency',
    synergies: ['mining'],
  },

  'ethereum_eth': {
    id: 'ethereum_eth',
    name: 'Ethereum (ETH)',
    type: 'token',
    rarity: 'common',
    cost: 8,
    basePoints: 25,
    description: 'World computer that costs $50 per transaction',
    synergies: ['defi', 'nft'],
  },

  'binance_bnb': {
    id: 'binance_bnb',
    name: 'Binance Coin (BNB)',
    type: 'token',
    rarity: 'common',
    cost: 6,
    basePoints: 22,
    description: 'Centralized finance masquerading as DeFi',
    synergies: ['trader'],
  },

  'cardano_ada': {
    id: 'cardano_ada',
    name: 'Cardano (ADA)',
    type: 'token',
    rarity: 'common',
    cost: 4,
    basePoints: 18,
    description: 'Peer-reviewed vaporware',
    synergies: ['dao'],
  },

  'solana_sol': {
    id: 'solana_sol',
    name: 'Solana (SOL)',
    type: 'token',
    rarity: 'uncommon',
    cost: 12,
    basePoints: 35,
    description: 'Fast and cheap, when it\'s not down',
    synergies: ['defi', 'nft'],
    effect: 'Network goes down: lose this card (10% chance)'
  }
};

// Archetype definitions
export const ARCHETYPES: Record<string, ArchetypeData> = {
  influencer: {
    name: 'Crypto Influencer',
    description: 'Pump coins with your massive Twitter following',
    startingDeck: [
      'doge2', 'pepe_coin', 'bitcoin_btc', 'ethereum_eth', 'shiba_inu_2',
      'elon_simp', 'twitter_hack', 'metamask_wallet', 'coingecko_premium',
      'bored_apes_reborn'
    ],
    startingCrymp: 100,
    specialEffect: 'Memecoin and Influencer cards give +10 bonus points'
  },

  trader: {
    name: 'DeFi Trader',
    description: 'Manipulate markets like a pro',
    startingDeck: [
      'uni_v5', 'compound_classic', 'bitcoin_btc', 'ethereum_eth', 'binance_bnb',
      'diamond_hands', 'pump_and_dump', 'metamask_wallet', 'ledger_nano',
      'coingecko_premium'
    ],
    startingCrymp: 150,
    specialEffect: 'DeFi and Trader cards give +15 bonus points'
  },

  dao_scammer: {
    name: 'DAO Scammer',
    description: 'Create elaborate schemes to separate fools from their money',
    startingDeck: [
      'ethereum_classic', 'cardano_ada', 'rugpull', 'sec_investigation', 'bitcoin_btc',
      'pump_and_dump', 'crypto_winter', 'metamask_wallet', 'compound_classic',
      'ethereum_eth'
    ],
    startingCrymp: 80,
    specialEffect: 'DAO cards give +20 bonus points, Trampa cards cost 50% less'
  }
};