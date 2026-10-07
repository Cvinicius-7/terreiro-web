import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader, ShieldAlert } from 'lucide-react';

export function ProtectedRoute({ children }) {
  const { session, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-areia)' }}>
        <Loader size={40} className="animate-spin" style={{ color: 'var(--color-ocre)' }} />
      </div>
    );
  }

  // Sem sessão: vai para o login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Logado, mas não está na allowlist de administradores.
  // (Mesmo que alguém force a renderização do painel, a RLS bloqueia os dados.)
  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-areia)' }}>
        <ShieldAlert size={42} style={{ color: 'var(--color-ocre-dark)' }} />
        <h2 style={{ fontSize: '1.6rem' }}>Acesso restrito</h2>
        <p style={{ color: 'var(--color-texto-suave)', maxWidth: '420px' }}>
          Esta conta não tem permissão de administrador.
        </p>
        <button className="btn-primary" onClick={signOut}>Sair</button>
      </div>
    );
  }

  return children;
}
