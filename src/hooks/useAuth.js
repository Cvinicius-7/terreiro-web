import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Sessão + papel de administrador.
 *
 * IMPORTANTE: `isAdmin` serve APENAS para decidir o que mostrar na interface.
 * A proteção real está nas policies RLS do Supabase (função public.is_admin()),
 * que bloqueiam escrita/leitura sensível mesmo que alguém burle o frontend.
 */
export function useAuth() {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;

    let active = true;

    const resolveRole = async (currentSession) => {
      if (!currentSession) {
        if (active) {
          setSession(null);
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }
      // Pergunta ao banco (não ao token/localStorage) se este usuário é admin
      const { data, error } = await supabase.rpc('is_admin');
      if (active) {
        setSession(currentSession);
        setIsAdmin(!error && data === true);
        setLoading(false);
      }
    };

    supabase.auth.getSession().then(({ data: { session } }) => resolveRole(session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true);
      // Evita chamar o Supabase dentro do callback síncrono (deadlock conhecido do supabase-js)
      setTimeout(() => resolveRole(session), 0);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return { session, isAdmin, loading, signIn, signOut };
}
