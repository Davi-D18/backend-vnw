-- Criação da função de trigger para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TABLE IF NOT EXISTS shelters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  neighborhood VARCHAR(100) NOT NULL,
  reference_point VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  capacity_total INTEGER NOT NULL CHECK (capacity_total >= 0),
  capacity_available INTEGER NOT NULL CHECK (capacity_available >= 0),
  status VARCHAR(20) NOT NULL CHECK (status IN ('aberto', 'lotado', 'fechado')),
  contact_name VARCHAR(120) NOT NULL,
  contact_phone VARCHAR(30) NOT NULL,
  accessibility BOOLEAN NOT NULL DEFAULT FALSE,
  accepts_pets BOOLEAN NOT NULL DEFAULT FALSE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (capacity_available <= capacity_total)
);

-- Índices otimizados
CREATE INDEX IF NOT EXISTS idx_shelters_email ON shelters (email);
CREATE INDEX IF NOT EXISTS idx_shelters_city_lower ON shelters (LOWER(city));
CREATE INDEX IF NOT EXISTS idx_shelters_status ON shelters (status);
CREATE INDEX IF NOT EXISTS idx_shelters_updated_at ON shelters (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_shelters_pets_access ON shelters (accepts_pets, accessibility) WHERE status = 'aberto';

-- Trigger para atualização automática de updated_at
DROP TRIGGER IF EXISTS trg_shelters_updated_at ON shelters;
CREATE TRIGGER trg_shelters_updated_at
BEFORE UPDATE ON shelters
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE IF NOT EXISTS shelter_updates (
  id SERIAL PRIMARY KEY,
  shelter_id INTEGER NOT NULL REFERENCES shelters(id) ON DELETE CASCADE,
  updated_by VARCHAR(120) NOT NULL,
  capacity_total INTEGER,
  capacity_available INTEGER,
  status VARCHAR(20) CHECK (status IN ('aberto', 'lotado', 'fechado')),
  note TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CHECK (capacity_total IS NULL OR capacity_total >= 0),
  CHECK (capacity_available IS NULL OR capacity_available >= 0)
);

CREATE INDEX IF NOT EXISTS idx_shelter_updates_shelter_id ON shelter_updates (shelter_id);
CREATE INDEX IF NOT EXISTS idx_shelter_updates_created_at ON shelter_updates (created_at DESC);
