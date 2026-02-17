# VisionFit AI

AI-powered virtual try-on platform using Gemini 2.5 Flash for identity-preserving garment visualization.

## Project Structure

```
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── services/      # API client (calls backend)
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   ├── types.ts       # TypeScript interfaces
│   │   └── constants.ts   # Mock data & constants
│   ├── index.html
│   ├── vite.config.ts
│   └── package.json
│
├── backend/           # Express + TypeScript API server
│   ├── src/
│   │   ├── config/        # Supabase client
│   │   ├── routes/        # API route handlers
│   │   ├── services/      # Gemini AI service
│   │   ├── data/          # Mock product data
│   │   ├── server.ts      # Express app entry
│   │   └── types.ts       # Shared types
│   ├── .env               # API keys (not committed)
│   └── package.json
│
├── database/          # SQL schema & seed data
│   ├── schema.sql         # Table definitions + RLS policies
│   ├── seed.sql           # Sample product data
│   └── README.md          # Setup instructions
│
└── package.json       # Root scripts
```

## Quick Start

### 1. Install dependencies

```bash
cd frontend && npm install
cd ../backend && npm install
```

### 2. Configure environment

Edit `backend/.env` with your actual API keys:

```env
GEMINI_API_KEY=your_gemini_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start the backend

```bash
cd backend
npm run dev
```

Backend runs at `http://localhost:5000`

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:3000` with API proxy to backend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Fetch product catalog |
| POST | `/api/tryon` | Generate virtual try-on |
| POST | `/api/auth/signin` | Sign in |
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/signout` | Sign out |
| GET | `/api/auth/session` | Check session |
| GET | `/api/profile` | Get user profile |
| PUT | `/api/profile` | Update user profile |
| GET | `/api/health` | Health check |

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS (CDN)
- **Backend**: Express, TypeScript, tsx
- **AI**: Google Gemini 2.5 Flash (image generation)
- **Database**: Supabase (PostgreSQL + Auth)
