import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Trash2, Edit2, Plus, Power, Info, AlertCircle, BellRing } from 'lucide-react';

export function AdminAvisos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [view, setView] = useState('list');
  const [formData, setFormData] = useState({ id: null, message: '', type: 'info', is_active: true });
  const [saving, setSaving] = useState(false);

  const fetchAvisos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('avisos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setAvisos(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAvisos();
  }, []);

  const handleAdd = () => {
    setFormData({ id: null, message: '', type: 'info', is_active: true });
    setView('form');
  };

  const handleEdit = (aviso) => {
    setFormData({
      id: aviso.id,
      message: aviso.message,
      type: aviso.type,
      is_active: aviso.is_active
    });
    setView('form');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Excluir este aviso?')) {
      const { error } = await supabase.from('avisos').delete().eq('id', id);
      if (!error) fetchAvisos();
    }
  };

  const handleToggleActive = async (aviso) => {
    const { error } = await supabase.from('avisos').update({ is_active: !aviso.is_active }).eq('id', aviso.id);
    if (!error) fetchAvisos();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const message = String(formData.message || '').trim();
    if (!message || message.length > 280) {
      setSaving(false);
      alert('A mensagem do aviso deve ter entre 1 e 280 caracteres.');
      return;
    }
    if (!['info', 'alerta', 'urgente'].includes(formData.type)) {
      setSaving(false);
      alert('Tipo de aviso inválido.');
      return;
    }

    const payload = {
      message,
      type: formData.type,
      is_active: Boolean(formData.is_active)
    };

    if (formData.id) {
      const { error: updateError } = await supabase.from('avisos').update(payload).eq('id', formData.id);
      if (updateError) {
        setSaving(false);
        alert("Erro ao salvar: " + updateError.message);
        return;
      }
    } else {
      const { error: insertError } = await supabase.from('avisos').insert([payload]);
      if (insertError) {
        setSaving(false);
        alert("Erro ao salvar: " + insertError.message);
        return;
      }
    }

    setSaving(false);
    setView('list');
    fetchAvisos();
  };

  if (view === 'form') {
    return (
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--color-mata-dark)', marginBottom: '1.5rem' }}>
          {formData.id ? 'Editar Aviso' : 'Novo Aviso'}
        </h2>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>Mensagem do Aviso</label>
            <input 
              type="text" 
              required 
              value={formData.message} 
              onChange={e => setFormData({...formData, message: e.target.value})}
              placeholder="Ex: Não haverá gira nesta sexta por conta do feriado."
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: '#374151' }}>Tipo (Cor)</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
              >
                <option value="info">ℹ️ Informativo (Azul)</option>
                <option value="alerta">🔔 Alerta (Laranja)</option>
                <option value="urgente">🚨 Urgente (Vermelho)</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={formData.is_active}
                  onChange={e => setFormData({...formData, is_active: e.target.checked})}
                  style={{ width: '18px', height: '18px' }}
                />
                Deixar ativo no site imediatamente
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={() => setView('list')} className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="btn-primary btn-ocre" style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}>
              {saving ? 'Salvando...' : 'Salvar Aviso'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.4rem', color: 'var(--color-mata-dark)' }}>Mural de Avisos</h2>
        <button onClick={handleAdd} className="btn-primary btn-ocre" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
          <Plus size={16} /> Novo Aviso
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Status</th>
              <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Tipo</th>
              <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem' }}>Mensagem</th>
              <th style={{ padding: '1rem 2rem', fontWeight: 600, color: '#6b7280', fontSize: '0.85rem', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Carregando...</td></tr>
            ) : avisos.length === 0 ? (
              <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center' }}>Nenhum aviso cadastrado.</td></tr>
            ) : (
              avisos.map(aviso => (
                <tr key={aviso.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: aviso.is_active ? '#f0fdf4' : 'transparent' }}>
                  <td style={{ padding: '1rem 2rem' }}>
                    <button 
                      onClick={() => handleToggleActive(aviso)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer',
                        color: aviso.is_active ? '#16a34a' : '#9ca3af', fontWeight: 600, fontSize: '0.8rem'
                      }}
                      title={aviso.is_active ? "Desativar (Esconder do site)" : "Ativar (Mostrar no site)"}
                    >
                      <Power size={16} /> {aviso.is_active ? 'ATIVO NO SITE' : 'DESATIVADO'}
                    </button>
                  </td>
                  <td style={{ padding: '1rem 2rem' }}>
                    {aviso.type === 'info' && <span style={{ color: '#2563eb' }}><Info size={18} /></span>}
                    {aviso.type === 'alerta' && <span style={{ color: '#d97706' }}><BellRing size={18} /></span>}
                    {aviso.type === 'urgente' && <span style={{ color: '#dc2626' }}><AlertCircle size={18} /></span>}
                  </td>
                  <td style={{ padding: '1rem 2rem', color: '#374151', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {aviso.message}
                  </td>
                  <td style={{ padding: '1rem 2rem', textAlign: 'right' }}>
                    <button onClick={() => handleEdit(aviso)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '1rem' }} title="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(aviso.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }} title="Excluir">
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
  );
}
