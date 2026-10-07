-- ============================================================
-- TERREIRO DE UMBANDA LUZ DE ARUANDA (TULA)
-- Hardening de segurança — execute UMA vez no SQL Editor do Supabase
--
-- PROBLEMA CORRIGIDO:
--   As policies anteriores usavam `auth.role() = 'authenticated'`, ou seja,
--   QUALQUER conta criada no Supabase Auth podia editar/apagar giras e avisos,
--   ler todos os leads (nome/e-mail/WhatsApp) e subir arquivos no Storage.
--   Como o cadastro (signUp) vem habilitado por padrão no Supabase e a anon key
--   é pública no bundle, qualquer pessoa conseguia criar uma conta e virar "admin".
--
-- SOLUÇÃO:
--   Allowlist explícita de administradores (tabela admin_users) + função
--   is_admin() usada em todas as policies de escrita.
--
-- DEPOIS DE RODAR:
--   1. Insira o(s) admin(s) (ver passo 7 no final do arquivo).
--   2. Dashboard > Authentication > Providers > Email: desative "Allow new users to sign up".
-- ============================================================

BEGIN;

-- ------------------------------------------------------------
-- 1. Allowlist de administradores
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Cada usuário pode consultar apenas a PRÓPRIA linha (usado pelo frontend
-- para decidir se mostra o painel). Ninguém escreve via API: a gestão de
-- admins é feita só pelo SQL Editor / service_role.
DROP POLICY IF EXISTS "Usuario ve o proprio registro de admin" ON public.admin_users;
CREATE POLICY "Usuario ve o proprio registro de admin"
  ON public.admin_users FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- ------------------------------------------------------------
-- 2. Função is_admin()
--    SECURITY DEFINER para não depender da RLS de admin_users;
--    search_path fixo para evitar sequestro de schema.
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ------------------------------------------------------------
-- 2b. Remove TODAS as policies antigas dessas tabelas.
--     Policies permissivas são combinadas com OR: se uma policy antiga
--     sobrevivesse (ex.: nome com acento diferente), ela anularia a correção.
-- ------------------------------------------------------------
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN
    SELECT schemaname, tablename, policyname
      FROM pg_policies
     WHERE (schemaname = 'public'  AND tablename IN ('giras', 'avisos', 'community_leads'))
        OR (schemaname = 'storage' AND tablename = 'objects'
            AND (qual ILIKE '%tula-images%' OR with_check ILIKE '%tula-images%'))
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

ALTER TABLE public.giras           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.avisos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_leads ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- 3. GIRAS — leitura pública, escrita só admin
-- ------------------------------------------------------------
CREATE POLICY "Leitura publica de giras"
  ON public.giras FOR SELECT
  USING (true);

CREATE POLICY "Admin pode inserir giras"
  ON public.giras FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin pode atualizar giras"
  ON public.giras FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin pode deletar giras"
  ON public.giras FOR DELETE TO authenticated
  USING (public.is_admin());

-- Validação no banco (não depende do formulário)
ALTER TABLE public.giras DROP CONSTRAINT IF EXISTS giras_len_chk;
ALTER TABLE public.giras ADD CONSTRAINT giras_len_chk CHECK (
      char_length(title)      <= 80
  AND char_length(line)       <= 120
  AND char_length(date_badge) <= 40
  AND char_length(coalesce(subtitle, ''))        <= 120
  AND char_length(coalesce(full_date, ''))       <= 60
  AND char_length(coalesce(day_of_week, ''))     <= 30
  AND char_length(coalesce(doors_open, ''))      <= 60
  AND char_length(coalesce(starts_at, ''))       <= 60
  AND char_length(coalesce(location, ''))        <= 200
  AND char_length(coalesce(description, ''))     <= 2000
  AND char_length(coalesce(recommendations, '')) <= 1000
) NOT VALID;  -- vale para escritas novas; linhas antigas nao bloqueiam a migracao

-- bg_image precisa ser https (bloqueia javascript:, data:, http: etc.)
ALTER TABLE public.giras DROP CONSTRAINT IF EXISTS giras_bg_image_chk;
ALTER TABLE public.giras ADD CONSTRAINT giras_bg_image_chk CHECK (
  bg_image IS NULL OR bg_image = '' OR bg_image ~ '^https://[^\s"''()<>]+$'
) NOT VALID;  -- vale para escritas novas; linhas antigas nao bloqueiam a migracao

ALTER TABLE public.giras DROP CONSTRAINT IF EXISTS giras_color_chk;
ALTER TABLE public.giras ADD CONSTRAINT giras_color_chk CHECK (
  color_theme IS NULL OR color_theme ~ '^#[0-9A-Fa-f]{6}$'
) NOT VALID;  -- vale para escritas novas; linhas antigas nao bloqueiam a migracao

-- ------------------------------------------------------------
-- 4. AVISOS — público vê só os ativos/dentro da janela; admin vê tudo
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Leitura publica de avisos"  ON public.avisos;
DROP POLICY IF EXISTS "Admin pode inserir avisos"   ON public.avisos;
DROP POLICY IF EXISTS "Admin pode atualizar avisos" ON public.avisos;
DROP POLICY IF EXISTS "Admin pode deletar avisos"   ON public.avisos;

CREATE POLICY "Leitura publica de avisos ativos"
  ON public.avisos FOR SELECT
  USING (
    public.is_admin()
    OR (
      is_active = true
      AND (starts_at IS NULL OR starts_at <= now())
      AND (ends_at   IS NULL OR ends_at   >  now())
    )
  );

CREATE POLICY "Admin pode inserir avisos"
  ON public.avisos FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin pode atualizar avisos"
  ON public.avisos FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admin pode deletar avisos"
  ON public.avisos FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE public.avisos DROP CONSTRAINT IF EXISTS avisos_len_chk;
ALTER TABLE public.avisos ADD CONSTRAINT avisos_len_chk CHECK (
  char_length(message) BETWEEN 1 AND 280
) NOT VALID;  -- vale para escritas novas; linhas antigas nao bloqueiam a migracao

-- ------------------------------------------------------------
-- 5. COMMUNITY_LEADS — insert público (validado), leitura/remoção só admin
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Permitir inserção pública de leads"           ON public.community_leads;
DROP POLICY IF EXISTS "Permitir leitura apenas para administradores" ON public.community_leads;
DROP POLICY IF EXISTS "Permitir deleção apenas para administradores" ON public.community_leads;

CREATE POLICY "Insercao publica de leads"
  ON public.community_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);  -- o conteúdo é validado pelas CHECK constraints abaixo

CREATE POLICY "Somente admin le leads"
  ON public.community_leads FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY "Somente admin apaga leads"
  ON public.community_leads FOR DELETE TO authenticated
  USING (public.is_admin());

ALTER TABLE public.community_leads DROP CONSTRAINT IF EXISTS leads_valid_chk;
ALTER TABLE public.community_leads ADD CONSTRAINT leads_valid_chk CHECK (
      char_length(trim(name)) BETWEEN 2 AND 100
  AND (email IS NULL OR (char_length(email) <= 254
       AND email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'))
  AND (phone IS NULL OR phone ~ '^[0-9]{10,13}$')   -- só dígitos (DDD + número)
  AND (email IS NOT NULL OR phone IS NOT NULL)
) NOT VALID;  -- vale para escritas novas; linhas antigas nao bloqueiam a migracao

-- ------------------------------------------------------------
-- 6. STORAGE — bucket com limite de tamanho/tipo e escrita só admin
-- ------------------------------------------------------------
UPDATE storage.buckets
   SET file_size_limit    = 5242880,  -- 5 MB
       allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
 WHERE id = 'tula-images';

-- (policies antigas do bucket já foram removidas no passo 2b)
CREATE POLICY "Leitura Publica Imagens"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tula-images');

CREATE POLICY "Admin pode subir imagens"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'tula-images' AND public.is_admin());

CREATE POLICY "Admin pode editar imagens"
  ON storage.objects FOR UPDATE TO authenticated
  USING      (bucket_id = 'tula-images' AND public.is_admin())
  WITH CHECK (bucket_id = 'tula-images' AND public.is_admin());

CREATE POLICY "Admin pode apagar imagens"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'tula-images' AND public.is_admin());

COMMIT;

-- ------------------------------------------------------------
-- 7. CADASTRAR O(S) ADMIN(S) — rode separadamente, trocando o e-mail
-- ------------------------------------------------------------
-- INSERT INTO public.admin_users (user_id)
-- SELECT id FROM auth.users WHERE email = 'email-do-admin@exemplo.com'
-- ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------
-- 8. CONFERÊNCIA — todas as tabelas públicas devem ter rowsecurity = true
-- ------------------------------------------------------------
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
-- SELECT tablename, policyname, cmd, roles, qual FROM pg_policies
--  WHERE schemaname IN ('public', 'storage') ORDER BY tablename;
