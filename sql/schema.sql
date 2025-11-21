-- FlowAI Database Schema
-- Ejecutar este script en Supabase SQL Editor

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  company_id uuid REFERENCES companies(id),
  role text DEFAULT 'operator',
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  name text,
  description text,
  unit_price numeric,
  created_at timestamptz DEFAULT now()
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id),
  quantity numeric,
  expiry_date date,
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  customer_name text,
  items jsonb,
  total numeric,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_products_company_id ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_inventory_product_id ON inventory(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_company_id ON orders(company_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Row Level Security (RLS) Policies
-- Habilitar RLS en todas las tablas
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Los usuarios solo pueden ver/editar datos de su propia compañía
-- Nota: Ajusta estas políticas según tu sistema de autenticación

-- Companies policies
CREATE POLICY "Users can view their own company"
  ON companies FOR SELECT
  USING (id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- Products policies
CREATE POLICY "Users can view products from their company"
  ON products FOR SELECT
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can insert products for their company"
  ON products FOR INSERT
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update products from their company"
  ON products FOR UPDATE
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- Inventory policies
CREATE POLICY "Users can view inventory from their company"
  ON inventory FOR SELECT
  USING (
    product_id IN (
      SELECT id FROM products 
      WHERE company_id IN (SELECT company_id FROM users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can update inventory from their company"
  ON inventory FOR UPDATE
  USING (
    product_id IN (
      SELECT id FROM products 
      WHERE company_id IN (SELECT company_id FROM users WHERE id = auth.uid())
    )
  );

-- Orders policies
CREATE POLICY "Users can view orders from their company"
  ON orders FOR SELECT
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can insert orders for their company"
  ON orders FOR INSERT
  WITH CHECK (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

CREATE POLICY "Users can update orders from their company"
  ON orders FOR UPDATE
  USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- Seed data (opcional, para desarrollo)
-- INSERT INTO companies (id, name) VALUES 
--   ('company-1'::uuid, 'Empresa Demo');

-- INSERT INTO users (id, email, name, company_id, role) VALUES
--   ('user-1'::uuid, 'admin@demo.com', 'Admin Demo', 'company-1'::uuid, 'admin');

