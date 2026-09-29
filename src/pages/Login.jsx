import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Logo } from '../components/Logo';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { session, signIn } = useAuth();
  const navigate = useNavigate();

  // Se já estiver logado, manda direto pro painel admin
  if (session) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const { error } = await signIn(email, password);

    if (error) {
      setErrorMsg('E-mail ou senha incorretos.');
      setIsSubmitting(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <main 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-areia)',
        padding: '2rem'
      }}
    >
      <div 
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-borda)',
          textAlign: 'center'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '80px' }}>
            <Logo variant="dark" />
          </div>
        </div>

        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-mata-dark)', marginBottom: '0.5rem' }}>
          Acesso Administrativo
        </h1>
        <p style={{ color: 'var(--color-texto-suave)', fontSize: '0.95rem', marginBottom: '2.5rem' }}>
          Área restrita à diretoria do TULA.
        </p>

        {errorMsg && (
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            padding: '0.8rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.9rem'
          }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-mata-dark)', marginBottom: '0.4rem' }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-texto-suave)' }} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-borda)',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-mata-dark)', marginBottom: '0.4rem' }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-texto-suave)' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.5rem',
                  borderRadius: '12px',
                  border: '1px solid var(--color-borda)',
                  outline: 'none',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="btn-primary"
            style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', justifyContent: 'center' }}
          >
            {isSubmitting ? <Loader className="animate-spin" size={18} /> : (
              <>Entrar <ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
