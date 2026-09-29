-- ============================================================
-- TERREIRO DE UMBANDA LUZ DE ARUANDA (TULA)
-- Script para habilitar permissões de gerenciamento de Avisos
-- Execute no SQL Editor do Supabase
-- ============================================================

-- 1. Permite que o administrador (usuário autenticado) INCLUA novos avisos
CREATE POLICY "Admin pode inserir avisos"
  ON avisos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 2. Permite que o administrador ATUALIZE avisos existentes
CREATE POLICY "Admin pode atualizar avisos"
  ON avisos FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- 3. Permite que o administrador EXCLUA avisos
CREATE POLICY "Admin pode deletar avisos"
  ON avisos FOR DELETE
  USING (auth.role() = 'authenticated');
