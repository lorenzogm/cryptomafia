import React, { useState, useEffect } from 'react';
import type { GameState, Card as CardType } from '../types/game';
import { CARDS } from '../data/cards';
import Card from './Card';
import './GameBoard.css';

interface ShopProps {
  gameState: GameState;
  onBuyCard: (card: CardType) => boolean;
  onReturnToPlay: () => void;
}

const SHOP_SIZE = 6;
const REFRESH_COST = 10;

export const Shop: React.FC<ShopProps> = ({ 
  gameState, 
  onBuyCard, 
  onReturnToPlay 
}) => {
  const [shopCards, setShopCards] = useState<CardType[]>([]);
  const [refreshCost, setRefreshCost] = useState(REFRESH_COST);

  const generateShopCards = () => {
    const allCards = Object.values(CARDS);
    const availableCards = allCards.filter(card => {
      // Don't include cards already in player's deck too frequently
      const playerCardIds = gameState.deck.map(c => c.id);
      const cardCount = playerCardIds.filter(id => id === card.id).length;
      return cardCount < 3; // Limit to 3 copies of any card
    });

    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, SHOP_SIZE);
  };

  useEffect(() => {
    setShopCards(generateShopCards());
  }, []);

  const handleRefreshShop = () => {
    if (gameState.crympMoney >= refreshCost) {
      setShopCards(generateShopCards());
      setRefreshCost(prev => prev + 5); // Increase cost each refresh
    }
  };

  const handleBuyCard = (card: CardType) => {
    const success = onBuyCard(card);
    if (success) {
      // Remove the bought card from shop
      setShopCards(prev => prev.filter(c => c.id !== card.id));
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-title">🛒 CRYPTO SHOP</div>
        
        <div className="game-stats">
          <div className="stat">
            <span className="stat-value crymp-money">${gameState.crympMoney}</span>
            <span className="stat-label">CRYMP Available</span>
          </div>
          
          <div className="stat">
            <span className="stat-value">{gameState.deck.length}</span>
            <span className="stat-label">Cards in Deck</span>
          </div>
        </div>
      </div>

      <div className="play-area">
        <h2 style={{ textAlign: 'center', color: '#ffd700', marginBottom: '30px' }}>
          Welcome to the Crypto Marketplace
        </h2>
        
        <p style={{ textAlign: 'center', marginBottom: '30px', opacity: 0.8 }}>
          Buy cards to improve your deck. Choose wisely - synergies are key to success!
        </p>

        <div className="hand" style={{ minHeight: '300px', justifyContent: 'center' }}>
          {shopCards.map((card, index) => (
            <Card 
              key={`shop-${card.id}-${index}`}
              card={card}
              onClick={() => handleBuyCard(card)}
              showCost={true}
              disabled={gameState.crympMoney < card.cost}
            />
          ))}
        </div>

        <div className="game-controls" style={{ marginTop: '30px' }}>
          <button 
            className="btn btn-warning"
            onClick={handleRefreshShop}
            disabled={gameState.crympMoney < refreshCost}
          >
            Refresh Shop (${refreshCost} CRYMP)
          </button>
          
          <button 
            className="btn btn-success"
            onClick={onReturnToPlay}
          >
            Return to Game
          </button>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          padding: '15px', 
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#ffd700', marginBottom: '10px' }}>💡 Pro Tips</h3>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>
            • Look for cards that synergize with your existing deck<br/>
            • Comodines provide powerful passive effects<br/>
            • Higher rarity cards have stronger effects but cost more<br/>
            • Balance your deck between points generation and special effects
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;