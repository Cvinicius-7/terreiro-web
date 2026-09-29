import logoWhite from '../assets/logo-transparent.png';
import logoDark from '../assets/logo-dark.png';
import logoOcre from '../assets/logo-ocre.png';

/**
 * Emblema oficial do Terreiro de Umbanda Luz de Aruanda (TULA)
 * Utiliza o arquivo oficial fornecido pela casa com fundo transparente.
 */
export function Logo({ 
  size = 48, 
  variant = 'white', 
  showText = true, 
  textColor = 'currentColor', 
  className = '' 
}) {
  let logoSrc = logoWhite;
  if (variant === 'dark') {
    logoSrc = logoDark;
  } else if (variant === 'ocre') {
    logoSrc = logoOcre;
  }

  return (
    <div 
      className={`tula-logo-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.85rem',
        textDecoration: 'none',
        userSelect: 'none'
      }}
    >
      <img
        src={logoSrc}
        alt="Emblema Oficial Terreiro de Umbanda Luz de Aruanda"
        width={size}
        height={size}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0
        }}
      />

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.15 }}>
          <span 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.45rem', 
              fontWeight: '600', 
              letterSpacing: '0.04em',
              color: textColor 
            }}
          >
            TULA
          </span>
          <span 
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '0.62rem', 
              fontWeight: '600', 
              letterSpacing: '0.14em', 
              textTransform: 'uppercase',
              color: textColor,
              opacity: 0.82
            }}
          >
            Terreiro de Umbanda Luz de Aruanda
          </span>
        </div>
      )}
    </div>
  );
}
