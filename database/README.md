# VisionFit AI — Database

This folder contains the SQL schema and seed data for the VisionFit AI Supabase database.

## Setup

1. Go to [Supabase Dashboard](https://supabase.com/dashboard) and open your project
2. Navigate to **SQL Editor**
3. Run `schema.sql` first to create all tables, indexes, and RLS policies
4. Run `seed.sql` to populate the products table with sample data

## Tables

| Table | Description |
|-------|-------------|
| `products` | Product catalog with images, pricing, and categories |
| `merchants` | Brand/store accounts for enterprise integration |
| `profiles` | User body measurements and saved avatar (extends auth.users) |
| `try_ons` | Virtual try-on result history per user |

## Notes

- All tables use UUID primary keys with `gen_random_uuid()`
- Row Level Security (RLS) is enabled on all tables
- Products are publicly readable; profiles and try-ons are user-scoped
