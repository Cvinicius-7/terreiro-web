import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, MapPin, Heart, ShieldCheck, HelpCircle, ArrowRight, Compass, Users } from 'lucide-react';
import { GiraCard } from '../components/GiraCard';
import { LeadCapture } from '../components/LeadCapture';
import { useGiras } from '../hooks/useGiras';

export function Home() {
  const { giras, loading } = useGiras();
  
  // Pega a próxima gira em destaque ou a primeira aberta
  const featuredGira = giras?.find(g => g.isFeatured) || giras?.[0];

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section Imersivo */}
      <section 
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-mata)',
          color: '#ffffff',
          padding: '5rem 1.5rem 6.5rem',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(196, 145, 60, 0.3)'
        }}
      >
        {/* Glow de fundo e texturas sutis */}
        <div 
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '800px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(196, 145, 60, 0.18) 0%, rgba(20, 40, 23, 0) 70%)',
            pointerEvents: 'none'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '880px' }}>
          {/* Badge institucional */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(196, 145, 60, 0.35)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.8rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-ocre-light)',
              marginBottom: '1.8rem'
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-ocre)' }} />
            Terreiro de Umbanda Luz de Aruanda • Curitiba
          </div>

          <h1 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              lineHeight: 1.1,
              fontWeight: 500,
              color: '#ffffff',
              marginBottom: '1.4rem',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 16px rgba(0,0,0,0.5)'
            }}
          >
            Nossa Corrente é de Fé, Acolhimento e Amor
          </h1>

          <p 
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '2.5rem',
              maxWidth: '720px',
              marginInline: 'auto'
            }}
          >
            Seja muito bem-vindo(a) à nossa casa espiritual. Portas abertas para a caridade sincera, 
            o consolo dos corações aflitos e a sabedoria ancestral dos Orixás e Guias de Luz.
          </p>

          {/* Botões de Ação */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/visitantes" className="btn-primary btn-ocre">
              Sou Novo Por Aqui <ArrowRight size={16} />
            </Link>
            <Link 
              to="/agenda" 
              className="btn-secondary"
              style={{
                color: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(0, 0, 0, 0.25)'
              }}
            >
              <Calendar size={16} /> Calendário de Giras
            </Link>
          </div>
        </div>
      </section>

      {/* Seção da Próxima Gira em Destaque */}
      <section style={{ padding: '4.5rem 1.5rem', backgroundColor: 'var(--color-areia)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span 
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-ocre-dark)'
              }}
            >
              Programação Semanal
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', marginTop: '0.4rem', color: 'var(--color-mata-dark)' }}>
              Próxima Gira de Atendimento
            </h2>
            <p style={{ color: 'var(--color-texto-suave)', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              Nossos trabalhos ocorrem semanalmente no Centro de Curitiba. As consultas são distribuídas por ordem de chegada.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
              maxWidth: '1050px',
              margin: '0 auto'
            }}
          >
            {/* Card com a Identidade das Postagens do Instagram */}
            <div style={{ maxWidth: '440px', margin: '0 auto', width: '100%' }}>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-texto-suave)' }}>
                  Carregando informações da gira...
                </div>
              ) : featuredGira ? (
                <GiraCard gira={featuredGira} isHeroHighlight={true} />
              ) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-texto-suave)' }}>
                  Nenhuma gira agendada no momento.
                </div>
              )}
            </div>

            {/* Informações Complementares da Gira */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div>
                <span 
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--color-mata)',
                    backgroundColor: 'var(--color-salvia-bg)',
                    padding: '0.35rem 0.8rem',
                    borderRadius: '999px',
                    display: 'inline-block',
                    marginBottom: '0.8rem'
                  }}
                >
                  Informações Importantes
                </span>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--color-mata-dark)' }}>
                  Como participar do atendimento
                </h3>
                <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.95rem' }}>
                  {loading ? "Carregando..." : featuredGira?.description || "Consulte a agenda para mais detalhes sobre nossos próximos trabalhos."}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--color-borda)', paddingTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <Clock size={18} style={{ color: 'var(--color-ocre-dark)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Distribuição de Senhas: 19h00</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-texto-suave)' }}>
                      Recomendamos chegar com 30 minutos de antecedência para garantir seu atendimento.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <ShieldCheck size={18} style={{ color: 'var(--color-ocre-dark)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>Consultas 100% Gratuitas</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-texto-suave)' }}>
                      Nenhum médium ou membro da nossa casa cobra por trabalhos ou passes espirituais.
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={18} style={{ color: 'var(--color-ocre-dark)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>R. Francisco Torres, 908</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-texto-suave)' }}>
                      Centro, Curitiba/PR (Fácil acesso e linhas de ônibus)
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <Link to="/visitantes" className="btn-primary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem' }}>
                  Ver Regras de Visitação
                </Link>
                <Link to="/agenda" className="btn-secondary" style={{ fontSize: '0.9rem', padding: '0.75rem 1.4rem' }}>
                  Ver Todas as Giras
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares do Terreiro (Inspirado no Vovó Benta e Pai Maneco) */}
      <section style={{ padding: '5rem 1.5rem', backgroundColor: '#ffffff', borderTop: '1px solid var(--color-borda)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span 
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-ocre-dark)'
              }}
            >
              Nossa Doutrina
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', marginTop: '0.4rem', color: 'var(--color-mata-dark)' }}>
              Pilares da Umbanda no TULA
            </h2>
            <p style={{ color: 'var(--color-texto-suave)', maxWidth: '650px', margin: '0.5rem auto 0' }}>
              Trabalhamos fundamentados na simplicidade, na sabedoria dos mais velhos e na dedicação desinteressada ao próximo.
            </p>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* Pilar 1 */}
            <div 
              style={{
                backgroundColor: 'var(--color-areia)',
                borderRadius: '16px',
                padding: '2.2rem 1.8rem',
                border: '1px solid var(--color-borda)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-salvia-light)',
                  color: 'var(--color-mata)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <Heart size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: 'var(--color-mata-dark)' }}>
                Caridade Sem Cobrança
              </h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                "Dai de graça o que de graça recebestes". Em nossa casa, nenhuma consulta, passe, água fluidificada ou orientação espiritual é cobrada. A prática do bem é universal e irrestrita.
              </p>
            </div>

            {/* Pilar 2 */}
            <div 
              style={{
                backgroundColor: 'var(--color-areia)',
                borderRadius: '16px',
                padding: '2.2rem 1.8rem',
                border: '1px solid var(--color-borda)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-ocre-light)',
                  color: 'var(--color-ocre-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: 'var(--color-mata-dark)' }}>
                Umbanda Pés no Chão
              </h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Praticamos o ritual tradicional com respeito às ervas sagradas, às guias, ao canto do atabaque e à força genuína das entidades, sem afetações ou misticismos exagerados.
              </p>
            </div>

            {/* Pilar 3 */}
            <div 
              style={{
                backgroundColor: 'var(--color-areia)',
                borderRadius: '16px',
                padding: '2.2rem 1.8rem',
                border: '1px solid var(--color-borda)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-salvia-light)',
                  color: 'var(--color-mata)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}
              >
                <Users size={26} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: 'var(--color-mata-dark)' }}>
                Acolhimento Fraterno
              </h3>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Recebemos a todos sem distinção de raça, crença, gênero ou origem social. Quem entra pela porta do terreiro encontra irmãos prontos para estender as mãos com amor e respeito.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sistema de Captura de Leads / Comunidade */}
      <LeadCapture />

      {/* Banner de Chamada para Visitantes */}
      <section 
        style={{
          backgroundColor: 'var(--color-salvia)',
          color: '#ffffff',
          padding: '4.5rem 1.5rem',
          backgroundImage: 'linear-gradient(rgba(20,40,23,0.35), rgba(20,40,23,0.35))'
        }}
      >
        <div className="container" style={{ textAlign: 'center', maxWidth: '750px' }}>
          <HelpCircle size={40} style={{ color: 'var(--color-ocre-light)', marginBottom: '1rem' }} />
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', marginBottom: '1rem' }}>
            Vai nos visitar pela primeira vez?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Preparamos um guia simples e acolhedor para você saber exatamente o que vestir, como funciona a retirada de senhas, as regras de silêncio e o respeito com as entidades.
          </p>
          <Link 
            to="/visitantes" 
            className="btn-primary btn-ocre"
            style={{ fontSize: '1rem', padding: '0.9rem 2.2rem' }}
          >
            Acessar Manual do Visitante <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}