-- ============================================================
-- TERREIRO DE UMBANDA LUZ DE ARUANDA (TULA) — Schema Supabase
-- Execute este script no SQL Editor do Supabase (1 vez)
-- ============================================================

-- ===================
-- 1. Tabela: giras
-- ===================
CREATE TABLE IF NOT EXISTS giras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,                           -- Ex: "GIRA ABERTA"
  line TEXT NOT NULL,                            -- Ex: "Linha de Caboclos"
  subtitle TEXT DEFAULT 'Atendimento aberto com a', -- Subtítulo do card
  date DATE NOT NULL,                            -- Data da gira (YYYY-MM-DD)
  date_badge TEXT NOT NULL,                      -- Ex: "14/08 ÀS 19H"
  full_date TEXT,                                -- Ex: "14 de Agosto"
  day_of_week TEXT,                              -- Ex: "Quinta-feira"
  doors_open TEXT DEFAULT '18h30',               -- Horário de abertura dos portões
  starts_at TEXT DEFAULT '19h00',                -- Horário de início dos trabalhos
  location TEXT DEFAULT 'R. Francisco Torres 908 - Centro, Curitiba',
  description TEXT,                              -- Descrição da gira para o modal
  recommendations TEXT,                          -- Recomendações para consulentes
  status TEXT DEFAULT 'aberta' CHECK (status IN ('aberta', 'cancelada', 'especial')),
  is_featured BOOLEAN DEFAULT false,             -- Destaque na Home
  bg_image TEXT,                                 -- URL da imagem de fundo
  color_theme TEXT DEFAULT '#1b3322',            -- Cor temática do card
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Índice para consultas por data
CREATE INDEX IF NOT EXISTS idx_giras_date ON giras(date DESC);

-- ===================
-- 2. Tabela: avisos
-- ===================
CREATE TABLE IF NOT EXISTS avisos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message TEXT NOT NULL,                         -- Texto do aviso
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'alerta', 'urgente')),
  is_active BOOLEAN DEFAULT true,                -- Visível no site ou não
  starts_at TIMESTAMPTZ DEFAULT now(),           -- Início da exibição
  ends_at TIMESTAMPTZ,                           -- Fim da exibição (NULL = indeterminado)
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===================
-- 3. Políticas de Segurança (RLS)
-- ===================

-- Habilitar RLS nas tabelas
ALTER TABLE giras ENABLE ROW LEVEL SECURITY;
ALTER TABLE avisos ENABLE ROW LEVEL SECURITY;

-- Leitura pública (qualquer visitante do site pode ler)
CREATE POLICY "Leitura publica de giras"
  ON giras FOR SELECT
  USING (true);

CREATE POLICY "Leitura publica de avisos"
  ON avisos FOR SELECT
  USING (true);

-- Escrita restrita ao service_role (admin via painel ou API autenticada)
-- Para o futuro painel admin, vamos criar policies específicas com auth.uid()

-- ===================
-- 4. Dados iniciais de exemplo
-- ===================
INSERT INTO giras (title, line, subtitle, date, date_badge, full_date, day_of_week, doors_open, starts_at, description, recommendations, status, is_featured, bg_image, color_theme) VALUES
  ('GIRA ABERTA', 'Linha de Caboclos', 'Atendimento aberto com a', '2026-10-02', '02/10 ÀS 19H', '02 de Outubro', 'Quinta-feira', '18h30', '19h00', 'Receba o axé e o acolhimento das matas. Uma gira de cura, passes energéticos e direcionamento espiritual aberta a todos os consulentes.', 'Venha com roupas claras e confortáveis. Não é cobrada nenhuma taxa por consultas ou passes.', 'aberta', true, 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', '#1b3322'),
  
  ('GIRA ABERTA', 'Linha de Pretos Velhos e Erês', 'Atendimento aberto com a', '2026-10-09', '09/10 ÀS 19H', '09 de Outubro', 'Quinta-feira', '18h30', '19h00', 'A sabedoria compassiva, o café acolhedor e a benção dos vovôs e vovós de Aruanda, trazendo paz ao coração e a energia pura da Ibejada.', 'Traga suas orações e coração aberto. Senhas distribuídas por ordem de chegada.', 'aberta', false, 'https://images.unsplash.com/photo-1603555501671-8f96b3fce8b6?auto=format&fit=crop&w=800&q=80', '#2b1e16'),
  
  ('GIRA ABERTA', 'Linha de Baianos e Povo Cigano', 'Atendimento aberto com a', '2026-10-16', '16/10 ÀS 19H', '16 de Outubro', 'Quinta-feira', '18h30', '19h00', 'A força da alegria de viver, o corte de quizilas e a energia vibrante da Bahia e das correntes do Oriente para abertura de caminhos.', 'Distribuição de fitinhas e água fluidificada. Todos são muito bem-vindos.', 'aberta', false, 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80', '#3d2516'),
  
  ('GIRA ABERTA', 'Guardiões (Exu e Pombagira)', 'Atendimento aberto com a', '2026-10-23', '23/10 ÀS 19H', '23 de Outubro', 'Quinta-feira', '18h30', '19h00', 'Trabalhos de corte de energias densas, proteção das porteiras e quebra de demandas. Uma gira de profunda transformação e respeito à Lei Maior.', 'Consultas por ordem de chegada. Mantenha a mente elevada e postura de respeito no terreiro.', 'aberta', false, 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80', '#1f1616'),
  
  ('NÃO HAVERÁ GIRA', 'Recesso Institucional', 'Informamos que', '2026-10-30', '30/10', '30 de Outubro', 'Quinta-feira', 'Portões fechados ao público', '-', 'Não haverá atendimento público nesta data devido à manutenção periódica do terreiro e consagrações internas do corpo mediúnico.', 'Retornamos normalmente com nossos atendimentos públicos na semana seguinte.', 'cancelada', false, 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&w=800&q=80', '#181818'),
  
  ('GIRA ABERTA', 'Linha de Boiadeiros e Marinheiros', 'Atendimento aberto com a', '2026-11-06', '06/11 ÀS 19H', '06 de Novembro', 'Quinta-feira', '18h30', '19h00', 'Com o estalar do chicote e o balanço das águas sagradas, os Boiadeiros e Marinheiros trazem o recolhimento das correntes pesadas e a renovação das emoções.', 'Consultas e passes abertos à comunidade de Curitiba e região.', 'aberta', false, 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80', '#22261f');

-- Aviso de exemplo
INSERT INTO avisos (message, type, is_active) VALUES
  ('🌿 As giras do TULA acontecem às quintas-feiras. Portões abrem às 18h30.', 'info', true);

-- ===================
-- Pronto! Tabelas criadas com sucesso.
-- ===================
