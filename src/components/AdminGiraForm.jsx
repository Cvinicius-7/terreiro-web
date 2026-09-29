import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Save, X, UploadCloud, Image as ImageIcon } from 'lucide-react';

export function AdminGiraForm({ gira, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: 'GIRA ABERTA',
    line: '',
    subtitle: 'Atendimento aberto com a',
    date: '',
    date_badge: '',
    full_date: '',
    day_of_week: 'Sexta-feira',
    doors_open: '19h00',
    starts_at: '19h30',
    location: 'R. Francisco Torres 908 - Centro, Curitiba',
    description: '',
    recommendations: '',
    status: 'aberta',
    is_featured: false,
    bg_image: '',
    color_theme: '#1b3322'
  });

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (gira) {
      setFormData(gira);
      if (gira.bg_image) {
        setImagePreview(gira.bg_image);
      }
    }
  }, [gira]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Cria uma URL local para preview da imagem antes de subir pro Supabase
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalBgImage = formData.bg_image;

      // 1. Se o usuário selecionou uma nova imagem, faz o upload pro Storage
      if (imageFile) {
        // Gera um nome único para o arquivo
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `gira-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('tula-images')
          .upload(fileName, imageFile, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          throw new Error('Falha ao subir a imagem: ' + uploadError.message);
        }

        // 2. Pega a URL pública da imagem que acabou de subir
        const { data: publicUrlData } = supabase.storage
          .from('tula-images')
          .getPublicUrl(fileName);

        finalBgImage = publicUrlData.publicUrl;
      }

      // Prepara os dados finais para salvar no banco
      const dataToSave = {
        ...formData,
        bg_image: finalBgImage
      };

      // 3. Salva no banco de dados (Insert ou Update)
      if (gira && gira.id) {
        const { error } = await supabase
          .from('giras')
          .update(dataToSave)
          .eq('id', gira.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('giras')
          .insert([dataToSave]);
        if (error) throw error;
      }
      
      onSave();
    } catch (err) {
      alert('Erro ao salvar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--color-mata-dark)' }}>
          {gira ? 'Editar Gira' : 'Nova Gira'}
        </h2>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-texto-suave)' }}>
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Upload de Imagem em Destaque no Topo */}
        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
            Imagem de Fundo do Card
          </label>
          <div style={{ 
            border: '2px dashed var(--color-borda)', 
            borderRadius: '12px', 
            padding: imagePreview ? '0' : '2.5rem 1rem', 
            textAlign: 'center',
            backgroundColor: 'var(--color-areia)',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer'
          }}>
            {imagePreview ? (
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                  <p style={{ color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <UploadCloud size={20} /> Trocar Imagem
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--color-texto-suave)' }}>
                <ImageIcon size={32} style={{ marginBottom: '0.5rem', color: 'var(--color-mata)' }} />
                <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>Clique para fazer upload de uma foto</p>
                <p style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>PNG, JPG ou WEBP</p>
              </div>
            )}
            
            {/* Input File Invisível cobrindo a div */}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} 
            />
          </div>
        </div>

        {/* Restante dos Campos */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Linha da Gira (Ex: Caboclos, Exu)</label>
          <input type="text" name="line" value={formData.line} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Data (YYYY-MM-DD)</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Badge Data (Ex: 14/08 ÀS 19H)</label>
          <input type="text" name="date_badge" value={formData.date_badge} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Data Completa (Ex: 14 de Agosto)</label>
          <input type="text" name="full_date" value={formData.full_date} onChange={handleChange} required style={inputStyle} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Status</label>
          <select name="status" value={formData.status} onChange={handleChange} style={inputStyle}>
            <option value="aberta">Aberta</option>
            <option value="cancelada">Cancelada</option>
            <option value="especial">Especial</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Descrição</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" style={inputStyle} />
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>Recomendações</label>
          <textarea name="recommendations" value={formData.recommendations} onChange={handleChange} rows="2" style={inputStyle} />
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} id="is_featured" />
          <label htmlFor="is_featured" style={{ fontWeight: 600 }}>Destacar esta gira na Home</label>
        </div>

        <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> {loading ? 'Enviando Imagem e Salvando...' : 'Salvar Gira'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--color-borda)',
  outline: 'none',
  fontFamily: 'inherit'
};
