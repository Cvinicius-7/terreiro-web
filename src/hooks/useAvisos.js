import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useAvisos(all = false) {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvisos() {
      setLoading(true);
      
      let query = supabase
        .from('avisos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!all) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar avisos:', error);
      } else {
        setAvisos(data || []);
      }
      setLoading(false);
    }

    fetchAvisos();
  }, [all]);

  return { avisos, loading, refetch: () => setAvisos([]) }; // refetch can be improved, but usually we just want initial fetch
}
