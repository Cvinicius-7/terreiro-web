import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from 'lucide-react';

export function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-areia)' }}>
        <Loader size={40} className="animate-spin" style={{ color: 'var(--color-ocre)' }} />
      </div>
    );
  }

  // Se não tem sessão, redireciona para login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza o componente filho (Painel Admin)
  return children;
}
