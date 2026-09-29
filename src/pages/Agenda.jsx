import { useState } from 'react';
import { Calendar as CalendarIcon, ExternalLink } from 'lucide-react';
import { GiraCard } from '../components/GiraCard';
import { useGiras } from '../hooks/useGiras';

export function Agenda() {
  const [filter, setFilter] = useState('todas');
  const { giras, loading } = useGiras();

  const categories = [
    { id: 'todas', label: 'Todas as Giras' },
    { id: 'caboclos', label: 'Caboclos' },
    { id: 'pretos-velhos', label: 'Pretos Velhos & Erês' },
    { id: 'baianos', label: 'Baianos & Ciganos' },
    { id: 'esquerda', label: 'Guardiões (Exu)' }
  ];

  const filteredGiras = giras.filter(gira => {
    if (filter === 'todas') return true;
    if (filter === 'caboclos') return gira.line.toLowerCase().includes('caboclo');
    if (filter === 'pretos-velhos') return gira.line.toLowerCase().includes('pretos velhos') || gira.line.toLowerCase().includes('erê');
    if (filter === 'baianos') return gira.line.toLowerCase().includes('baiano') || gira.line.toLowerCase().includes('cigano');
    if (filter === 'esquerda') return gira.line.toLowerCase().includes('guardiões') || gira.line.toLowerCase().includes('exu');
    return true;
  });

  return (
    <main style={{ backgroundColor: 'var(--color-areia)', paddingBottom: '5rem' }}>
      {/* Top Banner da Agenda */}
      <section 
        style={{
          backgroundColor: 'var(--color-mata)',
          color: '#ffffff',
          padding: '4.5rem 1.5rem 4rem',
          textAlign: 'center',
          position: 'relative',
          borderBottom: '1px solid rgba(196, 145, 60, 0.3)'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 1rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(196, 145, 60, 0.35)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-ocre-light)',
              marginBottom: '1.2rem'
            }}
          >
            <CalendarIcon size={14} style={{ color: 'var(--color-ocre)' }} />
            Calendário de Atendimentos
          </div>

          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.3rem, 4.5vw, 3.5rem)',
              color: '#ffffff',
              marginBottom: '1.2rem',
              lineHeight: 1.15
            }}
          >
            Agenda de Giras e Eventos
          </h1>

          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Acompanhe nossas datas de atendimento ao público no Centro de Curitiba. 
            Todas as sextas-feiras, com entrega de senhas a partir das 19h00 e início pontual às 19h30.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1150px', marginTop: '2.5rem' }}>
        {/* Filtros de Linhas de Trabalho */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              style={{
                padding: '0.55rem 1.25rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                border: filter === cat.id ? '1px solid var(--color-mata)' : '1px solid var(--color-borda)',
                backgroundColor: filter === cat.id ? 'var(--color-mata)' : '#ffffff',
                color: filter === cat.id ? '#ffffff' : 'var(--color-texto-suave)',
                boxShadow: filter === cat.id ? 'var(--shadow-sm)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Giras no Formato dos Posts do Instagram */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '2rem',
            marginBottom: '4.5rem'
          }}
        >
          {loading ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-texto-suave)' }}>
              Carregando calendário de atendimentos...
            </div>
          ) : filteredGiras.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-texto-suave)' }}>
              Nenhuma gira encontrada para esta categoria.
            </div>
          ) : (
            filteredGiras.map(gira => (
              <GiraCard key={gira.id} gira={gira} />
            ))
          )}
        </div>

        {/* Seção Google Calendar Integrado */}
        <section 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '2.5rem',
            border: '1px solid var(--color-borda)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--color-borda)',
              paddingBottom: '1.25rem'
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.7rem', color: 'var(--color-mata-dark)', marginBottom: '0.3rem' }}>
                Google Agenda Oficial do Terreiro
              </h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', margin: 0 }}>
                Sincronização em tempo real das giras, comemorações e eventos do TULA.
              </p>
            </div>

            <a
              href="https://calendar.google.com/calendar/u/0/r?cid=dGVuZGF0dWxhN0BnbWFpbC5jb20"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill"
              style={{
                borderColor: 'var(--color-mata)',
                color: 'var(--color-mata)',
                backgroundColor: 'var(--color-salvia-bg)',
                fontSize: '0.8rem'
              }}
            >
              Adicionar ao meu Google Agenda <ExternalLink size={14} />
            </a>
          </div>

          {/* Iframe estilizado do Google Calendar */}
          <div 
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid var(--color-borda)',
              backgroundColor: '#fafafa'
            }}
          >
            <iframe 
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FSao_Paulo&showPrint=0&showTitle=0&src=dGVuZGF0dWxhN0BnbWFpbC5jb20&src=cHQtYnIuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23142817&color=%23c4913c" 
              style={{
                width: '100%',
                height: '580px',
                border: 0,
                display: 'block'
              }}
              frameBorder="0" 
              scrolling="no"
              title="Google Agenda Oficial do Terreiro Luz de Aruanda"
            />
          </div>
        </section>
      </div>
    </main>
  );
}