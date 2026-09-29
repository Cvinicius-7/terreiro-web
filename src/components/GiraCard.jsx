import { useState } from 'react';
import { Calendar, Clock, MapPin, ArrowRight, X, Info, HeartHandshake } from 'lucide-react';
import { Logo } from './Logo';

export function GiraCard({ gira, isHeroHighlight = false }) {
  const [showModal, setShowModal] = useState(false);

  const isCancelled = gira.status === 'cancelada';

  return (
    <>
      <div 
        className="gira-card-root"
        onClick={() => setShowModal(true)}
        style={{
          position: 'relative',
          borderRadius: '14px',
          overflow: 'hidden',
          backgroundColor: '#161616',
          boxShadow: isHeroHighlight 
            ? '0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(196, 145, 60, 0.3)' 
            : '0 8px 24px rgba(0, 0, 0, 0.28)',
          cursor: 'pointer',
          transition: 'all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: isHeroHighlight ? '520px' : '440px',
          border: isHeroHighlight ? '1px solid rgba(196, 145, 60, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = isHeroHighlight 
            ? '0 16px 36px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(196, 145, 60, 0.3)' 
            : '0 8px 24px rgba(0, 0, 0, 0.28)';
        }}
      >
        {/* Background Photo with authentic thematic overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${gira.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.72) contrast(1.15)',
            transform: 'scale(1.02)',
            transition: 'transform 0.6s ease'
          }}
        />

        {/* Gradiente dramático (estilo post do Instagram) */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,14,11,0.55) 0%, rgba(18,20,18,0.2) 35%, rgba(12,12,12,0.92) 85%, #0e0e0e 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Topo: Emblema TULA */}
        <div 
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '1.4rem 1.2rem 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))'
          }}
        >
          <Logo size={52} showText={false} variant="white" />
        </div>

        {/* Miolo: Títulos e Informações da Gira */}
        <div 
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '1.5rem 1.25rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          {/* Badge de Data com Ícone de Calendário (exatamente como no Instagram) */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.4rem 0.95rem',
              borderRadius: '999px',
              background: isCancelled ? 'rgba(180, 40, 40, 0.35)' : 'rgba(0, 0, 0, 0.55)',
              border: isCancelled ? '1px solid rgba(255, 100, 100, 0.4)' : '1px solid rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(8px)',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            <Calendar size={14} style={{ color: isCancelled ? '#ff9999' : 'var(--color-ocre)' }} />
            <span>{gira.dateBadge}</span>
          </div>

          {/* Subtítulo */}
          <span 
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
              marginTop: '0.2rem'
            }}
          >
            {gira.subtitle}
          </span>

          {/* Nome da Linha / Título em Serifa Refinada */}
          <h3 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: isHeroHighlight ? '2.1rem' : '1.7rem',
              lineHeight: 1.15,
              fontWeight: 600,
              color: isCancelled ? '#ff8a8a' : '#ffffff',
              margin: '0.1rem 0',
              textShadow: '0 2px 12px rgba(0,0,0,0.8)'
            }}
          >
            {gira.line}
          </h3>

          {/* Tipo de Gira / Status */}
          <span 
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isCancelled ? '#ffb3b3' : 'var(--color-ocre)',
              fontWeight: 700
            }}
          >
            {gira.type}
          </span>

          {/* Botão Pill Interativo com Seta (exatamente como nas fotos do Instagram) */}
          <div style={{ marginTop: '0.75rem' }}>
            <span 
              className="btn-pill"
              style={{
                borderColor: 'rgba(255, 255, 255, 0.4)',
                fontSize: '0.75rem',
                padding: '0.45rem 1.15rem'
              }}
            >
              Ver Orientações <ArrowRight size={13} style={{ marginLeft: '4px' }} />
            </span>
          </div>
        </div>

        {/* Rodapé do Card: Endereço oficial em Curitiba */}
        <div 
          style={{
            position: 'relative',
            zIndex: 2,
            padding: '0.9rem 1.2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            background: 'rgba(10, 10, 10, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            textAlign: 'center'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '0.72rem',
              letterSpacing: '0.04em'
            }}
          >
            <MapPin size={12} style={{ color: 'var(--color-ocre)', flexShrink: 0 }} />
            <span>{gira.location}</span>
          </div>
          <span 
            style={{
              fontSize: '0.65rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            + Informações e senhas no local
          </span>
        </div>
      </div>

      {/* Modal de Detalhes da Gira */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              backgroundColor: '#1b1b1b',
              color: '#f5f5f5',
              borderRadius: '16px',
              maxWidth: '520px',
              width: '100%',
              overflow: 'hidden',
              border: '1px solid rgba(196, 145, 60, 0.35)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.65)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Topo do modal com imagem */}
            <div 
              style={{
                height: '160px',
                position: 'relative',
                backgroundImage: `url(${gira.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), #1b1b1b)'
                }}
              />
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(0, 0, 0, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div style={{ padding: '1.5rem 1.8rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(196, 145, 60, 0.2)',
                    color: 'var(--color-ocre)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em'
                  }}
                >
                  <Calendar size={12} /> {gira.dateBadge}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#999' }}>{gira.dayOfWeek}</span>
              </div>

              <h3 
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: '#ffffff',
                  marginBottom: '0.75rem'
                }}
              >
                {gira.line}
              </h3>

              <p style={{ color: '#d0d0d0', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {gira.description}
              </p>

              {/* Box de Horários e Senhas */}
              <div 
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  marginBottom: '1.25rem',
                  borderLeft: '4px solid var(--color-ocre)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <Clock size={16} style={{ color: 'var(--color-ocre)' }} />
                  <span><strong>Portões e Senhas:</strong> {gira.doorsOpen}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <Info size={16} style={{ color: 'var(--color-ocre)' }} />
                  <span><strong>Início dos Trabalhos:</strong> {gira.startsAt}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
                  <MapPin size={16} style={{ color: 'var(--color-ocre)' }} />
                  <span>{gira.location}</span>
                </div>
              </div>

              {/* Recomendações e Caridade */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.7rem',
                  padding: '0.85rem',
                  backgroundColor: 'rgba(20, 40, 23, 0.45)',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  color: '#c2d6c6',
                  marginBottom: '1.5rem'
                }}
              >
                <HeartHandshake size={18} style={{ color: '#8e9b85', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Atendimento Gratuito:</strong> Na Umbanda a caridade não é vendida. Roupas claras recomendadas. Entrada permitida por ordem de chegada.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                  style={{
                    color: '#fff',
                    borderColor: 'rgba(255,255,255,0.3)',
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.88rem'
                  }}
                >
                  Fechar
                </button>
                <a 
                  href={`https://maps.google.com/?q=${encodeURIComponent(gira.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-ocre"
                  style={{
                    padding: '0.6rem 1.4rem',
                    fontSize: '0.88rem'
                  }}
                >
                  Ver no Mapa
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
