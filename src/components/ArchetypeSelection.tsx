import React from 'react';
import type { Archetype } from '../types/game';
import { ARCHETYPES } from '../data/cards';
import './GameBoard.css';

interface ArchetypeSelectionProps {
  onSelectArchetype: (archetype: Archetype) => void;
}

export const ArchetypeSelection: React.FC<ArchetypeSelectionProps> = ({ 
  onSelectArchetype 
}) => {
  const archetypeEntries = Object.entries(ARCHETYPES) as [Archetype, typeof ARCHETYPES[Archetype]][];

  const getArchetypeIcon = (archetype: Archetype) => {
    switch (archetype) {
      case 'influencer': return '📱';
      case 'trader': return '📈';
      case 'dao_scammer': return '🎭';
      default: return '🃏';
    }
  };

  const getArchetypeColor = (archetype: Archetype) => {
    switch (archetype) {
      case 'influencer': return 'linear-gradient(135deg, #667eea, #764ba2)';
      case 'trader': return 'linear-gradient(135deg, #11998e, #38ef7d)';
      case 'dao_scammer': return 'linear-gradient(135deg, #f093fb, #f5576c)';
      default: return 'linear-gradient(135deg, #4facfe, #00f2fe)';
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="game-title">🃏 CRYPTOMAFIA</div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          color: '#ffd700', 
          marginBottom: '15px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          Elige Tu Arquetipo Criminal
        </h1>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9,
          maxWidth: '600px',
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          Cada arquetipo tiene cartas iniciales únicas y se especializa en diferentes estrategias. 
          ¡Elige sabiamente - tu camino hacia la dominación cripto depende de ello!
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {archetypeEntries.map(([key, archetype]) => (
          <div
            key={key}
            style={{
              background: getArchetypeColor(key),
              borderRadius: '15px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => onSelectArchetype(key)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ 
              fontSize: '60px', 
              textAlign: 'center', 
              marginBottom: '20px' 
            }}>
              {getArchetypeIcon(key)}
            </div>
            
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '15px',
              textAlign: 'center',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              {archetype.name}
            </h3>
            
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.4',
              marginBottom: '20px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              {archetype.description}
            </p>
            
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px'
            }}>
              <h4 style={{ 
                color: '#ffd700', 
                marginBottom: '8px',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Efecto Especial
              </h4>
              <p style={{ 
                fontSize: '13px', 
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                {archetype.specialEffect}
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)'
            }}>
              <span>CRYMP Inicial: ${archetype.startingCrymp}</span>
              <span>Tamaño del Mazo: {archetype.startingDeck.length} cartas</span>
            </div>
            
            <div style={{
              position: 'absolute',
              bottom: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Haz Clic para Seleccionar
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '50px',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: '50px auto 0'
      }}>
        <h3 style={{ color: '#ffd700', marginBottom: '15px' }}>🎯 Objetivo del Juego</h3>
        <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
          Construye tu imperio cripto jugando cartas estratégicamente para ganar <strong>puntos CW3</strong>. 
          Progresa a través de rondas (Blind Pequeño → Blind Grande → Jefe) alcanzando puntajes objetivo. 
          Usa <strong>moneda CRYMP</strong> para comprar nuevas cartas y mejorar tu mazo entre rondas. 
          ¡Domina las sinergias entre diferentes tipos de cartas para maximizar tus ganancias!
        </p>
      </div>
    </div>
  );
};

export default ArchetypeSelection;