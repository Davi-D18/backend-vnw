-- Seed data para o sistema AbrigoCerto
-- Este script popula as tabelas 'shelters' e 'shelter_updates' com dados realistas.
-- Senha padrão para todos: '123456' (Hash: $2b$10$Y566G.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y)

-- 1. Inserção de Abrigos (Shelters)
INSERT INTO shelters (
    name, email, password, address, city, neighborhood, reference_point, 
    latitude, longitude, capacity_total, capacity_available, 
    status, contact_name, contact_phone, accessibility, 
    accepts_pets, description
)
SELECT 
    'Abrigo Arena do Grêmio', 'arena@gremio.com.br', '$2b$10$Y566G.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y', 'Av. Padre Leopoldo Brentano, 110', 'Porto Alegre', 'Humaitá', 'Arena do Grêmio', 
    -29.9740, -51.1948, 500, 50, 
    'aberto', 'João Silva', '(51) 99999-0001', TRUE, 
    TRUE, 'Espaço amplo com suporte médico e veterinário disponível para desabrigados e animais.'
WHERE NOT EXISTS (SELECT 1 FROM shelters WHERE email = 'arena@gremio.com.br');

INSERT INTO shelters (
    name, email, password, address, city, neighborhood, reference_point, 
    latitude, longitude, capacity_total, capacity_available, 
    status, contact_name, contact_phone, accessibility, 
    accepts_pets, description
)
SELECT 
    'Ginásio Tesourinha', 'tesourinha@poa.rs.gov.br', '$2b$10$Y566G.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y', 'Av. Érico Veríssimo, s/n', 'Porto Alegre', 'Menino Deus', 'Próximo ao Shopping Praia de Belas', 
    -30.0437, -51.2255, 300, 0, 
    'lotado', 'Maria Oliveira', '(51) 99999-0002', TRUE, 
    FALSE, 'Atualmente lotado. Prioridade para idosos e famílias com crianças. Não aceita pets no momento.'
WHERE NOT EXISTS (SELECT 1 FROM shelters WHERE email = 'tesourinha@poa.rs.gov.br');

INSERT INTO shelters (
    name, email, password, address, city, neighborhood, reference_point, 
    latitude, longitude, capacity_total, capacity_available, 
    status, contact_name, contact_phone, accessibility, 
    accepts_pets, description
)
SELECT 
    'Centro Esportivo Mathias Velho', 'mathias@canoas.rs.gov.br', '$2b$10$Y566G.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y', 'Rua Brasil, 1000', 'Canoas', 'Mathias Velho', 'Próximo à Estação Mathias Velho', 
    -29.9015, -51.1915, 200, 120, 
    'aberto', 'Carlos Santos', '(51) 99999-0003', FALSE, 
    TRUE, 'Aceita animais de pequeno porte. Necessário trazer documentos básicos se possível.'
WHERE NOT EXISTS (SELECT 1 FROM shelters WHERE email = 'mathias@canoas.rs.gov.br');

INSERT INTO shelters (
    name, email, password, address, city, neighborhood, reference_point, 
    latitude, longitude, capacity_total, capacity_available, 
    status, contact_name, contact_phone, accessibility, 
    accepts_pets, description
)
SELECT 
    'Escola Municipal Eldorado', 'escola@eldorado.rs.gov.br', '$2b$10$Y566G.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y', 'Rua das Flores, 50', 'Eldorado do Sul', 'Centro', 'Ao lado da Prefeitura', 
    -30.0039, -51.3090, 150, 30, 
    'aberto', 'Ana Souza', '(51) 99999-0004', TRUE, 
    TRUE, 'Local de fácil acesso com acessibilidade total. Vagas limitadas para pernoite.'
WHERE NOT EXISTS (SELECT 1 FROM shelters WHERE email = 'escola@eldorado.rs.gov.br');

INSERT INTO shelters (
    name, email, password, address, city, neighborhood, reference_point, 
    latitude, longitude, capacity_total, capacity_available, 
    status, contact_name, contact_phone, accessibility, 
    accepts_pets, description
)
SELECT 
    'Paróquia Nossa Senhora', 'paroquia@saoleopoldo.rs.gov.br', '$2b$10$Y566G.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y.P7P6.YvG.P7P6.Y', 'Av. Mauá, 200', 'São Leopoldo', 'Centro', 'Em frente à praça central', 
    -29.7612, -51.1449, 100, 0, 
    'fechado', 'Padre Pedro', '(51) 99999-0005', FALSE, 
    FALSE, 'Abrigo encerrando atividades temporariamente para manutenção estrutural.'
WHERE NOT EXISTS (SELECT 1 FROM shelters WHERE email = 'paroquia@saoleopoldo.rs.gov.br');


-- 2. Inserção de Histórico de Atualizações (Shelter Updates)
-- As atualizações são vinculadas aos abrigos via subquery pelo email.

-- Atualização 1: Arena do Grêmio
INSERT INTO shelter_updates (shelter_id, updated_by, capacity_total, capacity_available, status, note)
SELECT id, 'João Silva', 500, 400, 'aberto', 'Início das operações e recepção dos primeiros desabrigados.'
FROM shelters WHERE email = 'arena@gremio.com.br'
AND NOT EXISTS (SELECT 1 FROM shelter_updates su JOIN shelters s ON su.shelter_id = s.id 
                WHERE s.email = 'arena@gremio.com.br' AND su.note = 'Início das operações e recepção dos primeiros desabrigados.');

INSERT INTO shelter_updates (shelter_id, updated_by, capacity_total, capacity_available, status, note)
SELECT id, 'Admin', 500, 50, 'aberto', 'Ocupação aumentou drasticamente nas últimas horas devido às chuvas torrenciais.'
FROM shelters WHERE email = 'arena@gremio.com.br'
AND NOT EXISTS (SELECT 1 FROM shelter_updates su JOIN shelters s ON su.shelter_id = s.id 
                WHERE s.email = 'arena@gremio.com.br' AND su.note = 'Ocupação aumentou drasticamente nas últimas horas devido às chuvas torrenciais.');

-- Atualização 2: Ginásio Tesourinha
INSERT INTO shelter_updates (shelter_id, updated_by, capacity_total, capacity_available, status, note)
SELECT id, 'Maria Oliveira', 300, 0, 'lotado', 'Capacidade máxima atingida. Encaminhando novos pedidos para outros abrigos da região.'
FROM shelters WHERE email = 'tesourinha@poa.rs.gov.br'
AND NOT EXISTS (SELECT 1 FROM shelter_updates su JOIN shelters s ON su.shelter_id = s.id 
                WHERE s.email = 'tesourinha@poa.rs.gov.br' AND su.note = 'Capacidade máxima atingida. Encaminhando novos pedidos para outros abrigos da região.');

-- Atualização 3: Centro Esportivo Mathias Velho
INSERT INTO shelter_updates (shelter_id, updated_by, capacity_total, capacity_available, status, note)
SELECT id, 'Carlos Santos', 200, 120, 'aberto', 'Recebimento de doações de ração e kits de higiene para os pets.'
FROM shelters WHERE email = 'mathias@canoas.rs.gov.br'
AND NOT EXISTS (SELECT 1 FROM shelter_updates su JOIN shelters s ON su.shelter_id = s.id 
                WHERE s.email = 'mathias@canoas.rs.gov.br' AND su.note = 'Recebimento de doações de ração e kits de higiene para os pets.');
