import { Link } from 'react-router-dom';
import { MapPin, Clock, ExternalLink, ShieldCheck } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-mata-dark)',
        color: 'rgba(255, 255, 255, 0.75)',
        borderTop: '2px solid rgba(196, 145, 60, 0.3)',
        marginTop: 'auto',
        fontSize: '0.9rem'
      }}
    >
      {/* Faixa superior de compromisso com a caridade */}
      <div 
        style={{
          backgroundColor: 'rgba(196, 145, 60, 0.1)',
          borderBottom: '1px solid rgba(196, 145, 60, 0.2)',
          padding: '1.25rem 1rem',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <ShieldCheck size={20} style={{ color: 'var(--color-ocre)' }} />
          <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '0.92rem' }}>
            <strong>Princípio Fundamental da Umbanda:</strong> As consultas e passes são 100% gratuitos. A caridade não se vende.
          </span>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 1.5rem 2.5rem' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem'
          }}
        >
          {/* Coluna 1: Identidade TULA */}
          <div>
            <div style={{ marginBottom: '1.2rem' }}>
              <Logo size={52} variant="ocre" textColor="#ffffff" />
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>
              Uma casa de caridade, acolhimento e amor ao próximo sob as bênçãos dos Orixás e a força das correntes espirituais de Aruanda.
            </p>
            <div style={{ fontStyle: 'italic', fontFamily: 'var(--font-serif)', color: 'var(--color-ocre-light)', fontSize: '1.05rem' }}>
              "Nossa raiz é forte. Nossa fé é antiga. Nosso amor é infinito."
            </div>
          </div>

          {/* Coluna 2: Localização e Atendimento */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                color: '#ffffff',
                marginBottom: '1.2rem',
                letterSpacing: '0.02em',
                borderBottom: '1px solid rgba(196, 145, 60, 0.3)',
                paddingBottom: '0.4rem',
                display: 'inline-block'
              }}
            >
              Atendimento e Local
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} style={{ color: 'var(--color-ocre)', flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>Endereço do Terreiro</div>
                  <div style={{ fontSize: '0.85rem' }}>R. Francisco Torres, 908</div>
                  <div style={{ fontSize: '0.85rem' }}>Centro — Curitiba / PR</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <Clock size={18} style={{ color: 'var(--color-ocre)', flexShrink: 0, marginTop: '3px' }} />
                <div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>Horários de Gira</div>
                  <div style={{ fontSize: '0.85rem' }}>Portões e senhas a partir das 19h00</div>
                  <div style={{ fontSize: '0.85rem' }}>Início dos trabalhos às 19h30</div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 3: Links Úteis */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                color: '#ffffff',
                marginBottom: '1.2rem',
                letterSpacing: '0.02em',
                borderBottom: '1px solid rgba(196, 145, 60, 0.3)',
                paddingBottom: '0.4rem',
                display: 'inline-block'
              }}
            >
              Navegação Rápida
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link to="/" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>• Página Inicial</Link>
              </li>
              <li>
                <Link to="/visitantes" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>• Orientações para 1ª Vez</Link>
              </li>
              <li>
                <Link to="/agenda" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>• Agenda de Giras & Calendário</Link>
              </li>
              <li>
                <Link to="/sobre" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>• O Terreiro e Fundamentos</Link>
              </li>
              <li>
                <Link to="/doacoes" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}>• Manutenção da Casa & Doações</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Redes e Contato */}
          <div>
            <h4 
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                color: '#ffffff',
                marginBottom: '1.2rem',
                letterSpacing: '0.02em',
                borderBottom: '1px solid rgba(196, 145, 60, 0.3)',
                paddingBottom: '0.4rem',
                display: 'inline-block'
              }}
            >
              Conecte-se
            </h4>

            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              Acompanhe avisos em tempo real e os cartazes semanais das giras pelo nosso Instagram oficial:
            </p>

            <a 
              href="https://instagram.com/terreiroluzdearuanda_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-pill"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderColor: 'var(--color-ocre)',
                color: '#ffffff',
                backgroundColor: 'rgba(196, 145, 60, 0.15)',
                marginBottom: '1rem'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>@terreiroluzdearuanda_</span>
            </a>

            <div>
              <a 
                href="https://maps.google.com/?q=R.+Francisco+Torres+908+Centro+Curitiba" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.82rem',
                  color: 'var(--color-salvia-light)'
                }}
              >
                Abrir rota no Google Maps <ExternalLink size={12} />
              </a>
            </div>

            {/* QR Code Linktree */}
            <div style={{ marginTop: '1.5rem' }}>
              <div style={{ fontSize: '0.82rem', marginBottom: '0.6rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                Nossa Árvore de Links (Linktree):
              </div>
              <div style={{ display: 'inline-block', padding: '0.4rem', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                <img 
                  src="/qrcode-linktree.png" 
                  alt="QR Code Linktree do Terreiro Luz de Aruanda" 
                  style={{ width: '85px', height: '85px', display: 'block', borderRadius: '6px' }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória e Direitos */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.78rem',
            color: 'rgba(255, 255, 255, 0.45)'
          }}
        >
          <span>© {new Date().getFullYear()} Terreiro de Umbanda Luz de Aruanda (TULA) — Todos os direitos reservados.</span>
          <span>Curitiba, Paraná — Saravá a Umbanda Sagrada</span>
        </div>
      </div>
    </footer>
  );
}
