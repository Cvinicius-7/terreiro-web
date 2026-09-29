-- Criação da tabela de Leads (Contatos da Comunidade)
CREATE TABLE community_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilita Row Level Security (Segurança)
ALTER TABLE community_leads ENABLE ROW LEVEL SECURITY;

-- Política 1: Qualquer pessoa (pública) pode INSERIR seus dados no formulário
CREATE POLICY "Permitir inserção pública de leads" 
ON community_leads FOR INSERT 
TO public 
WITH CHECK (true);

-- Política 2: Apenas administradores logados podem LER, ATUALIZAR ou DELETAR os contatos
CREATE POLICY "Permitir leitura apenas para administradores" 
ON community_leads FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Permitir deleção apenas para administradores" 
ON community_leads FOR DELETE 
TO authenticated 
USING (true);
