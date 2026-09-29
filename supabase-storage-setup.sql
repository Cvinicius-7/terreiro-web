-- ============================================================
-- TERREIRO DE UMBANDA LUZ DE ARUANDA (TULA)
-- Script para criar o Bucket de Imagens no Supabase Storage
-- Execute no SQL Editor do Supabase
-- ============================================================

-- 1. Criar um bucket público chamado 'tula-images'
INSERT INTO storage.buckets (id, name, public)
VALUES ('tula-images', 'tula-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Política para Leitura Pública (todos os visitantes do site podem ver as fotos)
CREATE POLICY "Leitura Publica Imagens"
ON storage.objects FOR SELECT
USING (bucket_id = 'tula-images');

-- 3. Política para Upload de Imagens (Apenas admin)
CREATE POLICY "Admin pode subir imagens"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'tula-images' AND auth.role() = 'authenticated');

-- 4. Política para Editar/Deletar Imagens (Apenas admin)
CREATE POLICY "Admin pode editar/deletar imagens"
ON storage.objects FOR UPDATE
USING (bucket_id = 'tula-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin pode apagar imagens"
ON storage.objects FOR DELETE
USING (bucket_id = 'tula-images' AND auth.role() = 'authenticated');
