import { useState } from 'react';
import { Heart, Copy, Check, ShieldCheck, Gift, ShoppingBag, Sparkles } from 'lucide-react';

export function Doacoes() {
  const [copied, setCopied] = useState(false);
  const pixKey = "tendatula7@gmail.com";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main style={{ backgroundColor: 'var(--color-areia)', paddingBottom: '5rem' }}>
      {/* Hero Doações */}
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
            <Heart size={14} style={{ color: 'var(--color-ocre)' }} />
            Manutenção & Caridade
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
            Apoie a Nossa Casa
          </h1>

          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            O TULA é mantido exclusivamente pelo esforço de seus médiuns e pelo coração generoso de amigos e consulentes.
            Toda colaboração voluntária ajuda a manter as portas abertas e acolher quem mais precisa.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '940px', marginTop: '-2.5rem', position: 'relative', zIndex: 10 }}>
        {/* Card Pix Oficial */}
        <div 
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '3rem 2.5rem',
            border: '2px solid var(--color-ocre)',
            boxShadow: 'var(--shadow-md)',
            marginBottom: '3.5rem',
            textAlign: 'center'
          }}
        >
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-ocre-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: 'var(--color-ocre-dark)'
            }}
          >
            <Sparkles size={32} />
          </div>

          <h2 style={{ fontSize: '1.9rem', color: 'var(--color-mata-dark)', marginBottom: '0.5rem' }}>
            Contribuição Espontânea via Pix
          </h2>
          <p style={{ color: 'var(--color-texto-suave)', maxWidth: '550px', margin: '0 auto 1.8rem', fontSize: '0.95rem' }}>
            Você pode contribuir com qualquer valor para custos de água, luz, aluguel do espaço físico e insumos de trabalho ritualístico.
          </p>

          {/* Box de Chave Pix com Botão Copiar */}
          <div 
            style={{
              maxWidth: '480px',
              margin: '0 auto',
              backgroundColor: 'var(--color-areia)',
              borderRadius: '12px',
              padding: '0.8rem 1.2rem',
              border: '1px solid var(--color-borda)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ textAlign: 'left', overflow: 'hidden' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-texto-suave)', fontWeight: 600 }}>
                Chave Pix (E-mail):
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, color: 'var(--color-mata-dark)', fontSize: '1.05rem', wordBreak: 'break-all' }}>
                {pixKey}
              </div>
            </div>

            <button 
              onClick={handleCopyPix}
              className="btn-primary btn-ocre"
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem',
                borderRadius: '8px',
                flexShrink: 0
              }}
            >
              {copied ? (
                <>
                  <Check size={16} /> Copiado!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copiar Chave
                </>
              )}
            </button>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-texto-suave)' }}>
            <ShieldCheck size={16} style={{ color: '#2e7d32' }} />
            <span>Destinatário: Terreiro de Umbanda Luz de Aruanda</span>
          </div>
        </div>

        {/* Doações de Materiais e Alimentos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Doação de Materiais */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2.2rem',
              border: '1px solid var(--color-borda)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <Gift size={24} style={{ color: 'var(--color-mata)' }} />
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Materiais para o Congá</h3>
            </div>
            <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Itens que utilizamos semanalmente nas giras e na conservação do espaço sagrado:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--color-texto)' }}>
              <li>• Velas brancas (palito ou 7 dias)</li>
              <li>• Fósforos e isqueiros</li>
              <li>• Ervas secas (alfazema, alecrim, arruda, guiné)</li>
              <li>• Produtos de limpeza e sacos de lixo</li>
              <li>• Papel higiênico e papel toalha</li>
            </ul>
          </div>

          {/* Ações Sociais e Alimentos */}
          <div 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '2.2rem',
              border: '1px solid var(--color-borda)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
              <ShoppingBag size={24} style={{ color: 'var(--color-mata)' }} />
              <h3 style={{ fontSize: '1.35rem', margin: 0 }}>Alimentos Não Perecíveis</h3>
            </div>
            <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              Arrecadamos mensalmente alimentos para montagem de cestas básicas destinadas a famílias atendidas por nossas ações de caridade em Curitiba:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--color-texto)' }}>
              <li>• Arroz, feijão, óleo e macarrão</li>
              <li>• Leite em pó e café</li>
              <li>• Açúcar, farinha e biscoitos</li>
              <li>• Sabonetes e pastas de dente</li>
            </ul>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-salvia-dark)', marginTop: '1rem', fontStyle: 'italic' }}>
              * As doações físicas podem ser entregues diretamente na recepção do terreiro nos dias de gira.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
