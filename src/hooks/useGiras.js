import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_GIRAS } from '../data/mockGiras';

// Função auxiliar para mapear as colunas do banco para o formato esperado pelo frontend
const mapGiraData = (data) => {
  return data.map(item => ({
    id: item.id,
    type: item.title, // Mapeia 'title' do banco para 'type' do frontend
    line: item.line,
    subtitle: item.subtitle,
    dateBadge: item.date_badge,
    fullDate: item.full_date,
    dayOfWeek: item.day_of_week,
    doorsOpen: item.doors_open,
    startsAt: item.starts_at,
    location: item.location,
    description: item.description,
    recommendations: item.recommendations,
    status: item.status,
    isFeatured: item.is_featured,
    bgImage: item.bg_image,
    colorTheme: item.color_theme,
  }));
};

export function useGiras() {
  const [giras, setGiras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGiras() {
      // Se não houver cliente Supabase (falta de .env, etc), use os mocks
      if (!supabase) {
        console.warn('Supabase não inicializado. Usando dados locais (mock).');
        setGiras(MOCK_GIRAS);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('giras')
          .select('*')
          .order('date', { ascending: true }); // Ordena pela data

        if (error) {
          throw error;
        }

        // Se o banco estiver vazio, pode fazer fallback para os mocks se desejar,
        // mas aqui vamos assumir que o banco vazio significa que não tem gira mesmo,
        // ou se não retornou nada, usamos mock para desenvolvimento:
        if (!data || data.length === 0) {
           console.warn('Tabela giras está vazia. Usando dados locais (mock) para visualização.');
           setGiras(MOCK_GIRAS);
        } else {
           setGiras(mapGiraData(data));
        }

      } catch (err) {
        console.error('Erro ao buscar giras do Supabase:', err.message);
        setError(err.message);
        // Fallback gracefully to mocks
        setGiras(MOCK_GIRAS);
      } finally {
        setLoading(false);
      }
    }

    fetchGiras();
  }, []);

  return { giras, loading, error };
}
