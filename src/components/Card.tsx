import React from 'react';
import type { Card as CardType } from '../types/game';
import './Card.css';

interface CardProps {
  card: CardType;
  onClick?: () => void;
  disabled?: boolean;
  showCost?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  card, 
  onClick, 
  disabled = false,
  showCost = false 
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`card ${card.type} rarity-${card.rarity} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="card-header">
        <div className="card-name">{card.name}</div>
        <div className="card-type">{card.type}</div>
      </div>
      
      <div className="card-content">
        <div className="card-description">{card.description}</div>
        
        {card.synergies.length > 0 && (
          <div className="card-synergies">
            {card.synergies.map((synergy, index) => (
              <span key={index} className="synergy-tag">
                {synergy}
              </span>
            ))}
          </div>
        )}
        
        {card.effect && (
          <div className="card-effect">
            {card.effect}
          </div>
        )}
      </div>
      
      <div className="card-footer">
        <div className="card-points">
          {card.basePoints > 0 ? `${card.basePoints} CW3` : 'Special'}
        </div>
        {showCost && (
          <div className="card-cost">
            ${card.cost} CRYMP
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;