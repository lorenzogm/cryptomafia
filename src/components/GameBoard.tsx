import React, { useState, useEffect } from 'react';
import type { GameState, Card as CardType, Archetype } from '../types/game';
import { 
  createInitialGameState, 
  playCard, 
  discardCard, 
  endTurn, 
  drawCards,
  checkRoundComplete,
  advanceRound,
  resetDeckFromDiscard
} from '../utils/gameLogic';
import Card from './Card';
import Shop from './Shop';
import './GameBoard.css';

interface GameBoardProps {
  selectedArchetype: Archetype;
}

type GamePhase = 'playing' | 'shop' | 'game_over' | 'round_complete';

export const GameBoard: React.FC<GameBoardProps> = ({ 
  selectedArchetype
}) => {
  const [gameState, setGameState] = useState<GameState>(() => 
    createInitialGameState(selectedArchetype)
  );
  const [gamePhase, setGamePhase] = useState<GamePhase>('playing');
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'warning' | 'error'>('success');

  // Initialize hand
  useEffect(() => {
    setGameState(prevState => drawCards(prevState, prevState.maxHandSize));
  }, []);

  // Check for round completion
  useEffect(() => {
    if (checkRoundComplete(gameState) && gamePhase === 'playing') {
      setGamePhase('round_complete');
      setMessage(`¡Ronda completada! ¡Ganaste ${gameState.cw3Points} puntos CW3!`);
      setMessageType('success');
    }
  }, [gameState.cw3Points, gameState.targetPoints, gamePhase]);

  const showMessage = (text: string, type: 'success' | 'warning' | 'error' = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const handlePlayCard = (card: CardType) => {
    const newState = playCard(gameState, card.id);
    setGameState(newState);
    showMessage(`Jugaste ${card.name} por ${card.basePoints} CW3!`);
  };

  const handleDiscardCard = (card: CardType) => {
    const newState = discardCard(gameState, card.id);
    setGameState(newState);
    showMessage(`Descartaste ${card.name}`, 'warning');
  };

  const handleEndTurn = () => {
    let newState = endTurn(gameState);
    newState = resetDeckFromDiscard(newState);
    setGameState(newState);
    showMessage('Turno terminado. Nuevas cartas robadas.');
  };

  const handleAdvanceRound = () => {
    const newState = advanceRound(gameState);
    setGameState(newState);
    setGamePhase('shop');
    showMessage('¡Avanzando a la fase de tienda!');
  };

  const handleReturnToPlay = () => {
    setGamePhase('playing');
    // Draw cards if hand is empty
    if (gameState.hand.length === 0) {
      setGameState(prevState => drawCards(prevState, prevState.maxHandSize));
    }
  };

  const handleBuyCard = (card: CardType) => {
    if (gameState.crympMoney >= card.cost) {
      const newState = { ...gameState };
      newState.crympMoney -= card.cost;
      newState.deck.push({ ...card });
      setGameState(newState);
      showMessage(`Compraste ${card.name} por $${card.cost} CRYMP!`);
      return true;
    } else {
      showMessage(`¡No hay suficiente CRYMP! Necesitas $${card.cost}`, 'error');
      return false;
    }
  };

  const formatRoundName = (round: string) => {
    switch (round) {
      case 'small_blind': return 'Blind Pequeño';
      case 'big_blind': return 'Blind Grande';
      case 'boss': return 'Ronda Jefe';
      default: return round;
    }
  };

  const getRoundColor = (round: string) => {
    switch (round) {
      case 'small_blind': return '#4facfe';
      case 'big_blind': return '#f093fb';
      case 'boss': return '#ff6b6b';
      default: return '#ffffff';
    }
  };

  if (gamePhase === 'shop') {
    return (
      <Shop 
        gameState={gameState}
        onBuyCard={handleBuyCard}
        onReturnToPlay={handleReturnToPlay}
      />
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-title">🃏 CRYPTOMAFIA</div>
        
        <div className="game-stats">
          <div className="stat">
            <span className="stat-value cw3-points">{gameState.cw3Points}</span>
            <span className="stat-label">Puntos CW3</span>
          </div>
          
          <div className="stat">
            <span className="stat-value crymp-money">${gameState.crympMoney}</span>
            <span className="stat-label">CRYMP</span>
          </div>
          
          <div className="round-info">
            <div 
              className="round-type" 
              style={{ color: getRoundColor(gameState.currentRound) }}
            >
              {formatRoundName(gameState.currentRound)}
            </div>
            <div className="round-progress">
              Ronda {gameState.roundNumber} | Objetivo: {gameState.targetPoints} CW3
            </div>
          </div>
        </div>
      </div>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <div className="game-board">
        <div className="play-area">
          <div className="played-cards-area">
            <h3>Cartas Jugadas</h3>
            <div className={`played-cards ${gameState.playedCards.length === 0 ? 'empty' : ''}`}>
              {gameState.playedCards.map((card, index) => (
                <Card key={`${card.id}-${index}`} card={card} />
              ))}
            </div>
          </div>
        </div>

        <div className="hand-area">
          <div className="deck-info">
            <div className="deck-count">Mazo: {gameState.deck.length} cartas</div>
            <div className="deck-count">Descarte: {gameState.discardPile.length} cartas</div>
          </div>
          
          <h3>Tu Mano</h3>
          <div className="hand">
            {gameState.hand.map((card, index) => (
              <Card 
                key={`${card.id}-${index}`} 
                card={card} 
                onClick={() => handlePlayCard(card)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="game-controls">
        <button 
          className="btn btn-primary" 
          onClick={handleEndTurn}
          disabled={gameState.deck.length === 0 && gameState.discardPile.length === 0}
        >
          Terminar Turno
        </button>
        
        {gamePhase === 'round_complete' && (
          <button 
            className="btn btn-success" 
            onClick={handleAdvanceRound}
          >
            Avanzar Ronda
          </button>
        )}
        
        <button 
          className="btn btn-info" 
          onClick={() => setGamePhase('shop')}
        >
          Visitar Tienda
        </button>
        
        {gameState.hand.length > 0 && (
          <button 
            className="btn btn-warning" 
            onClick={() => {
              if (gameState.hand.length > 0) {
                handleDiscardCard(gameState.hand[0]);
              }
            }}
          >
            Descartar Carta
          </button>
        )}
      </div>
    </div>
  );
};

export default GameBoard;