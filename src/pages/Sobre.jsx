import { Compass, Heart, Shield, MapPin, Flame } from 'lucide-react';
import { Logo } from '../components/Logo';

export function Sobre() {
  return (
    <main style={{ backgroundColor: 'var(--color-areia)', paddingBottom: '5rem' }}>
      {/* Hero Sobre Nós */}
      <section 
        style={{
          backgroundColor: 'var(--color-mata)',
          color: '#ffffff',
          padding: '4.5rem 1.5rem 5rem',
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
            <Compass size={14} style={{ color: 'var(--color-ocre)' }} />
            Nossa História e Fundamento
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
            Terreiro de Umbanda Luz de Aruanda
          </h1>

          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            "A Umbanda é a manifestação do espírito para a caridade." Uma casa consagrada à prática do amor, 
            da cura desinteressada e do respeito à sabedoria ancestral.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '940px', marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        {/* Card Principal de Apresentação */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            border: '1px solid var(--color-borda)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '3.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <Logo size={68} variant="dark" textColor="var(--color-mata-dark)" />
          </div>

          <h2 style={{ fontSize: '2rem', color: 'var(--color-mata-dark)', marginBottom: '1.2rem' }}>
            Nossa Origem e Propósito
          </h2>

          <p style={{ color: 'var(--color-texto-suave)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            O <strong>Terreiro de Umbanda Luz de Aruanda (TULA)</strong> nasceu com a missão de manter viva a chama da 
            Umbanda tradicional brasileira: aquela que acolhe sem julgar, que estende a mão a quem precisa e que ensina a evolução espiritual através da caridade de pés descalços.
          </p>

          <p style={{ color: 'var(--color-texto-suave)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '1.8rem' }}>
            Localizado no coração de Curitiba, na Rua Francisco Torres, nosso congá é um refúgio de serenidade para quem busca paz de espírito, 
            direcionamento e alívio das aflições cotidianas sob o comando dos Caboclos, Pretos Velhos, Baianos, Marinheiros, Boiadeiros, Erês e Guardiões.
          </p>

          <div 
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-salvia-bg)',
              borderRadius: '12px',
              borderLeft: '4px solid var(--color-salvia)',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.15rem',
              color: 'var(--color-mata)',
              fontStyle: 'italic',
              lineHeight: 1.6
            }}
          >
            "Nossa raiz é forte. Nossa fé é antiga. Nosso amor é infinito. Entregamos nossas mãos para o trabalho sagrado de Aruanda."
          </div>
        </div>

        {/* Nossos Princípios Doutrinários */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2.2rem', color: 'var(--color-mata-dark)' }}>
            Nossos Princípios Fundamentais
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '2rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Heart size={28} style={{ color: 'var(--color-ocre-dark)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>Caridade Sem Moeda</h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Seguimos com rigor o princípio de que o dom mediúnico é uma oportunidade de servir. Ninguém paga ou recebe para estar em nosso terreiro.
              </p>
            </div>

            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '2rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Flame size={28} style={{ color: 'var(--color-ocre-dark)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>Respeito aos Orixás</h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Honramos as divindades da natureza — as matas, as cachoeiras, os mares, o vento e o fogo — reconhecendo nelas a manifestação viva do Criador.
              </p>
            </div>

            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '2rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Shield size={28} style={{ color: 'var(--color-ocre-dark)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>Disciplina e Ética</h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Nossa corrente mediúnica cultiva o estudo constante, o autoconhecimento, a humildade e a responsabilidade com cada consulente que nos procura.
              </p>
            </div>
          </div>
        </div>

        {/* Localização e Visita */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '2.5rem',
            border: '1px solid var(--color-borda)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            textAlign: 'center',
            alignItems: 'center'
          }}
        >
          <MapPin size={36} style={{ color: 'var(--color-ocre-dark)' }} />
          <h3 style={{ fontSize: '1.6rem', color: 'var(--color-mata-dark)', margin: 0 }}>
            Venha nos conhecer em Curitiba
          </h3>
          <p style={{ color: 'var(--color-texto-suave)', maxWidth: '550px', margin: 0 }}>
            Rua Francisco Torres, 908 — Centro, Curitiba/PR.<br />
            Nossas giras ocorrem todas as sextas-feiras com abertura às 19h00.
          </p>
          <a
            href="https://maps.google.com/?q=R.+Francisco+Torres+908+Centro+Curitiba"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-ocre"
            style={{ marginTop: '0.5rem' }}
          >
            Traçar Rota no Google Maps
          </a>
        </div>
      </div>
    </main>
  );
}
