-- ============================================================
-- TERREIRO DE UMBANDA LUZ DE ARUANDA (TULA)
-- Script para habilitar permissões do Painel Admin
-- Execute no SQL Editor do Supabase
-- ============================================================

-- 1. Permite que o administrador (usuário autenticado) INCLUA novas giras
CREATE POLICY "Admin pode inserir giras"
  ON giras FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 2. Permite que o administrador ATUALIZE giras existentes
CREATE POLICY "Admin pode atualizar giras"
  ON giras FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Permite que o administrador EXCLUA giras
CREATE POLICY "Admin pode deletar giras"
  ON giras FOR DELETE
  USING (auth.role() = 'authenticated');
