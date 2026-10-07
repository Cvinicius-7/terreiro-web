import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Send, CheckCircle, Mail, Phone, User } from 'lucide-react';

export function LeadCapture() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar se pelo menos um contato foi preenchido
    if (!formData.email && !formData.phone) {
      alert("Por favor, preencha pelo menos o e-mail ou o WhatsApp.");
      return;
    }

    setStatus('loading');

    try {
      const { error } = await supabase
        .from('community_leads')
        .insert([
          {
            name: formData.name,
            email: formData.email || null,
            phone: formData.phone || null
          }
        ]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });
      
      // Retorna para o estado normal após 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Erro ao enviar lead:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <>
      <style>
        {`
          .lead-capture-grid {
            max-width: 900px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 3rem;
            align-items: center;
            background-color: var(--color-areia);
            padding: 3rem;
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.05);
            border: 1px solid rgba(196, 145, 60, 0.2);
          }
          
          .lead-capture-form-box {
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: var(--shadow-sm);
          }

          @media (max-width: 768px) {
            .lead-capture-grid {
              grid-template-columns: 1fr;
              padding: 1.5rem;
              gap: 2rem;
              border-radius: 16px;
            }
            .lead-capture-form-box {
              padding: 1.5rem;
            }
          }
          
          @media (max-width: 480px) {
            .lead-capture-grid {
              padding: 1.25rem;
              gap: 1.5rem;
            }
            .lead-capture-form-box {
              padding: 1.25rem;
            }
          }
        `}
      </style>
      <section 
        style={{
          backgroundColor: '#ffffff',
          padding: '5rem 1.5rem',
          borderTop: '1px solid var(--color-borda)',
          borderBottom: '1px solid var(--color-borda)'
        }}
      >
        <div className="container lead-capture-grid">
          {/* Lado Esquerdo: Texto */}
          <div>
            <span 
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 600,
                color: 'var(--color-ocre-dark)'
              }}
            >
              Faça Parte da Corrente
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.4rem)', color: 'var(--color-mata-dark)', marginTop: '0.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
              Receba nossos Avisos e Programações
            </h2>
            <p style={{ color: 'var(--color-texto-suave)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Deixe seu contato para receber antecipadamente o calendário de giras, convites para festas, campanhas de arrecadação e alertas importantes do terreiro.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', color: 'var(--color-texto)', fontSize: '0.9rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-ocre)' }} /> Atualizações semanais
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-ocre)' }} /> Campanhas sociais
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-ocre)' }} /> Sem spam, apenas recados da casa
              </li>
            </ul>
          </div>

          {/* Lado Direito: Formulário */}
          <div className="lead-capture-form-box">
            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: '64px', height: '64px', backgroundColor: 'var(--color-salvia-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-mata)' }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--color-mata-dark)', marginBottom: '0.5rem' }}>Agradecemos o contato!</h3>
                <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.95rem' }}>Seus dados foram registrados. Em breve você receberá nossos recados.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-mata)', marginBottom: '0.4rem' }}>Seu Nome</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Como devemos lhe chamar?"
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.4rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-mata)', marginBottom: '0.4rem' }}>WhatsApp</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(41) 90000-0000"
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.4rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-mata)', marginBottom: '0.4rem' }}>E-mail (Opcional se tiver WhatsApp)</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.4rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem', lineHeight: 1.4 }}>
                  Ao se inscrever, você aceita receber comunicações do Terreiro Luz de Aruanda. Seus dados são protegidos e mantidos sob sigilo.
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary btn-ocre"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '1rem',
                    marginTop: '0.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    opacity: status === 'loading' ? 0.7 : 1,
                    cursor: status === 'loading' ? 'not-allowed' : 'pointer'
                  }}
                >
                  {status === 'loading' ? 'Enviando...' : (
                    <>Cadastrar para Receber Avisos <Send size={18} /></>
                  )}
                </button>

                {status === 'error' && (
                  <div style={{ color: 'red', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem' }}>
                    Ocorreu um erro ao enviar. Tente novamente.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
