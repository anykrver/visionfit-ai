-- VisionFit AI Database Schema
-- Run this in the Supabase SQL Editor to create all required tables.

-- Merchants table (must be created before products due to FK reference)
CREATE TABLE IF NOT EXISTS merchants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  store_name TEXT NOT NULL,
  domain TEXT NOT NULL UNIQUE,
  api_key_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  merchant_id UUID REFERENCES merchants(id),
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  height TEXT DEFAULT '175',
  weight TEXT DEFAULT '70',
  body_model_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Try-on results table
CREATE TABLE IF NOT EXISTS try_ons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  result_url TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_try_ons_user_id ON try_ons(user_id);
CREATE INDEX IF NOT EXISTS idx_try_ons_product_id ON try_ons(product_id);

-- Row Level Security (RLS) policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE try_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;

-- Products: readable by everyone
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (true);

-- Profiles: users can read/write their own profile
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can upsert their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Try-ons: users can read their own try-ons
CREATE POLICY "Users can view their own try-ons"
  ON try_ons FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create try-ons"
  ON try_ons FOR INSERT
  WITH CHECK (auth.uid() = user_id);
