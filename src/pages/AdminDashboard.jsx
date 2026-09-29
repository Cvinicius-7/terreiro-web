import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { LogOut, Plus, Edit2, Trash2 } from 'lucide-react';
import { Logo } from '../components/Logo';
import { AdminGiraForm } from '../components/AdminGiraForm';
import { AdminAvisos } from '../components/AdminAvisos';

export function AdminDashboard() {
  const { signOut } = useAuth();
  const [giras, setGiras] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para controlar a view (list | form) e a gira em edição
  const [view, setView] = useState('list');
  const [editingGira, setEditingGira] = useState(null);

  const fetchGiras = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('giras')
      .select('*')
      .order('date', { ascending: true });
    
    if (!error && data) {
      setGiras(data);
    }
    setLoading(false);
  };

  const [activeTab, setActiveTab] = useState('giras');
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);

  const fetchLeads = async () => {
    setLoadingLeads(true);
    const { data, error } = await supabase
      .from('community_leads')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setLeads(data);
    }
    setLoadingLeads(false);
  };

  useEffect(() => {
    fetchGiras();
    fetchLeads();
  }, []);

  const handleLogout = async () => {
    await signOut();
  };

  const handleAdd = () => {
    setEditingGira(null);
    setView('form');
  };

  const handleEdit = (gira) => {
    setEditingGira(gira);
    setView('form');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta gira?')) {
      const { error } = await supabase.from('giras').delete().eq('id', id);
      if (error) {
        alert('Erro ao excluir: ' + error.message);
      } else {
        fetchGiras();
      }
    }
  };

  const handleFormSave = () => {
    setView('list');
    fetchGiras(); // recarrega a lista
  };

  const handleFormCancel = () => {
    setView('list');
  };

  const handleCopyLeads = () => {
    const phones = leads.filter(l => l.phone).map(l => l.phone).join(', ');
    navigator.clipboard.writeText(phones);
    alert('Números de WhatsApp copiados para a área de transferência!');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header Admin */}
      <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '40px' }}><Logo variant="dark" /></div>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-mata-dark)' }}>Painel Administrativo</h1>
        </div>
        <button 
          onClick={handleLogout}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: '#ef4444', fontWeight: 500, cursor: 'pointer' }}
        >
          <LogOut size={18} /> Sair
        </button>
      </header>

      <main style={{ padding: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Navegação de Abas */}
        {view === 'list' && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveTab('giras')}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: activeTab === 'giras' ? 'var(--color-mata-dark)' : '#ffffff',
                color: activeTab === 'giras' ? '#ffffff' : '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Giras Agendadas
            </button>
            <button 
              onClick={() => setActiveTab('avisos')}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: activeTab === 'avisos' ? 'var(--color-mata-dark)' : '#ffffff',
                color: activeTab === 'avisos' ? '#ffffff' : '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Mural de Avisos
            </button>
            <button 
              onClick={() => setActiveTab('leads')}
              style={{
                padding: '0.6rem 1.2rem',
                backgroundColor: activeTab === 'leads' ? 'var(--color-mata-dark)' : '#ffffff',
                color: activeTab === 'leads' ? '#ffffff' : '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Contatos / Comunidade
            </button>
          </div>
        )}

        {view === 'form' ? (
          <AdminGiraForm 
            gira={editingGira} 
            onSave={handleFormSave} 
            onCancel={handleFormCancel} 
          />
        ) : activeTab === 'avisos' ? (
          <AdminAvisos />
        ) : activeTab === 'giras' ? (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--color-mata-dark)' }}>Giras Agendadas</h2>
              <button onClick={handleAdd} className="btn-primary btn-ocre" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                <Plus size={16} /> Nova Gira
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <tr>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Data</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Linha</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Status</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Destaque</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem', textAlign: 'right' }}>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</td></tr>
                  ) : giras.length === 0 ? (
                    <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Nenhuma gira cadastrada.</td></tr>
                  ) : (
                    giras.map(gira => (
                      <tr key={gira.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem 2rem', fontWeight: 500 }}>{gira.date_badge}</td>
                        <td style={{ padding: '1rem 2rem' }}>{gira.line}</td>
                        <td style={{ padding: '1rem 2rem' }}>
                          <span style={{ 
                            padding: '0.25rem 0.75rem', 
                            borderRadius: '999px', 
                            fontSize: '0.8rem',
                            backgroundColor: gira.status === 'aberta' ? '#dcfce7' : gira.status === 'cancelada' ? '#fee2e2' : '#fef3c7',
                            color: gira.status === 'aberta' ? '#166534' : gira.status === 'cancelada' ? '#991b1b' : '#92400e'
                          }}>
                            {gira.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 2rem' }}>{gira.is_featured ? '⭐ Sim' : '-'}</td>
                        <td style={{ padding: '1rem 2rem', textAlign: 'right' }}>
                          <button onClick={() => handleEdit(gira)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '1rem' }} title="Editar">
                            <Edit2 size={18} />
                          </button>
                          <button onClick={() => handleDelete(gira.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Excluir">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', color: 'var(--color-mata-dark)' }}>Contatos da Comunidade</h2>
              <button onClick={handleCopyLeads} className="btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                Copiar WhatsApps (Para Lista Transmissão)
              </button>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <tr>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Data de Cadastro</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Nome</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>WhatsApp</th>
                    <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingLeads ? (
                    <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Carregando contatos...</td></tr>
                  ) : leads.length === 0 ? (
                    <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Ninguém cadastrado ainda.</td></tr>
                  ) : (
                    leads.map(lead => (
                      <tr key={lead.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem 2rem', fontSize: '0.9rem', color: '#4b5563' }}>
                          {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: '1rem 2rem', fontWeight: 500 }}>{lead.name}</td>
                        <td style={{ padding: '1rem 2rem' }}>{lead.phone || '-'}</td>
                        <td style={{ padding: '1rem 2rem' }}>{lead.email || '-'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
