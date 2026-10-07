import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Visitantes } from './pages/Visitantes';
import { Agenda } from './pages/Agenda';
import { Sobre } from './pages/Sobre';
import { Doacoes } from './pages/Doacoes';
import { Login } from './pages/Login';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { FloatingWhatsApp } from './components/FloatingWhatsApp';

function PublicLayout({ children }) {
  const location = useLocation();
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {/* O key={location.pathname} força o React a recriar esta div toda vez que mudamos de página, ativando a animação novamente */}
      <main key={location.pathname} className="page-transition" style={{ flex: 1 }}>
        {children}
      </main>
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rotas Administrativas */}
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Rotas Públicas */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/visitantes" element={<PublicLayout><Visitantes /></PublicLayout>} />
        <Route path="/agenda" element={<PublicLayout><Agenda /></PublicLayout>} />
        <Route path="/sobre" element={<PublicLayout><Sobre /></PublicLayout>} />
        <Route path="/doacoes" element={<PublicLayout><Doacoes /></PublicLayout>} />
        
        {/* Fallback */}
        <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;