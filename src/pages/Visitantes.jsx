import { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle,
  Footprints
} from 'lucide-react';

export function Visitantes() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Preciso pagar por algum atendimento ou trabalho?",
      a: "Não! Absolutamente nada é cobrado. A Umbanda é caridade pura. Não cobramos senhas, consultas, passes, velas ou qualquer orientação. Qualquer pessoa que tente cobrar algo em nome do terreiro está agindo contra os nossos princípios sagrados."
    },
    {
      q: "Posso ir apenas para assistir e tomar um passe, sem fazer consulta?",
      a: "Com certeza! Muitas pessoas vão apenas para ouvir a curimba (os cânticos), sentir a vibração da casa e receber o passe de descarrego e energização. Você só passa em consulta com a entidade se desejar."
    },
    {
      q: "Crianças podem participar da assistência?",
      a: "Sim, crianças são sempre muito bem-vindas na nossa casa. Pedimos apenas aos pais e responsáveis que mantenham a tranquilidade durante o momento de prece e evitem circulação livre na área do congá por questões de segurança (velas acesas e defumação)."
    },
    {
      q: "Preciso levar alguma coisa (velas, flores, bebidas)?",
      a: "Não é necessário levar nada para ser atendido. Se você desejar colaborar voluntariamente com a casa, aceitamos velas brancas de 7 dias, palito ou doações de alimentos não perecíveis para as famílias assistidas pela nossa caridade."
    },
    {
      q: "Qual entidade vai me atender?",
      a: "O atendimento varia de acordo com a linha da semana (conforme a nossa Agenda de Giras: Caboclos, Pretos Velhos, Baianos, Guardiões, etc.). Ao ser chamada a sua senha, o cambono (assistente do médium) conduzirá você até uma das entidades que estiver disponível."
    },
    {
      q: "O que é um 'Cambono'?",
      a: "O cambono é o filho da casa que acompanha a entidade. Ele auxilia o médium em transe, anota orientações se necessário, acende cachimbos/charutos sagrados e garante o bem-estar e o respeito durante todo o seu atendimento."
    }
  ];

  return (
    <main style={{ backgroundColor: 'var(--color-areia)', paddingBottom: '5rem' }}>
      {/* Header da Página */}
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
            <Footprints size={14} style={{ color: 'var(--color-ocre)' }} />
            Manual do Consulente
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
            Orientações para Sua Primeira Vez
          </h1>

          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Se você nunca esteve em um terreiro de Umbanda ou está visitando o TULA pela primeira vez, 
            sinta-se acolhido(a). Aqui explicamos com clareza e transparência o que esperar e como se preparar.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '980px', marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        {/* Box Destaque: Caridade Absoluta */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '1.8rem 2rem',
            border: '2px solid var(--color-ocre)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '3rem',
            flexWrap: 'wrap'
          }}
        >
          <div 
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-ocre-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ShieldCheck size={32} style={{ color: 'var(--color-ocre-dark)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--color-mata-dark)', marginBottom: '0.3rem' }}>
              Toda Consulta e Passe é 100% Gratuito
            </h3>
            <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.92rem', margin: 0, lineHeight: 1.55 }}>
              A Umbanda não cobra, não vende trabalhos e não aceita pagamentos em dinheiro para consultas espirituais.
              Nosso compromisso é unicamente com o bem, o alívio espiritual e a caridade ensinada por nossos guias.
            </p>
          </div>
        </div>

        {/* Grade de 4 Passos do Visitante */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2.5rem', fontSize: '2.2rem', color: 'var(--color-mata-dark)' }}>
            O Passo a Passo da Sua Visita
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.8rem' }}>
            {/* Passo 1 */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '1.8rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-mata)',
                    color: '#fff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem'
                  }}
                >
                  1
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Horário & Senhas</h4>
              </div>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Os portões abrem às <strong>19h00</strong> para a retirada das senhas numeradas. 
                Recomendamos chegar pontualmente para garantir sua vaga. O início da gira ocorre às <strong>19h30</strong>.
              </p>
            </div>

            {/* Passo 2 */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '1.8rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-mata)',
                    color: '#fff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem'
                  }}
                >
                  2
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Vestimenta Adequada</h4>
              </div>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Dê preferência a <strong>roupas claras ou brancas</strong>, confortáveis e respeitosas. 
                Evite decotes acentuados, shorts muito curtos ou roupas transparentes, preservando a harmonia do congá.
              </p>
            </div>

            {/* Passo 3 */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '1.8rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-mata)',
                    color: '#fff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem'
                  }}
                >
                  3
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Silêncio & Respeito</h4>
              </div>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Desligue ou coloque o <strong>celular no silencioso</strong>. É expressamente proibido filmar ou fotografar 
                os médiuns e consulentes. Mantenha os pensamentos elevados e participe das cantigas com respeito.
              </p>
            </div>

            {/* Passo 4 */}
            <div 
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '14px',
                padding: '1.8rem',
                border: '1px solid var(--color-borda)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}
              >
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--color-mata)',
                    color: '#fff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem'
                  }}
                >
                  4
                </div>
                <h4 style={{ fontSize: '1.2rem', margin: 0 }}>A Consulta</h4>
              </div>
              <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Quando sua senha for chamada, vá até a entidade com o coração tranquilo. Pode expor suas dores e dúvidas. 
                Receba o passe com fé e gratidão. Ao terminar, tome água fluidificada disponível na casa.
              </p>
            </div>
          </div>
        </div>

        {/* Guia Visual: O que Fazer e O que Evitar */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4.5rem'
          }}
        >
          {/* Card O Que Fazer */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2.2rem',
              borderLeft: '5px solid #2e7d32',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
              <CheckCircle2 size={24} style={{ color: '#2e7d32' }} />
              <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#2e7d32' }}>O que é Recomendado</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓</span>
                <span>Chegar com antecedência e aguardar serenamente na assistência.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓</span>
                <span>Usar roupas claras, brancas ou tons pastéis de tecidos confortáveis.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓</span>
                <span>Bater palmas no ritmo do atabaque e acompanhar as preces e cantos.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓</span>
                <span>Tratar com carinho e educação os cambonos, médiuns e irmãos de fé.</span>
              </li>
            </ul>
          </div>

          {/* Card O Que Evitar */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2.2rem',
              borderLeft: '5px solid #c62828',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.2rem' }}>
              <AlertCircle size={24} style={{ color: '#c62828' }} />
              <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#c62828' }}>O que Evitar</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#c62828', fontWeight: 'bold' }}>✕</span>
                <span>Filmar, fotografar ou gravar áudio durante qualquer momento da gira.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#c62828', fontWeight: 'bold' }}>✕</span>
                <span>Conversas paralelas, risos altos ou comentários desrespeitosos.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#c62828', fontWeight: 'bold' }}>✕</span>
                <span>Comparecer sob efeito de bebidas alcoólicas ou substâncias ilícitas.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-texto)' }}>
                <span style={{ color: '#c62828', fontWeight: 'bold' }}>✕</span>
                <span>Tocar em assentamentos, imagens do congá ou objetos ritualísticos sem autorização.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção FAQ Retrátil */}
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2.2rem', color: 'var(--color-mata-dark)' }}>
            Dúvidas Frequentes (FAQ)
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-texto-suave)', marginBottom: '2.5rem', maxWidth: '600px', marginInline: 'auto' }}>
            Respostas para as perguntas mais comuns de quem visita nossa casa pela primeira vez.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid var(--color-borda)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    style={{
                      width: '100%',
                      padding: '1.3rem 1.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: isOpen ? 'var(--color-salvia-bg)' : '#ffffff',
                      color: 'var(--color-mata-dark)',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} style={{ color: 'var(--color-mata)' }} /> : <ChevronDown size={20} style={{ color: 'var(--color-texto-suave)' }} />}
                  </button>

                  {isOpen && (
                    <div 
                      style={{
                        padding: '1.2rem 1.6rem 1.5rem',
                        color: 'var(--color-texto-suave)',
                        fontSize: '0.94rem',
                        lineHeight: 1.65,
                        borderTop: '1px solid var(--color-borda)',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}