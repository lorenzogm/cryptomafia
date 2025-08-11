import { useState } from 'react';
import type { Archetype } from './types/game';
import ArchetypeSelection from './components/ArchetypeSelection';
import GameBoard from './components/GameBoard';
import './App.css';

type GameState = 'menu' | 'playing' | 'game_over';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);

  const handleSelectArchetype = (archetype: Archetype) => {
    setSelectedArchetype(archetype);
    setGameState('playing');
  };

  const handleReturnToMenu = () => {
    setGameState('menu');
    setSelectedArchetype(null);
  };

  if (gameState === 'menu') {
    return <ArchetypeSelection onSelectArchetype={handleSelectArchetype} />;
  }

  if (gameState === 'playing' && selectedArchetype) {
    return (
      <GameBoard 
        selectedArchetype={selectedArchetype}
      />
    );
  }

  if (gameState === 'game_over') {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h1 style={{ fontSize: '48px', color: '#ffd700', marginBottom: '20px' }}>
          Game Over
        </h1>
        <p style={{ fontSize: '18px', marginBottom: '30px', opacity: 0.9 }}>
          Your crypto empire has fallen, but every failure is a learning opportunity!
        </p>
        <button
          onClick={handleReturnToMenu}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return null;
}

export default App;
