import { createClient } from '@supabase/supabase-js';

// Apenas a URL e a chave ANON (pública por design) podem ir para o frontend.
// NUNCA coloque a service_role key em variáveis VITE_*: tudo que começa com
// VITE_ é embutido no bundle e fica visível para qualquer visitante.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if ((!supabaseUrl || !supabaseAnonKey) && import.meta.env.DEV) {
  console.warn('[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY ausentes em .env.local — usando dados mock.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
