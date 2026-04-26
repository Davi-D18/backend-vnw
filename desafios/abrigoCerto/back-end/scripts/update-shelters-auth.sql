-- Script de migração para adicionar suporte a autenticação
ALTER TABLE shelters 
ADD COLUMN email VARCHAR(120) UNIQUE NOT NULL,
ADD COLUMN password VARCHAR(255) NOT NULL;

-- Índice para otimizar a busca por email durante o login
CREATE INDEX IF NOT EXISTS idx_shelters_email ON shelters (email);
