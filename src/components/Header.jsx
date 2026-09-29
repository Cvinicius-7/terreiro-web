import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, AlertCircle, Info, BellRing } from 'lucide-react';
import { Logo } from './Logo';
import { useAvisos } from '../hooks/useAvisos';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { avisos } = useAvisos(); // false by default = only active

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Primeira Vez?', path: '/visitantes' },
    { name: 'Agenda & Giras', path: '/agenda' },
    { name: 'O Terreiro', path: '/sobre' },
    { name: 'Como Ajudar', path: '/doacoes' }
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(18, 32, 21, 0.96)' : 'var(--color-mata)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(196, 145, 60, 0.25)',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.25)' : 'none'
      }}
    >
      {/* Sistema Dinâmico de Avisos */}
      {avisos.length > 0 && avisos.map(aviso => {
        let bgColor = '#1e3a8a'; // info (azul)
        let icon = <Info size={14} />;
        
        if (aviso.type === 'alerta') {
          bgColor = '#b45309'; // alerta (laranja)
          icon = <BellRing size={14} />;
        } else if (aviso.type === 'urgente') {
          bgColor = '#991b1b'; // urgente (vermelho)
          icon = <AlertCircle size={14} />;
        }

        return (
          <div 
            key={aviso.id}
            style={{
              backgroundColor: bgColor,
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
              padding: '0.35rem 1rem',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}
          >
            {icon}
            <span>{aviso.message}</span>
          </div>
        );
      })}

      {/* Top Banner sutil de boas-vindas / endereço */}
      <div 
        style={{
          backgroundColor: '#0d1a10',
          color: 'var(--color-salvia)',
          fontSize: '0.75rem',
          letterSpacing: '0.06em',
          padding: '0.35rem 1rem',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin size={12} style={{ color: 'var(--color-ocre)' }} /> R. Francisco Torres 908 - Centro, Curitiba
        </span>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={() => setMobileOpen(false)}>
          <Logo size={46} variant="ocre" textColor="#ffffff" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? 'var(--color-ocre)' : 'rgba(255, 255, 255, 0.88)',
                  letterSpacing: '0.04em',
                  position: 'relative',
                  padding: '0.4rem 0'
                }}
              >
                {link.name}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-ocre)',
                      borderRadius: '2px'
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button Desktop */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Link 
            to="/visitantes" 
            className="btn-pill"
            style={{
              borderColor: 'var(--color-ocre)',
              color: '#ffffff',
              backgroundColor: 'rgba(196, 145, 60, 0.15)',
              fontSize: '0.78rem',
              padding: '0.45rem 1.1rem'
            }}
          >
            Sou Novo Por Aqui
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir Menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            display: 'none',
            padding: '0.5rem'
          }}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div 
          style={{
            backgroundColor: '#112014',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.25rem 1.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 10px 24px rgba(0,0,0,0.4)'
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  fontWeight: isActive ? '600' : '400',
                  color: isActive ? 'var(--color-ocre)' : '#ffffff',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                {link.name}
              </Link>
            );
          })}

          <div style={{ paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link 
              to="/visitantes" 
              onClick={() => setMobileOpen(false)}
              className="btn-primary btn-ocre"
              style={{ textAlign: 'center', width: '100%', fontSize: '0.9rem' }}
            >
              Orientações para 1ª Vez
            </Link>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              📍 R. Francisco Torres 908 - Curitiba/PR
            </div>
          </div>
        </div>
      )}

      {/* Estilos responsivos inline para os breakpoints mobile */}
      <style>{`
        @media (max-width: 900px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}