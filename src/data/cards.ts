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
    description: 'La secuela que nadie pidió pero todos compraron',
    synergies: ['memecoin', 'influencer'],
    effect: '+5 puntos por carta Influencer jugada este turno'
  },
  
  'shiba_inu_2': {
    id: 'shiba_inu_2',
    name: 'SHIBA INU 2.0',
    type: 'token',
    rarity: 'common',
    cost: 8,
    basePoints: 25,
    description: 'Ahora con ladrido extra',
    synergies: ['memecoin'],
  },

  'pepe_coin': {
    id: 'pepe_coin',
    name: 'PEPE',
    type: 'token',
    rarity: 'uncommon',
    cost: 15,
    basePoints: 40,
    description: 'Se siente bien hermano',
    synergies: ['memecoin', 'influencer'],
    effect: 'Puntos dobles si la mano contiene otra memecoin'
  },

  // DeFi tokens
  'uni_v5': {
    id: 'uni_v5',
    name: 'UNI v5',
    type: 'token',
    rarity: 'rare',
    cost: 30,
    basePoints: 60,
    description: 'Token de intercambio descentralizado con drama de gobernanza',
    synergies: ['defi', 'trader'],
    effect: '+10 puntos por carta DeFi en la mano'
  },

  'compound_classic': {
    id: 'compound_classic',
    name: 'COMP Clásico',
    type: 'token',
    rarity: 'uncommon',
    cost: 20,
    basePoints: 45,
    description: 'Protocolo de préstamos que definitivamente no será explotado',
    synergies: ['defi'],
  },

  // NFT tokens
  'bored_apes_reborn': {
    id: 'bored_apes_reborn',
    name: 'Simios Aburridos Renacidos',
    type: 'token',
    rarity: 'rare',
    cost: 50,
    basePoints: 80,
    description: 'JPEGs con utilidad, confía en mí hermano',
    synergies: ['nft', 'influencer'],
    effect: 'Gana 20 $CRYMP cuando se juega'
  },

  'crypto_punks_2': {
    id: 'crypto_punks_2',
    name: 'CriptoPunks 2.0',
    type: 'token',
    rarity: 'legendary',
    cost: 100,
    basePoints: 150,
    description: 'La colección NFT original, ahora con regalías',
    synergies: ['nft'],
    effect: 'Puntos triples si esta es la única carta jugada este turno'
  },

  // Mining tokens
  'bitcoin_cash_sv': {
    id: 'bitcoin_cash_sv',
    name: 'Bitcoin Cash SV',
    type: 'token',
    rarity: 'common',
    cost: 12,
    basePoints: 35,
    description: 'El verdadero Bitcoin, según Craig Wright',
    synergies: ['mining'],
  },

  'ethereum_classic': {
    id: 'ethereum_classic',
    name: 'Ethereum Clásico',
    type: 'token',
    rarity: 'uncommon',
    cost: 18,
    basePoints: 40,
    description: 'El código es ley, hasta que no lo es',
    synergies: ['mining', 'dao'],
  },

  // Comodines (passive effects)
  'elon_simp': {
    id: 'elon_simp',
    name: 'Simp de Elon',
    type: 'comodin',
    rarity: 'rare',
    cost: 25,
    basePoints: 0,
    description: 'Adora cada tweet de papá Elon',
    synergies: ['influencer'],
    effect: 'Duplica el efecto de cualquier memecoin',
    passive: true
  },

  'diamond_hands': {
    id: 'diamond_hands',
    name: 'Manos de Diamante 💎🙌',
    type: 'comodin',
    rarity: 'uncommon',
    cost: 20,
    basePoints: 0,
    description: '¡HODL hasta la luna!',
    synergies: ['trader'],
    effect: '+5 puntos por carta en el descarte',
    passive: true
  },

  'pump_and_dump': {
    id: 'pump_and_dump',
    name: 'Esquema Pump & Dump',
    type: 'comodin',
    rarity: 'rare',
    cost: 35,
    basePoints: 0,
    description: 'Manipulación clásica del mercado',
    synergies: ['trader', 'dao'],
    effect: 'La primera carta jugada cada turno obtiene +50 puntos',
    passive: true
  },

  // Herramientas (tools/utilities)
  'metamask_wallet': {
    id: 'metamask_wallet',
    name: 'Billetera MetaMask',
    type: 'herramienta',
    rarity: 'common',
    cost: 15,
    basePoints: 10,
    description: 'Tu portal para ser destrozado',
    synergies: ['defi'],
    effect: 'Roba una carta extra'
  },

  'ledger_nano': {
    id: 'ledger_nano',
    name: 'Ledger Nano',
    type: 'herramienta',
    rarity: 'uncommon',
    cost: 25,
    basePoints: 20,
    description: 'Almacenamiento frío para tu corazón frío',
    synergies: [],
    effect: 'Protege una carta de efectos de Trampa'
  },

  'coingecko_premium': {
    id: 'coingecko_premium',
    name: 'CoinGecko Premium',
    type: 'herramienta',
    rarity: 'uncommon',
    cost: 20,
    basePoints: 15,
    description: 'Ve tu portafolio colapsar en tiempo real',
    synergies: ['trader'],
    effect: 'Ver las 3 cartas superiores del mazo'
  },

  // Trampas (risk cards)
  'rugpull': {
    id: 'rugpull',
    name: 'Rugpull',
    type: 'trampa',
    rarity: 'common',
    cost: 5,
    basePoints: 100,
    description: 'Alto riesgo, alta recompensa... principalmente riesgo',
    synergies: ['dao'],
    effect: 'Pierde todo $CRYMP si tienes más de 50'
  },

  'sec_investigation': {
    id: 'sec_investigation',
    name: 'Investigación SEC',
    type: 'trampa',
    rarity: 'uncommon',
    cost: 0,
    basePoints: 0,
    description: 'El gobierno quiere hablar contigo',
    synergies: [],
    effect: 'Descarta carta aleatoria de la mano'
  },

  // Eventos (events that affect game state)
  'bull_market': {
    id: 'bull_market',
    name: 'Mercado Alcista',
    type: 'evento',
    rarity: 'rare',
    cost: 30,
    basePoints: 0,
    description: '¡Todo está subiendo!',
    synergies: [],
    effect: 'Todas las cartas dan +20 puntos este turno'
  },

  'crypto_winter': {
    id: 'crypto_winter',
    name: 'Invierno Cripto',
    type: 'evento',
    rarity: 'uncommon',
    cost: 10,
    basePoints: 50,
    description: 'Los osos están llegando',
    synergies: [],
    effect: 'Todos los jugadores pierden 10 $CRYMP'
  },

  'twitter_hack': {
    id: 'twitter_hack',
    name: 'Hackeo de Twitter',
    type: 'evento',
    rarity: 'rare',
    cost: 25,
    basePoints: 75,
    description: 'Envía Bitcoin a esta dirección...',
    synergies: ['influencer'],
    effect: 'Todas las cartas Influencer dan puntos dobles este turno'
  },

  // Basic starter cards
  'bitcoin_btc': {
    id: 'bitcoin_btc',
    name: 'Bitcoin (BTC)',
    type: 'token',
    rarity: 'common',
    cost: 5,
    basePoints: 20,
    description: 'La criptomoneda original',
    synergies: ['mining'],
  },

  'ethereum_eth': {
    id: 'ethereum_eth',
    name: 'Ethereum (ETH)',
    type: 'token',
    rarity: 'common',
    cost: 8,
    basePoints: 25,
    description: 'Computadora mundial que cuesta $50 por transacción',
    synergies: ['defi', 'nft'],
  },

  'binance_bnb': {
    id: 'binance_bnb',
    name: 'Binance Coin (BNB)',
    type: 'token',
    rarity: 'common',
    cost: 6,
    basePoints: 22,
    description: 'Finanzas centralizadas haciéndose pasar por DeFi',
    synergies: ['trader'],
  },

  'cardano_ada': {
    id: 'cardano_ada',
    name: 'Cardano (ADA)',
    type: 'token',
    rarity: 'common',
    cost: 4,
    basePoints: 18,
    description: 'Vaporware revisado por pares',
    synergies: ['dao'],
  },

  'solana_sol': {
    id: 'solana_sol',
    name: 'Solana (SOL)',
    type: 'token',
    rarity: 'uncommon',
    cost: 12,
    basePoints: 35,
    description: 'Rápido y barato, cuando no está caído',
    synergies: ['defi', 'nft'],
    effect: 'La red se cae: pierde esta carta (10% de probabilidad)'
  }
};

// Archetype definitions
export const ARCHETYPES: Record<string, ArchetypeData> = {
  influencer: {
    name: 'Influencer Cripto',
    description: 'Infla monedas con tu masivo seguimiento de Twitter',
    startingDeck: [
      'doge2', 'pepe_coin', 'bitcoin_btc', 'ethereum_eth', 'shiba_inu_2',
      'elon_simp', 'twitter_hack', 'metamask_wallet', 'coingecko_premium',
      'bored_apes_reborn'
    ],
    startingCrymp: 100,
    specialEffect: 'Las cartas Memecoin e Influencer dan +10 puntos bonus'
  },

  trader: {
    name: 'Trader DeFi',
    description: 'Manipula mercados como un profesional',
    startingDeck: [
      'uni_v5', 'compound_classic', 'bitcoin_btc', 'ethereum_eth', 'binance_bnb',
      'diamond_hands', 'pump_and_dump', 'metamask_wallet', 'ledger_nano',
      'coingecko_premium'
    ],
    startingCrymp: 150,
    specialEffect: 'Las cartas DeFi y Trader dan +15 puntos bonus'
  },

  dao_scammer: {
    name: 'Estafador DAO',
    description: 'Crea esquemas elaborados para separar a los tontos de su dinero',
    startingDeck: [
      'ethereum_classic', 'cardano_ada', 'rugpull', 'sec_investigation', 'bitcoin_btc',
      'pump_and_dump', 'crypto_winter', 'metamask_wallet', 'compound_classic',
      'ethereum_eth'
    ],
    startingCrymp: 80,
    specialEffect: 'Las cartas DAO dan +20 puntos bonus, las cartas Trampa cuestan 50% menos'
  }
};